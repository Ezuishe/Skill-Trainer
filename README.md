# Skill Trainer

A planning tool for deliberate practice. You give it a skill and the hours you actually
have. It gives you back a dated training plan: phases that escalate through named
stages, drills with a dose, a protocol and the mistake people usually make, a weekly
session schedule, and gates with criteria someone else could check you against. Plus an
honest verdict on what that many hours really buys.

It also runs a daily dispatch: one passage from a tradition you choose, with what it
means, one thing to do about it today, and the argument against taking it too far.

**It does not promise success.** No training plan can, and the site says so on every
page where it matters. What it does instead is refuse to sell you a level your hours do
not reach, and show the arithmetic.

## What's here

| Page | Purpose |
|---|---|
| `index.html` | The catalogue and the plan builder, with a live feasibility verdict |
| `program.html` | The generated plan: verdict, phases, stages, gates, dated schedule, progress, log |
| `dispatch.html` | Today's passage, the last fortnight, and anything you kept |
| `method.html` | How plans are built, where the hour estimates come from, and the limits |

## What's in the curriculum

13 skills · 65 pillars · 260 drills · 1,046 numbered session steps · 195 stages ·
65 gates with 195 criteria · 6 philosophical tracks × 12 entries.

**Every session tells you what to do.** Earlier versions only had a protocol on
drill days, which was 25% of sessions; the other 75% were a topic label and a
platitude. Acquire and produce sessions now carry authored, numbered steps, and
the weekly review has a fixed six-point procedure. Coverage is asserted in the
tests, so it cannot regress.

Every discipline also has a **Before week 1** section: the tools you need, where
the honest feedback will come from, and a baseline to measure now so progress is
visible later.

Every pillar carries:

- **competencies** — what you need to be able to do
- **stages** — how the work escalates from the first week of the phase to the last, so
  week 4 is not a repeat of week 1
- **drills** — a dose, a protocol, and `mistake`: what usually goes wrong, which is
  the part most curricula leave out
- **standard** — what "done" looks like in one sentence
- **milestone** — the gate, with criteria another person could verify
- **study / make** (in `data/sessions-*.js`) — the actual step-by-step work for
  acquire and produce sessions, each `make` ending in a "done when" test

## Credits and the transcript

Each phase is a **module** worth credits equal to its practice hours, with a code
(`SPK-01`). Credits build as you log sessions and the module is **awarded in
full** when every gate criterion passes. Hours are attendance; the award is
evidence, and hours alone never complete a module.

The transcript lists every module with weeks, sessions done, gate progress,
credits and status, plus your standing: credits earned of the total and modules
awarded of the total.

## The run sheet

Every session carries a minute-by-minute run sheet with clock windows, built
from that session's own steps rather than four generic bands:

```
RUN SHEET                                     130 min · 7 blocks
0:00  12 min   Recall      Notes shut. Write what you remember...
0:12  20 min   Step 1      Write the one sentence you want repeated...   [cut first if short]
0:32  22 min   Step 2      Outline three movements that serve it...
...
1:57  13 min   Log it      Three lines, then score this session.
```

Steps are not equal in size, so minutes are allocated by weight. The rules are
named and testable (`repetition`, `timed-block`, `volume`, `produce`, `analyse`,
`capture`), so "Record five minutes and repeat until under two per minute" gets
more time than "Note the date." The lightest working step is marked **cut first
if short**, so running out of time does not mean cutting the drill.

Drill sessions whose dose implies two to six repetitions are split into
individual reps, each prompting you to name what you are fixing from the last one.

## Evidence and scoring

Each session can be recorded, not just ticked:

- **A score out of five** for how it went.
- **How hard it felt** — too easy, about right, too hard.
- **Evidence**: attach recordings, drafts, screenshots. Files live in
  IndexedDB, so they stay in your browser like everything else. 25 MB per file,
  with quota errors reported plainly rather than failing silently.
- **A note** on what to change next time.

Difficulty feeds a **calibration check** that enforces the band the method
commits to. Mark four of six sessions too easy and the plan says so:

> You have marked 4 of your last 6 sessions too easy. That is practice below
> your level, and it will not move anything. Raise the difficulty: more volume,
> a shorter time limit, or a harder audience.

Scores also produce a trend and a plateau warning: eight or more scored sessions
with no improvement suggests changing one variable, not three.

## How a session is spent

Each session carries its own breakdown in real minutes, computed from that
session's own length rather than once for the whole plan. Four shapes:

| Type | Shape |
|---|---|
| Acquire | Recall 10% · Take it in 55% · Put it to use 25% · Log 10% |
| Drill | Warm up 10% · Reps 60% · Check the output 20% · Log 10% |
| Produce | Recall 10% · Make it 60% · Show someone 20% · Log 10% |
| Review | Count 20% · Score the gate 35% · Name the weakness 30% · Write it up 15% |

The **first session of a plan** replaces the recall step with setting up and
taking your baseline, because there is no previous session to recall from.

Weekly reviews are capped at 30 minutes and the freed time goes to the sessions
that are actually training. Everything is allocated in whole minutes, so a week
sums to exactly the hours you asked for and each session's breakdown sums to
exactly that session.

## Coming back

A plan you read once is a plan you abandon. The program page opens on a status
panel built from work you actually logged:

