/*
 * teaching-03-building.js — see teaching-01-communication.js for the schema.
 */

window.PILLAR_TEACHING = Object.assign(window.PILLAR_TEACHING || {}, {

  /* ------------------------------------------- SOFTWARE ENGINEERING */

  'software-engineering/fundamentals': {
    idea: 'Fluency is the goal, not familiarity. Being able to write a loop after looking it up is not the same as writing it without breaking your train of thought, and the difference decides whether you can hold a real problem in your head while solving it.',
    why: 'Working memory is the bottleneck in programming. Every construct you have to think about consumes a slot that the actual problem needed. Fluency in the basics is what frees enough capacity to reason about anything harder.',
    misread: 'That fundamentals means memorising algorithms for interviews. What matters day to day is smaller and duller: knowing your language\'s data structures cold, reading a stack trace without panic, and using a debugger instead of print statements.',
    tell: 'Time yourself implementing something small you have done before. If you are reaching for search on syntax rather than on library behaviour, that is the gap.',
    terms: [
      { term: 'Time complexity', meaning: 'How runtime grows with input size, written as O(n), O(n log n) and so on. Matters at the point where n gets large, and is why the right data structure beats a faster machine.' },
      { term: 'Invariant', meaning: 'Something that must stay true throughout a piece of code. Naming invariants is most of what makes tricky logic tractable.' },
      { term: 'Stack trace', meaning: 'The call chain at the moment of failure, innermost first. Reading it properly is the single most underused debugging skill.' }
    ]
  },

  'software-engineering/shipping': {
    idea: 'Getting something live is its own skill, separate from writing code. Deployment, configuration, secrets, migrations, monitoring: engineers who cannot do these produce work that stays on a branch, and branches are worth nothing.',
    why: 'Software only has value in production, where it meets real data and real users. Every step between your machine and there is a place work stops. Shortening that path is what makes an engineer productive far more than typing speed does.',
    misread: 'That deployment is somebody else\'s job. It is the part of the job that determines whether the rest counted, and outsourcing it entirely means never learning what your code actually does under load.',
    tell: 'Time how long it takes you to get a one-line change from your editor into production. That number is a fair measure of how much friction you are working through every day.',
    terms: [
      { term: 'CI/CD', meaning: 'Continuous integration and delivery: automated build, test and deploy on every change. Turns releasing from an event into a non-event.' },
      { term: 'Environment parity', meaning: 'How closely development matches production. Every difference is a class of bug that only appears after release.' },
      { term: 'Rollback', meaning: 'Getting back to the last working version quickly. Deploying confidently is a function of rolling back cheaply.' }
    ]
  },

  'software-engineering/quality': {
    idea: 'Tests exist so you can change code without fear. That is the actual purpose, and it explains which tests are worth writing: the ones covering behaviour you would be afraid to break, not the ones that push a coverage number up.',
    why: 'Most of a system\'s cost is in changes made after it was first written. A test suite is what makes those changes cheap, because it converts "I think this still works" into "I know within thirty seconds". Without it, code gets more expensive to touch every month.',
    misread: 'That high coverage means quality. Coverage counts lines executed, not behaviour verified. A suite that tests implementation details raises coverage and makes refactoring harder, which is exactly backwards.',
    tell: 'Make a deliberate small breaking change and run the suite. If nothing fails, the tests were watching something other than what matters.',
    terms: [
      { term: 'Test pyramid', meaning: 'Many fast unit tests, fewer integration tests, a handful of end-to-end tests. Inverting it produces a suite that is slow and flaky.' },
      { term: 'Flaky test', meaning: 'One that passes and fails on the same code. Worse than no test, because it trains everyone to ignore red.' },
      { term: 'Refactoring', meaning: 'Changing structure without changing behaviour. Only meaningful when tests can confirm the second half of that sentence.' }
    ]
  },

  'software-engineering/systems': {
    idea: 'Architecture is the set of decisions that are expensive to reverse. Which boundaries exist, what the data model is, where state lives. Most other decisions are cheap and should not be agonised over; these are the ones worth the meeting.',
    why: 'Systems fail at their boundaries — network calls, queues, shared state, partial failure. Understanding what happens when one part is slow or down, rather than absent, is what separates a design that degrades from one that collapses.',
    misread: 'That systems design means reaching for microservices and distributed queues. Distribution buys scalability with a large and permanent complexity bill. Most systems that adopt it early get the bill without needing the scale.',
    tell: 'Draw your system, then mark every arrow that crosses a process boundary. Ask what happens when each one is slow rather than down. The answers you do not have are your risk.',
    terms: [
      { term: 'Idempotency', meaning: 'A operation that can be repeated safely. Since networks retry, anything that is not idempotent will eventually happen twice.' },
      { term: 'Backpressure', meaning: 'Making a fast producer slow down when a consumer cannot keep up. Without it, queues grow until something falls over.' },
      { term: 'Coupling', meaning: 'How much one part must know about another to work. The thing architecture is actually managing.' }
    ]
  },

  'software-engineering/leverage': {
    idea: 'Impact comes from choosing what to build, not only from building it well. An engineer who ships the right thing at moderate quality beats one who ships an unnecessary thing beautifully, and the gap widens with seniority.',
    why: 'The value of engineering work is set by what it unblocks. Tooling that saves twenty people ten minutes a day outweighs a personal productivity gain by two orders of magnitude, and this kind of arithmetic is available to anyone willing to do it.',
    misread: 'That leverage means managing people. Plenty of it is technical: removing a bottleneck, writing the document that stops a bad decision, building the tool nobody asked for because nobody knew it was possible.',
    tell: 'For each thing you shipped this quarter, write who was unblocked and by how much. Blank rows mean effort that did not convert.',
    terms: [
      { term: 'Force multiplier', meaning: 'Work whose value is other people\'s output rather than your own. Tooling, documentation, review, standards.' },
      { term: 'Toil', meaning: 'Manual, repetitive work that scales with usage and produces no lasting value. The obvious target for automation, and usually invisible until measured.' },
      { term: 'Design document', meaning: 'A written proposal circulated before building. Cheap place to be wrong, and the main way senior engineers change outcomes.' }
    ]
  },

  /* ---------------------------------------------------- APPLIED AI */

  'applied-ai/direction': {
    idea: 'Getting good output from a model is mostly about specifying the task properly: what the output should look like, what counts as correct, what context is relevant. Vague requests produce plausible, generic answers because that is what was asked for.',
    why: 'Models are extremely sensitive to what you supply. Giving a worked example, stating the format, and providing the relevant source material change results far more than changing tone or adding urgency. This is why examples beat adjectives.',
    misread: 'That prompting is a bag of magic phrases. Incantations rarely survive a model update. What survives is the structural discipline: clear task, real context, explicit output format, stated failure mode.',
    tell: 'Run the same prompt three times. If the answers differ in ways that matter to you, the task was underspecified — that variance is a measurement of your prompt, not the model.',
    terms: [
      { term: 'Few-shot', meaning: 'Including worked examples of input and desired output. Usually the cheapest large improvement available.' },
      { term: 'Context window', meaning: 'How much text the model can consider at once. Everything relevant must fit, and what is buried in the middle gets less attention than what is at the edges.' },
      { term: 'Hallucination', meaning: 'Confident, fluent, false output. Reduced by supplying sources and asking for citations; never eliminated, so verification is part of the workflow.' }
    ]
  },

  'applied-ai/automation': {
    idea: 'The value is in automating tasks you actually repeat, and the first step is knowing what those are. A model applied to a task you do twice a year is a hobby; applied to something daily it compounds.',
    why: 'Automation pays back proportional to frequency times duration, minus the cost of checking the output. That last term is why unreliable automation of a high-stakes task can be worse than doing it manually — verification costs more than the work.',
    misread: 'That the goal is removing yourself from the loop. For most valuable work the good design keeps a human at the decision point and automates the preparation around it. Full autonomy is a much higher bar than it looks.',
    tell: 'Log what you do for a week and mark anything done more than three times. That list, ranked by time spent, is your automation backlog and it beats any speculation.',
    terms: [
      { term: 'Human in the loop', meaning: 'A design where a person approves or corrects before an action takes effect. The right default wherever mistakes are costly.' },
      { term: 'Structured output', meaning: 'Forcing responses into a defined shape (JSON, a schema) so downstream code can rely on them. Turns a demo into a component.' },
      { term: 'Failure mode', meaning: 'How the automation goes wrong, not whether. Design for the wrong answer arriving confidently, because that is the one that will happen.' }
    ]
  },

  'applied-ai/building': {
    idea: 'An AI feature is ordinary software with a probabilistic component in the middle. Everything you know about error handling, latency, cost and observability still applies, and most production failures are in that ordinary part rather than in the model.',
    why: 'Non-determinism breaks assumptions your code makes silently. The same input can produce different output, calls can be slow or fail, and costs scale with usage. Systems that ignore this work in a demo and fall over with real traffic.',
    misread: 'That building with models is a new discipline requiring new principles. The retrieval, caching, fallback and evaluation problems are recognisably the same as in any system that calls an unreliable, expensive external service.',
    tell: 'Ask what your feature does when the model returns something malformed, when it is slow, and when it is confidently wrong. Three answers, or you have a prototype.',
    terms: [
      { term: 'RAG', meaning: 'Retrieval-augmented generation: fetching relevant documents and putting them in the prompt so answers are grounded in your data rather than in recollection.' },
      { term: 'Chunking', meaning: 'How source documents are split before retrieval. Gets far less attention than it deserves and often decides whether retrieval works at all.' },
      { term: 'Guardrail', meaning: 'A check on input or output that enforces a rule the model cannot be trusted to keep. Deterministic code around a probabilistic core.' }
    ]
  },

  'applied-ai/evaluation': {
    idea: 'Without a way to measure output quality, you are tuning by vibes. An evaluation set — inputs with known-good outputs and a scoring rule — is what turns "that seems better" into evidence, and it is the thing that separates serious work from demos.',
    why: 'Changes to prompts and models improve some cases and quietly break others. Only a fixed test set makes that visible. This is the same reason software has regression tests, and the consequences of skipping it are the same but harder to notice.',
    misread: 'That evaluation needs to be sophisticated before it is worth doing. Twenty hand-labelled examples in a spreadsheet catch most regressions and can be built in an afternoon. The elaborate version is a later problem.',
    tell: 'Change your prompt and re-run your eval set. If you cannot say whether it got better with a number, you have no basis for keeping the change.',
    terms: [
      { term: 'Eval set', meaning: 'A fixed collection of inputs with expected outputs or a rubric. The fixed part is what makes comparison meaningful.' },
      { term: 'LLM-as-judge', meaning: 'Using a model to score outputs against a rubric. Scales well, is biased in known ways, and needs spot-checking against human labels.' },
      { term: 'Regression', meaning: 'A change that fixes one case and breaks another. The default outcome of prompt edits made without an eval set.' }
    ]
  },

  'applied-ai/judgment': {
    idea: 'The most valuable skill here is deciding what not to build. Knowing where models are unreliable, where the cost of being wrong is high, and where a simpler tool does the job saves more than any amount of implementation skill.',
    why: 'Models are strong at fluent transformation of text and weak at guarantees. Tasks needing exact arithmetic, verifiable citations or auditable decisions are a poor fit as a core, and putting one there produces a system that is impressive and untrustworthy.',
    misread: 'That the question is whether the model is capable. The question is whether the failure rate is acceptable for that task, given what a wrong answer costs and who catches it. Ninety-five per cent is excellent for a draft and unacceptable for a payment.',
    tell: 'For anything you are considering, write what a wrong output costs and who would notice. If the cost is high and nobody would notice, stop.',
    terms: [
      { term: 'Cost of error', meaning: 'What one wrong output actually does. The variable that decides whether an accuracy rate is good enough.' },
      { term: 'Automation bias', meaning: 'The documented tendency to accept machine output with less scrutiny than a human\'s. Designs that rely on people catching errors need to account for it.' },
      { term: 'Determinism boundary', meaning: 'The line between what your code guarantees and what the model merely tends to do. Know where it is before you ship.' }
    ]
  },

  /* --------------------------------------------- CAPITAL ALLOCATION */

  'capital-allocation/foundation': {
    idea: 'Before any investing question matters, the base has to be in place: no expensive debt, a cash buffer, and a known monthly surplus. Returns on an unstable base get liquidated at the worst possible moment, which converts a paper loss into a real one.',
    why: 'The main destroyer of long-run returns is being forced to sell during a drawdown. A cash buffer is what makes staying invested possible, so it is not an alternative to investing — it is what makes investing work.',
    misread: 'That this is the boring part to get past. Paying off a card at twenty per cent is a guaranteed return no equity allocation can promise. The order of operations is most of the outcome.',
    tell: 'State your monthly surplus and your buffer in months, from your actual statements. Not knowing both is the answer to what to work on first.',
    terms: [
      { term: 'Emergency fund', meaning: 'Cash covering several months of essential spending, held somewhere boring. Its job is optionality, not return.' },
      { term: 'Savings rate', meaning: 'Share of income not spent. Over most horizons it dominates investment returns, and it is the variable you control.' },
      { term: 'Sequence risk', meaning: 'The danger of poor returns arriving early, when your balance is largest relative to future contributions. Why the buffer exists.' }
    ]
  },

  'capital-allocation/theory': {
    idea: 'You should be able to say what you own, what it is a claim on, what it costs you annually, and what would make it fall by half. Most portfolios fail that test, and the failure is usually discovered during a crash.',
    why: 'Costs are the most reliable predictor of long-run net returns because they are certain while returns are not. A one per cent annual fee compounds into a very large share of terminal wealth, and it is the one variable available to you with no forecasting required.',
    misread: 'That understanding markets means predicting them. The useful literacy is structural: what a fund actually holds, how it is taxed, what liquidity it has, and what the fee really is once everything is counted.',
    tell: 'Write down the all-in annual cost of everything you hold, as a percentage. If you cannot find it, that is itself a finding about the product.',
    terms: [
      { term: 'Total expense ratio', meaning: 'Annual cost as a share of assets, including the parts not in the headline fee. Compare products on this, not on performance.' },
      { term: 'Diversification', meaning: 'Holding things that do not fall together. The only free lunch in finance, and easy to lose by accident.' },
      { term: 'Drawdown', meaning: 'Peak-to-trough decline. The number that decides whether you hold on, which makes it more relevant than volatility.' }
    ]
  },

  'capital-allocation/policy': {
    idea: 'Decide your rules when you are calm and follow them when you are not. A written policy — target allocation, contribution schedule, rebalancing rule, what would make you change your mind — is what stops decisions being made by whatever the market did last week.',
    why: 'Investor returns lag fund returns, and the gap is behavioural: people buy after rises and sell after falls. A pre-commitment removes the decision from the moment when your judgement is at its worst, which is exactly the moment it will be tested.',
    misread: 'That a policy is a constraint you will want to escape. It is the opposite — it is the thing that lets you ignore the news, and the freedom it buys is the point.',
    tell: 'Read your policy after a bad month. If you want to change it because of that month, the policy was written for a market that does not exist.',
    terms: [
      { term: 'Investment policy statement', meaning: 'A one-page written record of your objectives, allocation and rules. Boring, and the main defence against yourself.' },
      { term: 'Rebalancing', meaning: 'Selling what rose and buying what fell to return to target weights. Mechanically enforces buying low, which is why it is uncomfortable.' },
      { term: 'Asset allocation', meaning: 'The split between broad asset classes. Explains most of the variation in portfolio outcomes; individual selection explains much less.' }
    ]
  },

  'capital-allocation/analysis': {
    idea: 'Analysing a specific holding means being able to say what it earns, what it owes, what could go wrong, and what you would need to believe for the current price to make sense. That last one is the whole exercise.',
    why: 'A price is a claim about the future. Reverse-engineering what growth and margins are implied tells you whether you are disagreeing with the market and on what basis. Without it you are buying a story and calling it analysis.',
    misread: 'That analysis means building a bigger model. A three-line reverse discounted cash flow that identifies the two assumptions doing the work beats a fifty-tab spreadsheet whose output nobody can trace.',
    tell: 'Write your thesis in three sentences with a number in each, and the specific thing that would prove you wrong. If you cannot state the disconfirming evidence, you have a preference.',
    terms: [
      { term: 'Reverse DCF', meaning: 'Working backwards from today\'s price to the growth it implies. Cheap, honest, and it makes the real question visible.' },
      { term: 'Margin of safety', meaning: 'Buying enough below your estimate of value that being somewhat wrong is survivable. Insurance against your own model.' },
      { term: 'Circle of competence', meaning: 'The set of businesses you can actually assess. Its boundary matters more than its size, and staying inside it is the discipline.' }
    ]
  },

  'capital-allocation/behaviour': {
    idea: 'The main risk to your returns is you. Not fees, not the market, not the wrong fund. Knowing your own patterns — when you check, what makes you want to act, what stories you find persuasive — is the highest-return work available here.',
    why: 'Every intervention that improves investor outcomes works by reducing the number of decisions: automatic contributions, fewer check-ins, written rules. The evidence for this is stronger than the evidence for any allocation strategy.',
    misread: 'That knowing about biases protects you from them. It does not; the research on debiasing is discouraging. What works is structural — automation and pre-commitment — rather than trying harder to be rational.',
    tell: 'Keep a decision log with your reasoning and your emotional state. Read it a year later. It is the only feedback the market gives you that is actually about you.',
    terms: [
      { term: 'Behaviour gap', meaning: 'The measured difference between fund returns and investor returns. Entirely caused by when people buy and sell.' },
      { term: 'Loss aversion', meaning: 'Losses hurting roughly twice as much as equivalent gains please. Explains most panic selling, and knowing it does not stop it.' },
      { term: 'Pre-commitment', meaning: 'Deciding and automating in advance so the decision is not available in the moment. The intervention that actually works.' }
    ]
  }
});
