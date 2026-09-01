/*
 * browser.test.js — drives the real UI in Chromium and fails on any console error,
 * assertion failure, or horizontal overflow at mobile width.
 *
 * Serve the site first:  npx http-server -p 8099 -s .
 * Then:                  node tests/browser.test.js
 */
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.log('playwright is not installed — skipping the browser suite.');
  console.log('  npm i -D playwright && npx playwright install chromium');
  process.exit(0);
}

const BASE = 'http://127.0.0.1:8099';
const path = require('path');
const fs = require('fs');
const OUT = process.env.SHOT_DIR || path.join(__dirname, 'screenshots');
fs.mkdirSync(OUT, { recursive: true });
let problems = [];

function watch(page, label) {
  page.on('console', m => {
    const t = m.text();
    // Google Fonts is unreachable from this sandbox; the CSS fallback stacks cover it.
    if (m.type() === 'error' && !/ERR_CONNECTION|fonts\.g|ERR_NAME|ERR_TUNNEL|ERR_PROXY/.test(t)) {
      problems.push(`[${label}] console: ${t}`);
    }
  });
  page.on('pageerror', e => problems.push(`[${label}] pageerror: ${e.message}`));
  page.on('requestfailed', r => {
    const u = r.url();
    if (u.startsWith(BASE)) problems.push(`[${label}] failed request: ${u}`);
  });
}

