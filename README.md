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
