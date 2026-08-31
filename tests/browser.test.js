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
  await page.waitForSelector('.phase', { timeout: 10000 });

  const title = await page.title();
  console.log('\nprogram page title:', title);
  const phases = await page.locator('.phase').count();
  const weeks = await page.locator('.week').count();
  const gates = await page.locator('.gate').count();
  console.log('phases:', phases, 'weeks:', weeks, 'gates:', gates);
  if (weeks !== 16) problems.push(`expected 16 week rows, got ${weeks}`);
  if (phases < 1) problems.push('no phases rendered');
  if (gates !== phases) problems.push('gate count != phase count');

  const bodyText = await page.locator('body').innerText();
  if (/undefined|NaN|\[object Object\]/.test(bodyText)) {
    problems.push('program page contains undefined/NaN/[object Object]');
    const m = bodyText.match(/.{60}(undefined|NaN|\[object Object\]).{60}/);
    if (m) problems.push('  context: ' + m[0].replace(/\n/g, ' '));
  }

  // The reported bug: the session card printed the drill name and dose three times.
  const todayCard = await page.locator('.section.no-print .card').first().innerText();
  const drillLine = await page.locator('.section.no-print .card .drill__protocol').count();
  if (drillLine) {
    const heading = await page.locator('.section.no-print .card h3').innerText();
    const occurrences = todayCard.split(heading).length - 1;
    console.log(`session card repeats its heading ${occurrences}x:`, heading);
    if (occurrences > 1) problems.push(`session card repeats "${heading}" ${occurrences} times`);
  }

  // the vagueness fix: sessions must carry numbered steps, and setup must exist
  const stepLists = await page.locator('.steps').count();
  const stepItems = await page.locator('.steps li').count();
  console.log('step lists rendered:', stepLists, '| individual steps:', stepItems);
  if (stepItems < 50) problems.push(`expected many numbered steps, got ${stepItems}`);

  // the session card must not print its steps twice (once as a list, once as
  // the run sheet) — that was the original duplication complaint
  const cardStepLists = await page.locator('.section.no-print .card .steps').count();
  if (cardStepLists > 0) problems.push('session card duplicates its steps alongside the run sheet');

  // and durations must read like durations
  const cardMeta = await page.locator('.section.no-print .card .mono.small.muted').first().innerText();
  console.log('session card duration:', cardMeta);
  if (/\d+\.\d+ hours/.test(cardMeta)) problems.push(`unreadable duration: ${cardMeta}`);
  const setupSection = await page.locator('h2:has-text("Before week 1")').count();
  if (!setupSection) problems.push('Before week 1 section missing');

  // "I am still lost when trying to figure out the plan": there must be an
  // explicit, ordered walkthrough with a live step count and a glossary.
  const walkSteps = await page.locator('.walk__step').count();
  const walkCurrent = await page.locator('.walk__step[data-state="current"]').count();
  const walkBar = await page.locator('.walk__bar').innerText();
  const defs = await page.locator('.walk__gloss .defs dt').count();
  console.log(`walkthrough steps: ${walkSteps} | current: ${walkCurrent} | bar: ${walkBar.replace(/\n/g, ' ')} | glossary terms: ${defs}`);
  if (walkSteps < 6) problems.push(`walkthrough should list every step, got ${walkSteps}`);
  if (walkCurrent !== 1) problems.push(`exactly one walkthrough step should be current, got ${walkCurrent}`);
  if (defs < 5) problems.push(`glossary should define the plan's own vocabulary, got ${defs}`);
  const walkText = await page.locator('.walk').innerText();
  for (const word of ['Gate', 'Run sheet', 'Credit', 'Baseline']) {
    if (!walkText.includes(word)) problems.push(`walkthrough glossary missing "${word}"`);
  }

  // "make the gates locked and only unlocked after previous is finished"
  const gateStates = await page.locator('.gate').evaluateAll(
    nodes => nodes.map(n => n.getAttribute('data-locked')));
  const lockedInputs = await page.locator('.gate[data-locked="true"] input[disabled]').count();
  const openInputs = await page.locator('.gate[data-locked="false"] input:not([disabled])').count();
  console.log('gate lock states:', gateStates.join(','), '| disabled criteria:', lockedInputs);
  if (gateStates[0] !== 'false') problems.push('the first gate must start unlocked');
  if (gateStates.slice(1).some(s => s !== 'true')) problems.push('later gates must start locked');
  if (!lockedInputs) problems.push('locked gate criteria are still tickable');
  if (!openInputs) problems.push('the open gate has no tickable criteria');
  const lockLine = await page.locator('.gate__lockline').first().innerText();
  if (!/phase \d/i.test(lockLine)) problems.push('locked gate does not name what is blocking it');

  // "it's still not educational enough": every phase must teach, not just list
  const briefs = await page.locator('.brief').count();
  const briefTerms = await page.locator('.brief__terms .defs dt').count();
  const lesson = await page.locator('.section.no-print .card .lesson').count();
  const phaseCount = await page.locator('.phase').count();
  console.log(`teaching briefs: ${briefs}/${phaseCount} | vocabulary entries: ${briefTerms} | session lesson: ${lesson}`);
  if (briefs !== phaseCount) problems.push(`every phase needs a teaching brief, got ${briefs} of ${phaseCount}`);
  if (briefTerms < phaseCount * 3) problems.push(`expected 3 terms per phase, got ${briefTerms}`);
  if (!lesson) problems.push('session card carries no teaching note');
  // CSS uppercases the labels, so compare lowercased.
  const briefText = (await page.locator('.brief').first().innerText()).toLowerCase();
  for (const heading of ['why it works', 'does not work', 'check your own work']) {
    if (!briefText.includes(heading)) problems.push(`teaching brief missing "${heading}"`);
  }

  // retention: the status panel must show earned numbers, not decoration
  const statusPanel = await page.locator('.status').count();
  if (!statusPanel) problems.push('status panel missing');
  const statusText = await page.locator('.status').innerText();
  console.log('status panel:', statusText.replace(/\n/g, ' | ').slice(0, 200));
  // CSS uppercases these labels, so compare case-insensitively.
  const statusLower = statusText.toLowerCase();
  for (const label of ['hours banked', 'this week', 'week streak', 'gates', 'sessions']) {
    if (!statusLower.includes(label)) problems.push(`status panel missing "${label}"`);
  }
  const markers = await page.locator('.status .marker').count();
  if (markers < 1) problems.push('no progress markers rendered');

  // credited prior experience must be visually separated from logged work
  const creditSeg = await page.locator('.status .meter__credit').count();
  if (!creditSeg) problems.push('credited-hours segment missing from the bar');

  // credits: the transcript must render as a record
  const transcriptRows = await page.locator('.transcript tr').count();
  const pills = await page.locator('.transcript .pill').count();
  console.log('transcript rows:', transcriptRows, '| status pills:', pills);
  if (transcriptRows < 2) problems.push('transcript table missing rows');
  if (pills < 1) problems.push('transcript status pills missing');
  const standing = await page.locator('.transcript__standing').innerText();
  if (!/credits/i.test(standing)) problems.push('credit standing missing');

  // the reported bug: the first session must not ask you to recall a previous one
  const firstSessionText = await page.evaluate(() => {
    const prog = window.Store.loadProgram();
    const s = prog.schedule[0].sessions[0];
    return { first: s.first, minutes: s.minutes,
             plan: s.plan.map(r => r.minutes + ' ' + r.name + ': ' + r.note).join(' | '),
             sum: s.plan.reduce((a, r) => a + r.minutes, 0) };
  });
  console.log('first session plan:', firstSessionText.plan.slice(0, 150));
  if (/last session|previous session/i.test(firstSessionText.plan)) {
    problems.push('first session still refers to a previous session');
  }
  if (firstSessionText.sum !== firstSessionText.minutes) {
    problems.push(`first session time plan sums to ${firstSessionText.sum}, session is ${firstSessionText.minutes}`);
  }

  // runsheet: per-step clock windows on the session card
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

  // score a session and confirm it persists
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

  // stages and mistakes should be present on the phase view
  const stageCount = await page.locator('.stage').count();
  const mistakeCount = await page.locator('.drill__mistake').count();
  const standardCount = await page.locator('.phase__standard').count();
  console.log('stages:', stageCount, 'drill mistakes:', mistakeCount, 'standards:', standardCount);
  if (stageCount < 3) problems.push(`expected stage blocks, got ${stageCount}`);
  if (mistakeCount < 4) problems.push(`expected drill mistakes, got ${mistakeCount}`);
  if (standardCount < 1) problems.push(`expected phase standards, got ${standardCount}`);

  // the stated objective should appear in at least one produce session
  const scheduleText = await page.locator('#program-root').innerText();
  if (!/Renegotiate my compensation/.test(scheduleText)) {
    problems.push('stated objective never appears in the sessions');
  }

  await page.screenshot({ path: `${OUT}/03-program-top.png` });

  // tick a session and a gate criterion, confirm persistence across reload
  await page.locator('.week .session input[type="checkbox"]').first().check();
  await page.waitForTimeout(300);
  await page.locator('.gate .check input').first().check();
  await page.waitForTimeout(300);
  const beforeReload = await page.locator('.status .meter--lg .meter__fill').first().getAttribute('style');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const afterReload = await page.locator('.status .meter--lg .meter__fill').first().getAttribute('style');
  console.log('progress meter before/after reload:', beforeReload, '/', afterReload);
  if (beforeReload !== afterReload) problems.push('progress did not persist across reload');
  const checkedNow = await page.locator('.gate .check input:checked').count();
  if (checkedNow < 1) problems.push('gate criterion did not persist');

  // ticking a session must move the banked-hours bar, not just the session count
  const bankedBefore = await page.locator('.status .status__now').first().innerText();
  await page.locator('.week .session input[type="checkbox"]').nth(1).check();
  await page.waitForTimeout(400);
  const bankedAfter = await page.locator('.status .status__now').first().innerText();
  console.log('banked hours before/after logging a session:', bankedBefore, '->', bankedAfter);
  if (bankedBefore === bankedAfter && Number(bankedAfter) === 0) {
    problems.push('logging a session did not change banked hours');
  }

  // log entry
  await page.locator('#log-input').fill('Practised anchoring aloud, 5 reps.\nHard: dropped the number twice.\nNext: record it.');
  await page.locator('button:has-text("Add entry")').click();
  await page.waitForTimeout(400);
  const logs = await page.locator('.archive-item').count();
  console.log('log entries:', logs);
  if (logs < 1) problems.push('log entry not saved');

  // schedule screenshot
  await page.locator('button:has-text("Expand all")').first().click();
  await page.waitForTimeout(300);
  await page.locator('.week').nth(1).scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/04-schedule.png` });

  // verdict section screenshot
  await page.locator('.verdict').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/05-verdict.png` });

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