(async () => {
  // CHROME_PATH lets sandboxes point at a preinstalled binary.
  const launchOpts = { args: ['--no-sandbox'] };
  if (process.env.CHROME_PATH) launchOpts.executablePath = process.env.CHROME_PATH;
  const browser = await chromium.launch(launchOpts);
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  watch(page, 'index');

  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });

  // catalog rendered
  const cards = await page.locator('.disc').count();
  console.log('catalog cards:', cards);
  if (cards !== 13) problems.push(`expected 13 catalog cards, got ${cards}`);

  // hero stats filled
  const stats = await page.locator('[data-stat="drills"]').innerText();
  console.log('drill count in hero:', stats);
  if (stats === '—') problems.push('hero stats not filled');

  // live preview present
  const previewText = await page.locator('#preview-body').innerText();
  if (!/hours/i.test(previewText)) problems.push('preview did not render');
  console.log('preview headline:', previewText.split('\n').slice(0, 3).join(' / '));

  await page.screenshot({ path: `${OUT}/01-hero.png`, clip: { x: 0, y: 0, width: 1440, height: 1000 } });

  // pick a discipline from the catalog -> scrolls to commission
  await page.locator('.disc[data-id="negotiation"]').click();
  await page.waitForTimeout(600);
  const sel = await page.locator('#f-discipline').inputValue();
  if (sel !== 'negotiation') problems.push(`select did not sync: ${sel}`);

  // set an aggressive, unrealistic budget and confirm the site pushes back
  await page.locator('#f-weeks').fill('4');
  await page.locator('#f-weeks').dispatchEvent('input');
  await page.locator('#f-hours').fill('3');
  await page.locator('#f-hours').dispatchEvent('input');
  await page.waitForTimeout(300);
  const harsh = await page.locator('#preview-body').innerText();
  console.log('\n--- verdict at 4wk x 3h ---\n' + harsh.slice(0, 700));
  if (!/hours short of being functional|Functional/.test(harsh)) problems.push('no verdict text at low budget');
  await page.screenshot({ path: `${OUT}/02-commission.png`, fullPage: false });

  // a realistic budget, then generate
  await page.locator('#f-weeks').fill('16');
  await page.locator('#f-weeks').dispatchEvent('input');
  await page.locator('#f-hours').fill('7');
  await page.locator('#f-hours').dispatchEvent('input');
  await page.locator('#f-days').fill('4');
  await page.locator('#f-days').dispatchEvent('input');
  await page.locator('#f-level .choice[data-value="developing"]').click();
  await page.locator('#f-objective').fill('Renegotiate my compensation and close two vendor contracts');
  await page.waitForTimeout(200);
  await page.locator('#builder button[type="submit"]').click();
  await page.waitForURL('**/program.html', { timeout: 20000 });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForSelector('.planbar', { timeout: 10000 });

  const title = await page.title();
  console.log('\nprogram page title:', title);

  // "the page is too long": the plan is now seven views behind a tab bar, and
  // only the active one is in the DOM.
  const tabCount = await page.locator('.tabs .tab').count();
  const tabLabels = await page.locator('.tabs .tab').allInnerTexts();
  console.log('tabs:', tabLabels.map(t => t.replace(/\n/g, ' ')).join(' | '));
  if (tabCount !== 7) problems.push(`expected 7 plan tabs, got ${tabCount}`);
  const openViews = await page.locator('#view-root section[data-view]').count();
  if (openViews !== 1) problems.push(`exactly one view should be rendered, got ${openViews}`);

  const tab = async (name) => {
    await page.locator(`.tab[data-tab="${name}"]`).click();
    await page.waitForSelector(`#view-root section[data-view="${name}"]`, { timeout: 5000 });
    await page.waitForTimeout(150);
  };

  // the plan bar never leaves: which plan, which week, and the pace verdict
  const barText = await page.locator('.planbar__inner').innerText();
  console.log('plan bar:', barText.replace(/\n/g, ' | '));
  if (!/week|starts|complete/i.test(barText)) problems.push('plan bar does not say which week you are in');
  const chipState = await page.locator('.pacechip').getAttribute('data-state');
  if (!chipState) problems.push('plan bar has no pace chip');

  // ---------------------------------------------------------------- overview
  await tab('overview');

  // "a progress tracker to see whether user is right on schedule behind or infront"
  const paceState = await page.locator('.pace').getAttribute('data-state');
  const paceText = await page.locator('.pace').innerText();
  console.log('pace panel:', paceState, '|', paceText.replace(/\n/g, ' ').slice(0, 180));
  if (!['on', 'ahead', 'behind', 'not-started', 'finished'].includes(paceState)) {
    problems.push(`pace panel has no verdict, got "${paceState}"`);
  }
  if (!/ahead|behind|on schedule|not started|complete/i.test(paceText)) {
    problems.push('pace panel does not say ahead, behind or on schedule');
  }
  if (!(await page.locator('.pace__marker').count())) problems.push('pace track has no "expected today" marker');
  const paceCells = await page.locator('.pace__cell').count();
  if (paceCells < 4) problems.push(`expected the pace breakdown cells, got ${paceCells}`);
  const paceWeeks = await page.locator('.pace .pw').count();
  if (paceWeeks !== 16) problems.push(`expected 16 week bars in the pace chart, got ${paceWeeks}`);
  if (/undefined|NaN/.test(paceText)) problems.push('pace panel prints undefined/NaN');

  // retention: the status panel must show earned numbers, not decoration
  const statusPanel = await page.locator('.status').count();
  if (!statusPanel) problems.push('status panel missing');
  const statusText = await page.locator('.status').innerText();
  console.log('status panel:', statusText.replace(/\n/g, ' | ').slice(0, 180));
  const statusLower = statusText.toLowerCase();
  for (const label of ['hours banked', 'this week', 'week streak', 'gates', 'sessions']) {
    if (!statusLower.includes(label)) problems.push(`status panel missing "${label}"`);
  }
  const markers = await page.locator('.status .marker').count();
  if (markers < 1) problems.push('no progress markers rendered');
  const creditSeg = await page.locator('.status .meter__credit').count();
  if (!creditSeg) problems.push('credited-hours segment missing from the bar');

  // the ordered walkthrough, with a live step count and a glossary
  const walkSteps = await page.locator('.walk__step').count();
  const walkCurrent = await page.locator('.walk__step[data-state="current"]').count();
  const defs = await page.locator('.walk__gloss .defs dt').count();
  console.log(`walkthrough steps: ${walkSteps} | current: ${walkCurrent} | glossary terms: ${defs}`);
  if (walkSteps < 6) problems.push(`walkthrough should list every step, got ${walkSteps}`);
  if (walkCurrent !== 1) problems.push(`exactly one walkthrough step should be current, got ${walkCurrent}`);
  if (defs < 5) problems.push(`glossary should define the plan's own vocabulary, got ${defs}`);
  const walkText = await page.locator('.walk').innerText();
  for (const word of ['Gate', 'Run sheet', 'Credit', 'Baseline']) {
    if (!walkText.includes(word)) problems.push(`walkthrough glossary missing "${word}"`);
  }

  await page.screenshot({ path: `${OUT}/03-program-top.png` });

  // ----------------------------------------------------------------- session
  await tab('session');

  const navText = await page.locator('.navsess__now').innerText();
  console.log('session navigator:', navText.replace(/\n/g, ' | '));
  const navMatch = navText.match(/session (\d+) of (\d+)/i);
  if (!navMatch) problems.push(`navigator does not say where you are: "${navText}"`);
  // The plan opens on the session dated today, so which number that is depends
  // on when the suite runs. Everything below is relative to it.
  const here = navMatch ? Number(navMatch[1]) : 1;
  const totalSessions = navMatch ? Number(navMatch[2]) : 0;
  if (totalSessions !== 80) problems.push(`expected 80 sessions in the plan, got ${totalSessions}`);

  // "add option to access next day program after day 1 finished": the next
  // session is shut until this one is logged, then it opens.
  const nextBefore = await page.locator('.navsess__btn:has-text("Next")').isDisabled();
  const unlockBefore = await page.locator('.unlock').getAttribute('data-state');
  console.log(`before logging session ${here} — next disabled:`, nextBefore, '| unlock panel:', unlockBefore);
  if (!nextBefore) problems.push(`session ${here + 1} was reachable before session ${here} was logged`);
  if (unlockBefore !== 'shut') problems.push('the unlock panel should start shut');
  const lockedChips = await page.locator('.chip[data-state="locked"]').count();
  if (!lockedChips) problems.push('later sessions in the week are not shown as locked');

  // the session card itself
  const todayCard = await page.locator('#view-root .card').first().innerText();
  const heading = await page.locator('#view-root .card h3').first().innerText();
  const occurrences = todayCard.split(heading).length - 1;
  console.log('session card repeats its heading', occurrences + 'x:', heading);
  if (occurrences > 1) problems.push(`session card repeats "${heading}" ${occurrences} times`);
  const cardStepLists = await page.locator('#view-root .card .steps').count();
  if (cardStepLists > 0) problems.push('session card duplicates its steps alongside the run sheet');
  const cardMeta = await page.locator('#view-root .card .mono.small.muted').first().innerText();
  console.log('session card duration:', cardMeta);
  if (/\d+\.\d+ hours/.test(cardMeta)) problems.push(`unreadable duration: ${cardMeta}`);
  const lesson = await page.locator('#view-root .card .lesson').count();
  if (!lesson) problems.push('session card carries no teaching note');

  // runsheet: per-step clock windows
  const rsRows = await page.locator('.runsheet .rs').count();
  const rsText = await page.locator('.runsheet').innerText();
  console.log('runsheet rows:', rsRows, '|', rsText.split('\n').slice(0, 4).join(' / '));
  if (rsRows < 3) problems.push(`expected runsheet rows, got ${rsRows}`);
  if (!/\d+:\d\d/.test(rsText)) problems.push('runsheet has no clock windows');

  // scoring and evidence controls
  const scaleBtns = await page.locator('.record .scale__btn').count();
  if (scaleBtns !== 5) problems.push(`expected a 1-5 scale, got ${scaleBtns}`);
  const diffBtns = await page.locator('.record .choice').count();
  if (diffBtns !== 3) problems.push(`expected 3 difficulty options, got ${diffBtns}`);

  await page.locator('.record .scale__btn').nth(3).click();
  await page.waitForTimeout(300);
  await page.locator('.record .choice').nth(0).click();   // "too easy"
  await page.waitForTimeout(400);
  const scored = await page.evaluate(() => {
    const p = window.Store.getProgress(window.Store.loadProgram().id);
    const k = Object.keys(p.records)[0];
    return { key: k, rec: p.records[k] };
  });
  console.log('recorded session:', JSON.stringify(scored.rec));
  if (!scored.rec || scored.rec.score !== 4 || scored.rec.difficulty !== 'easy') {
    problems.push('session score/difficulty did not persist');
  }

  // attach a file and confirm it lands in IndexedDB
  await page.setInputFiles('.record input[type="file"]', {
    name: 'take-01.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('first recording, 3 fillers per minute')
  });
  await page.waitForTimeout(800);
  const evName = await page.locator('.evidence__name').first().innerText().catch(() => '');
  console.log('attached evidence:', evName);
  if (!/take-01/.test(evName)) problems.push('evidence upload did not appear in the list');
  const persisted = await page.evaluate(async () => {
    const p = window.Store.getProgress(window.Store.loadProgram().id);
    const k = Object.keys(p.records)[0];
    const rows = await window.Evidence.listFor(k);
    return rows.map(r => r.name + ':' + r.size);
  });
  console.log('evidence in IndexedDB:', persisted.join(', '));
  if (!persisted.length) problems.push('evidence not stored in IndexedDB');

  // log this session — that is what opens the next one
  await page.locator('.record__done input').check();
  await page.waitForTimeout(400);
  const unlockAfter = await page.locator('.unlock').getAttribute('data-state');
  const unlockText = await page.locator('.unlock').innerText();
  console.log(`after logging session ${here} — unlock panel:`, unlockAfter, '|',
    unlockText.replace(/\n/g, ' ').slice(0, 120));
  if (unlockAfter !== 'open') problems.push(`logging session ${here} did not unlock session ${here + 1}`);
  if (!unlockText.includes(`Session ${here + 1}`)) {
    problems.push('the unlock panel does not name the next session');
  }

  await page.locator(`.unlock button:has-text("Open session ${here + 1}")`).click();
  await page.waitForTimeout(400);
  const navAfter = await page.locator('.navsess__now').innerText();
  console.log('after opening the next one:', navAfter.replace(/\n/g, ' | '));
  if (!new RegExp(`session ${here + 1} of`, 'i').test(navAfter)) {
    problems.push('opening the next session did not move the navigator');
  }
  // and the one after that is shut again until this one is logged
  const nextAgain = await page.locator('.navsess__btn:has-text("Next")').isDisabled();
  if (!nextAgain) problems.push(`session ${here + 2} opened without session ${here + 1} being logged`);
  // going back is always allowed
  await page.locator('.navsess__btn:has-text("Previous")').click();
  await page.waitForTimeout(300);
  if (!new RegExp(`session ${here} of`, 'i').test(await page.locator('.navsess__now').innerText())) {
    problems.push('could not navigate back to an earlier session');
  }
  await page.screenshot({ path: `${OUT}/11-session.png` });

  // -------------------------------------------------------------- curriculum
  await tab('curriculum');

  const phases = await page.locator('.module').count();
  console.log('modules:', phases);
  if (phases < 1) problems.push('no modules rendered');

  // "the courses still dont feel professional enough": a programme
  // specification, a module index, and each module as a specification.
  const specRows = await page.locator('.spec .spec__row').count();
  const specText = (await page.locator('.spec').innerText()).toLowerCase();
  console.log('programme specification rows:', specRows);
  if (specRows < 8) problems.push(`programme specification is too thin, got ${specRows} rows`);
  for (const field of ['programme', 'notional practice hours', 'assessment', 'award']) {
    if (!specText.includes(field)) problems.push(`programme specification missing "${field}"`);
  }
  if (!specText.includes('not an accredited qualification')) {
    problems.push('the specification overclaims — it must say it is self-certified');
  }
  const indexRows = await page.locator('.modindex tr').count();
  if (indexRows !== phases + 1) problems.push(`module index should list every module, got ${indexRows - 1}`);
  const modCodes = await page.locator('.module__code').count();
  if (modCodes !== phases) problems.push('modules are missing their codes');
  const los = await page.locator('.module .lo li').count();
  if (los < phases * 3) problems.push(`expected numbered learning outcomes, got ${los}`);
  const modSecLabels = (await page.locator('.mod-sec__label').allInnerTexts()).map(t => t.toLowerCase());
  for (const label of ['learning outcomes', 'scheme of work', 'practical work', 'assessment']) {
    if (!modSecLabels.some(l => l.includes(label))) {
      problems.push(`module specification missing a "${label}" section`);
    }
  }

  // every module must teach, not just list
  const briefs = await page.locator('.brief').count();
  const briefTerms = await page.locator('.brief__terms .defs dt').count();
  console.log(`teaching briefs: ${briefs}/${phases} | vocabulary entries: ${briefTerms}`);
  if (briefs !== phases) problems.push(`every module needs a teaching brief, got ${briefs} of ${phases}`);
  if (briefTerms < phases * 3) problems.push(`expected 3 terms per module, got ${briefTerms}`);
  const briefText = (await page.locator('.brief').first().innerText()).toLowerCase();
  for (const h of ['why it works', 'does not work', 'check your own work']) {
    if (!briefText.includes(h)) problems.push(`teaching brief missing "${h}"`);
  }

  const stageCount = await page.locator('.stage').count();
  const mistakeCount = await page.locator('.drill__mistake').count();
  const standardCount = await page.locator('.phase__standard').count();
  console.log('stages:', stageCount, 'drill mistakes:', mistakeCount, 'standards:', standardCount);
  if (stageCount < 3) problems.push(`expected stage blocks, got ${stageCount}`);
  if (mistakeCount < 4) problems.push(`expected drill mistakes, got ${mistakeCount}`);
  if (standardCount < 1) problems.push(`expected module standards, got ${standardCount}`);
  await page.screenshot({ path: `${OUT}/12-curriculum.png` });

  // ---------------------------------------------------------------- schedule
  await tab('schedule');

  const weeks = await page.locator('.week').count();
  console.log('weeks:', weeks);
  if (weeks !== 16) problems.push(`expected 16 week rows, got ${weeks}`);

  const stepItems = await page.locator('.steps li').count();
  console.log('individual steps in the schedule:', stepItems);
  if (stepItems < 50) problems.push(`expected many numbered steps, got ${stepItems}`);

  await page.locator('button:has-text("Expand all")').first().click();
  await page.waitForTimeout(400);

  // collapsed weeks are display:none, so this has to read an expanded schedule
  const scheduleText = await page.locator('#view-root').innerText();
  if (!/Renegotiate my compensation/.test(scheduleText)) {
    problems.push('stated objective never appears in the sessions');
  }
  if (/undefined|NaN|\[object Object\]/.test(scheduleText)) {
    problems.push('schedule view contains undefined/NaN/[object Object]');
  }
  await page.locator('.week').nth(1).scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/04-schedule.png` });

  // ticking sessions here must move the banked-hours bar, and persist
  // click() rather than check(): ticking rebuilds the view, and check() would
  // keep retrying against a node that no longer exists.
  const logged = () => page.evaluate(() =>
    Object.keys(window.Store.getProgress(window.Store.loadProgram().id).sessions).length);
  const beforeTick = await logged();
  const boxes = page.locator('.week .session input[type="checkbox"]');
  await boxes.nth(0).click();
  await page.waitForTimeout(300);
  await boxes.nth(2).click();
  await page.waitForTimeout(300);
  const afterTick = await logged();
  console.log('sessions logged before/after ticking:', beforeTick, '->', afterTick);
  if (afterTick <= beforeTick) problems.push('ticking a session in the schedule did not log it');
  // and the week it happened in stays open
  const stillOpen = await page.locator('.week[data-open="true"]').count();
  if (stillOpen < 2) problems.push('ticking a session folded the schedule back up');

  // -------------------------------------------------------------- assessment
  await tab('assessment');

  const gates = await page.locator('.gate').count();
  console.log('gates:', gates, 'modules:', phases);
  if (gates !== phases) problems.push('gate count != module count');

  const gateStates = await page.locator('.gate').evaluateAll(
    nodes => nodes.map(n => n.getAttribute('data-locked')));
  console.log('gate lock states:', gateStates.join(','));
  if (gateStates[0] !== 'false') problems.push('the first gate must start unlocked');
  if (gateStates.slice(1).some(s => s !== 'true')) problems.push('later gates must start locked');
  const lockLine = await page.locator('.gate[data-locked="true"] .gate__lockline').first().innerText();
  if (!/phase \d|module \d/i.test(lockLine)) problems.push('locked gate does not name what is blocking it');

  // "for gate to unlock I dont think it should be that easy as just clicking":
  // the gate states its three conditions, and the criteria cannot be ticked
  // until the module's work is logged and the evidence is written.
  const reqs = await page.locator('.gate').first().locator('.req').count();
  const reqText = (await page.locator('.gate').first().locator('.gate__reqs').innerText()).toLowerCase();
  console.log('gate requirements:', reqs, '|', reqText.replace(/\n/g, ' / ').slice(0, 200));
  if (reqs !== 3) problems.push(`the gate should state three conditions, got ${reqs}`);
  if (!/sessions logged/.test(reqText)) problems.push('the gate does not require the module\'s work');
  if (!/written evidence/.test(reqText)) problems.push('the gate does not require written evidence');

  // Gate 1's criteria are readable — you should know what you are working
  // toward — but until the module's work is logged there is nothing to tick
  // and no form to fill in.
  const firstGateCrits = await page.locator('.gate').first().locator('.crit').count();
  const firstGateInputs = await page.locator('.gate').first().locator('input').count();
  console.log('criteria on gate 1:', firstGateCrits, '| controls offered:', firstGateInputs);
  if (!firstGateCrits) problems.push('gate 1 has no criteria');
  if (firstGateInputs) {
    problems.push('gate 1 offered controls before the module\'s work was logged');
  }
  const lockedInputs = await page.locator('.gate[data-locked="true"] input').count();
  if (lockedInputs) problems.push('a locked gate is still offering controls');
  const lockedCrits = await page.locator('.gate[data-locked="true"] .crit').count();
  if (!lockedCrits) problems.push('a locked gate hides its criteria — they should still be readable');

  // log the whole of module 1, which is what opens its gate
  await page.evaluate(() => {
    const prog = window.Store.loadProgram();
    prog.schedule.forEach(w => {
      if (w.phase.index !== 1) return;
      w.sessions.forEach(s => {
        const k = 'w' + w.number + 'd' + s.day;
        const p = window.Store.getProgress(prog.id);
        if (!p.sessions[k]) window.Store.toggleSession(prog.id, k, s.hours);
      });
    });
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.gate', { timeout: 5000 });
  await page.waitForTimeout(300);

  const openedForms = await page.locator('.gate').first().locator('.crit textarea').count();
  console.log('evidence forms on the open gate:', openedForms);
  if (!openedForms) problems.push('doing the work did not open the gate for assessment');
  const stillDisabled = await page.locator('.gate').first().locator('.crit__claim input[disabled]').count();
  console.log('claim boxes still disabled with no evidence:', stillDisabled);
  if (stillDisabled !== openedForms) {
    problems.push('criteria became claimable on work alone, with no evidence written');
  }

  // a thin statement is not evidence
  await page.locator('.gate').first().locator('.crit textarea').first().fill('did it');
  await page.locator('.gate').first().locator('.crit textarea').first().dispatchEvent('change');
  await page.waitForTimeout(300);
  const afterThin = await page.locator('.gate').first().locator('.crit').first()
    .locator('.crit__claim input[disabled]').count();
  if (afterThin !== 1) problems.push('a six-character statement was accepted as evidence');

  // a real statement plus a named check makes it claimable
  await page.locator('.gate').first().locator('.crit textarea').first()
    .fill('Delivered the full ten-minute talk to the Tuesday meetup without notes and recorded the whole thing.');
  await page.locator('.gate').first().locator('.crit textarea').first().dispatchEvent('change');
  await page.waitForTimeout(300);
  await page.locator('.gate').first().locator('.crit input[type="text"]').first()
    .fill('Priya, who ran the meetup');
  await page.locator('.gate').first().locator('.crit input[type="text"]').first().dispatchEvent('change');
  await page.waitForTimeout(400);
  const critState = await page.locator('.gate').first().locator('.crit').first().getAttribute('data-state');
  console.log('first criterion after evidence:', critState);
  if (critState !== 'ready') problems.push(`evidence did not make the criterion claimable (${critState})`);

  await page.locator('.gate').first().locator('.crit__claim input:not([disabled])').first().check();
  await page.waitForTimeout(400);
  const claimed = await page.evaluate(() =>
    Object.keys(window.Store.getProgress(window.Store.loadProgram().id).gates).length);
  console.log('criteria claimed:', claimed);
  if (claimed < 1) problems.push('claiming a criterion did not persist');

  // transcript
  const transcriptRows = await page.locator('.transcript tr').count();
  const pills = await page.locator('.transcript .pill').count();
  console.log('transcript rows:', transcriptRows, '| status pills:', pills);
  if (transcriptRows < 2) problems.push('transcript table missing rows');
  if (pills < 1) problems.push('transcript status pills missing');
  const standing = await page.locator('.transcript__standing').innerText();
  if (!/credits/i.test(standing)) problems.push('credit standing missing');
  await page.screenshot({ path: `${OUT}/13-assessment.png` });

  // ---------------------------------------------------------------- handbook
  await tab('handbook');

  const setupSection = await page.locator('h3:has-text("Before week 1")').count();
  if (!setupSection) problems.push('Before week 1 section missing');
  const ladderRows = await page.locator('.ladder__row').count();
  if (ladderRows < 4) problems.push(`expected the full level ladder, got ${ladderRows}`);
  const handbookText = await page.locator('#view-root').innerText();
  if (/undefined|NaN|\[object Object\]/.test(handbookText)) {
    problems.push('handbook view contains undefined/NaN/[object Object]');
  }
  await page.locator('.verdict').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/05-verdict.png` });

  // --------------------------------------------------------------------- log
  await tab('log');

  await page.locator('#log-input').fill('Practised anchoring aloud, 5 reps.\nHard: dropped the number twice.\nNext: record it.');
  await page.locator('button:has-text("Add entry")').click();
  await page.waitForTimeout(400);
  const logs = await page.locator('.archive-item').count();
  console.log('log entries:', logs);
  if (logs < 1) problems.push('log entry not saved');

  // the tab you were on comes back with you
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.planbar', { timeout: 5000 });
  await page.waitForTimeout(300);
  const restored = await page.locator('#view-root').getAttribute('data-tab');
  console.log('tab after reload:', restored);
  if (restored !== 'log') problems.push(`the plan did not reopen on the tab you left it on (${restored})`);

  // exports actually produce files
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 5000 }),
    page.locator('button:has-text("Download as Markdown")').click()
  ]);
  const mdPath = `${OUT}/exported.md`;
  await dl.saveAs(mdPath);
  console.log('markdown export saved:', dl.suggestedFilename());

  const [ics] = await Promise.all([
    page.waitForEvent('download', { timeout: 5000 }),
    page.locator('button:has-text("Add to calendar")').click()
  ]);
  await ics.saveAs(`${OUT}/exported.ics`);
  console.log('ics export saved:', ics.suggestedFilename());

  // dispatch page
  const d = await ctx.newPage();
  watch(d, 'dispatch');
  await d.goto(`${BASE}/dispatch.html`, { waitUntil: 'networkidle' });
  await d.waitForTimeout(400);
  const tracks = await d.locator('.track').count();
  const archive = await d.locator('#archive .archive-item').count();
  console.log('\ndispatch tracks:', tracks, 'archive items:', archive);
  if (tracks !== 6) problems.push(`expected 6 tracks, got ${tracks}`);
  if (archive !== 14) problems.push(`expected 14 archive items, got ${archive}`);
  const todayText = await d.locator('#today').innerText();
  if (todayText.length < 200) problems.push('dispatch today card too short');
  await d.screenshot({ path: `${OUT}/06-dispatch.png` });

  await d.locator('.track:has-text("Strategy and Power")').click();
  await d.waitForTimeout(300);
  const afterSwitch = await d.locator('#today').innerText();
  if (afterSwitch === todayText) problems.push('track switch did not change the entry');
  await d.locator('button:has-text("Keep this")').click();
  await d.waitForTimeout(300);
  const kept = await d.locator('#saved .archive-item').count();
  if (kept < 1) problems.push('keeping a passage did not work');
  console.log('kept passages:', kept);

  // method page
  const m = await ctx.newPage();
  watch(m, 'method');
  await m.goto(`${BASE}/method.html`, { waitUntil: 'networkidle' });
  await m.screenshot({ path: `${OUT}/07-method.png` });

  // dark theme + mobile
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mp = await mob.newPage();
  watch(mp, 'mobile');
  await mp.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await mp.locator('[data-theme-toggle]').click();
  await mp.waitForTimeout(400);
  for (const pageName of ['index.html', 'program.html', 'dispatch.html', 'method.html']) {
    await mp.goto(`${BASE}/${pageName}`, { waitUntil: 'networkidle' });
    await mp.waitForTimeout(500);
    const overflow = await mp.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`mobile overflow ${pageName}: ${overflow}px`);
    if (overflow > 1) {
      const culprits = await mp.evaluate(() => {
        const w = document.documentElement.clientWidth;
        return [...document.querySelectorAll('*')]
          .filter(e => e.getBoundingClientRect().right > w + 1)
          .slice(0, 6)
          .map(e => `${e.tagName}.${e.className || ''}`.slice(0, 70));
      });
      problems.push(`${pageName} scrolls horizontally by ${overflow}px — ${culprits.join(' | ')}`);
    }
    if (pageName === 'index.html') {
      await mp.screenshot({ path: `${OUT}/08-mobile-dark.png`, fullPage: false });
    }
    if (pageName === 'program.html') {
      await mp.screenshot({ path: `${OUT}/10-mobile-program.png`, fullPage: false });
    }
  }

  // dark desktop program page
  const dk = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  const dp = await dk.newPage();
  watch(dp, 'dark');
  await dp.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await dp.evaluate(() => localStorage.setItem('st.theme', '"dark"'));
  await dp.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/09-dark-hero.png` });

  await browser.close();

  console.log('\n' + (problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'no console errors, no assertion failures'));
  process.exit(problems.length ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