- **Hours banked** against the threshold the site quoted you at the start, as
  the headline bar. Hours credited for prior experience are drawn in a paler
  tone behind the hours you logged, so the bar never claims you did work you
  did not do.
- **This week**, **week streak**, **gate criteria passed**, **sessions done**.
- A plain line on where you stand, and markers for what you have reached with
  the next one along.

Streaks are counted in weeks, not days: plans schedule four or five sessions a
week, so a day streak would break by design and punish someone following the
plan correctly. A quiet current week does not break the streak until it is over.

Lapse copy is recovery, not scolding. One miss says one miss is noise. A
fortnight says restarting costs one session rather than the whole plan.

The landing page shows a resume card when a plan exists, so a returning visitor
lands on their next session rather than an empty form.

Nothing here is awarded for opening the page, and nothing animates. `stats.js`
is pure and tested: streak arithmetic, the grace week, threshold crossings and
bar bounds all have cases in `plan.test.js`.

## Running it

It is a static site with no build step and no dependencies. Open `index.html`
directly, or serve the folder:

```sh
npx http-server -p 8080 .     # then open http://127.0.0.1:8080
```

Deploying is a matter of copying the directory to any static host (GitHub Pages,
Netlify, S3, nginx).

## How the planner works

1. **Budget.** `weeks × hours/week` = total deliberate practice hours. Your stated
   starting level credits a bank of prior hours.
2. **Verdict.** The total is compared against four thresholds held per discipline —
   functional, working competence, professional, elite. The reached level is stated
   plainly, along with what it buys, what it does not, and the three levers to go
   further (extend the horizon, raise intensity, narrow scope), each quantified.
3. **Scope.** If the budget cannot cover a discipline properly, whole pillars are cut
   rather than thinned, and the program names what was excluded. Eighty hours on two
   pillars beats eighty hours skimmed across five.
4. **Phases.** Pillars become dated phases, weighted by importance and compressed
   where prior experience makes that reasonable. Each phase walks its stages at
   whatever speed its length allows.
5. **Sessions.** Each week is built from a session mix that shifts from taking things
   in toward making things as the plan advances, interleaved rather than blocked. Every
   session states one task once: a drill's name, dose, protocol and mistake appear
   exactly where they belong and nowhere else. Sessions also point at the objective you
   typed, so the plan stays aimed at what you asked for.
6. **Export.** Markdown, an `.ics` calendar of every session and gate, clipboard, print.

## Structure

```
index.html · program.html · dispatch.html · method.html
assets/css/main.css              design system (light + dark, print styles)
assets/js/data/disciplines-01-communication.js   writing, speaking, design
assets/js/data/disciplines-02-influence.js       negotiation, selling, product
assets/js/data/disciplines-03-building.js        software, applied AI, capital
assets/js/data/disciplines-04-foundation.js      leadership, judgement, learning, consistency
assets/js/data/sessions-01..04.js                the numbered steps for every
                                                 acquire and produce session
assets/js/data/setup.js                          tools, arena and baseline per skill
assets/js/data/dispatch.js       6 traditions × 12 entries
assets/js/engine.js              the planner: verdict, scope, phases, schedule, exports
assets/js/dispatch-core.js       deterministic date-based selection
assets/js/store.js               localStorage persistence
assets/js/stats.js               streaks, hours banked, momentum (pure, tested)
assets/js/app.js                 theme, toasts, download/copy helpers
assets/js/index.js               catalog + commission form + live preview
assets/js/program.js             program rendering, progress, gates, log
assets/js/dispatch-page.js       dispatch page
tests/                           node + browser test harnesses
```

## Tests

```sh
node tests/plan.test.js        # data integrity + 2,340 planner cases, no dependencies
node tests/browser.test.js     # end-to-end in Chromium; needs playwright installed
```

`plan.test.js` checks curriculum integrity (pillar weights sum to 1, every drill has a
dose, protocol and mistake, every pillar has stages and a standard, hour thresholds
ascend) and exercises the planner across the whole input space, validating
schedule/phase arithmetic, Markdown output, and RFC 5545 line folding in the calendar
export. It also asserts that a session's title never repeats its own drill dose, which
is the regression that produced a card saying the same thing three times.

It also asserts that **every session in every generated plan has either numbered
steps or a drill protocol** — the check that stops plans drifting back toward
vagueness — and that every authored step is a written instruction rather than a
fragment.

`browser.test.js` additionally checks that the session card does not repeat its heading,
that stages, drill mistakes, standards and numbered steps render, that the "Before week 1"
section exists, that your stated objective actually appears in the sessions, and that no
page scrolls sideways at 390px.

## Data and privacy

There is no account, no server, no analytics and no network calls except Google Fonts.
Programs, progress, logs and preferences live in `localStorage` and nowhere else. If
the fonts fail to load, the CSS fallback stacks carry the design.

## Notes on content

Hour estimates are approximations rather than measurements of any individual, and
`method.html` says so. Dispatch passages are attributed to a work where one is
identifiable, and the entries that are commonly misattributed say so in the reading
instead of passing the attribution along quietly. Anything touching money or physical
training is general education rather than professional advice.

The prose aims to read as though a person wrote it: no em-dash-per-sentence habit, no
"it's not X, it's Y" constructions, and no aphorism where a plain sentence would do.
