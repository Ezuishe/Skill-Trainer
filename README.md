# Skill Trainer

A planning instrument for deliberate practice. You give it a skill and the hours you
actually have; it gives you a dated training program — phases, named drills with
protocols, a weekly session schedule, and milestone gates with externally checkable
criteria — plus an honest verdict on what that hour budget really buys.

It also delivers a daily dispatch: one passage from a philosophical tradition you
choose, with an interpretation, a concrete practice for the day, and a counterweight.

**It does not promise success.** No training plan can, and the site says so on every
relevant page. What it does is refuse to sell a level your hours do not reach, and
show the arithmetic instead.

## What's here

| Page | Purpose |
|---|---|
| `index.html` | Discipline catalog and the commission form, with a live feasibility verdict |
| `program.html` | The generated program: verdict, phases, gates, dated schedule, progress, log |
| `dispatch.html` | Today's passage, the last fortnight's archive, kept passages |
| `method.html` | How programs are built, where the hour estimates come from, and the limits |

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
   where prior experience makes that reasonable.
5. **Sessions.** Each week is built from a session mix that shifts from acquisition
   toward production as the program advances, interleaved rather than blocked. Every
   phase ends at a gate; programs of ten weeks or more get consolidation weeks.
6. **Export.** Markdown, an `.ics` calendar of every session and gate, clipboard, print.

## Structure

```
index.html · program.html · dispatch.html · method.html
assets/css/main.css              design system (light + dark, print styles)
assets/js/data/disciplines.js    13 curricula: pillars, drills, gates, metrics, library
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
dose and protocol, hour thresholds ascend) and exercises the planner across the whole
input space, validating schedule/phase arithmetic, Markdown output, and RFC 5545 line
folding in the calendar export.

## Data and privacy

There is no account, no server, no analytics and no network calls except Google Fonts.
Programs, progress, logs and preferences live in `localStorage` and nowhere else. If
the fonts fail to load, the CSS fallback stacks carry the design.

## Notes on content

Hour estimates are informed approximations, not measurements of any individual, and
`method.html` says so. Passages in the dispatch are attributed to a work where one is
identifiable; entries that are commonly misattributed say so in the reading rather
than passing the attribution along silently. Material touching money and physical
training is general education, not professional advice.
