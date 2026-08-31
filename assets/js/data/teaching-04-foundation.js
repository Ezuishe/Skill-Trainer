/*
 * teaching-04-foundation.js — see teaching-01-communication.js for the schema.
 */

window.PILLAR_TEACHING = Object.assign(window.PILLAR_TEACHING || {}, {

  /* ---------------------------------------------------- LEADERSHIP */

  'leadership/oneonone': {
    idea: 'The one-to-one is the unit of management. Its job is to surface what you would otherwise find out too late, which means the agenda belongs to them and most of your time in it is spent listening rather than updating.',
    why: 'People do not volunteer problems upward without a reliable, low-stakes channel. A weekly slot that is never cancelled becomes that channel; an irregular one becomes a status meeting, and status is already in the tracker.',
    misread: 'That a one-to-one is for project updates. That is the fastest way to make it useless. If the meeting could be replaced by reading a board, it has been wasted.',
    tell: 'After each one, write what you learned that you did not know before. A run of blanks means the meeting has turned into a status report.',
    terms: [
      { term: 'Skip-level', meaning: 'A conversation with someone two levels down. Surfaces what your direct reports filter, deliberately or not.' },
      { term: 'Situation-behaviour-impact', meaning: 'A feedback structure: where it happened, what was done, what followed. Keeps feedback about observable acts rather than character.' },
      { term: 'Psychological safety', meaning: 'The belief that speaking up will not be punished. The best-supported predictor of team performance, and it is built by how you react to bad news.' }
    ]
  },

  'leadership/performance': {
    idea: 'A standard that is not stated is not a standard. Most performance problems are expectation problems: nobody said what good looked like, so the gap only became visible when it was large, and by then the conversation is a shock.',
    why: 'Feedback works when it is specific, timely and about behaviour. Delayed feedback is heard as a verdict rather than as information, and it arrives too late to act on. Frequency is what makes it feel routine instead of threatening.',
    misread: 'That being kind means softening the message. Vague feedback denies someone the chance to fix the thing, which is the least kind option available. Direct about the work, warm about the person.',
    tell: 'Ask someone you manage to state the standard for their role. If their answer differs from yours, you found the problem, and it is yours.',
    terms: [
      { term: 'Expectation setting', meaning: 'Agreeing what good looks like in advance, in writing. The cheapest performance intervention there is.' },
      { term: 'Radical candour', meaning: 'Caring personally while challenging directly. The failure modes on either side are ruinous empathy and obnoxious aggression.' },
      { term: 'Performance improvement plan', meaning: 'A formal, timed process with defined criteria. Should never be the first time someone hears there is a problem.' }
    ]
  },

  'leadership/team': {
    idea: 'Hiring is the highest-leverage decision a manager makes and the one most often made on impressions. A structured process — same questions, defined signals, scored independently before discussion — beats intuition by a wide and well-measured margin.',
    why: 'Unstructured interviews predict performance barely better than chance, because they mostly measure interviewer comfort. Structure works by making candidates comparable and by stopping the first strong impression from colouring everything after it.',
    misread: 'That you should hire for culture fit. In practice that selects for similarity and narrows the team. What you want is agreement on values and difference in background and approach.',
    tell: 'Review your last five hires against what you predicted at offer. Where you were wrong, find which signal misled you. Nobody does this, which is why hiring rarely improves.',
    terms: [
      { term: 'Structured interview', meaning: 'Same questions, same order, defined rubric, scored before discussion. The single largest improvement available to a hiring process.' },
      { term: 'Work sample', meaning: 'A task resembling the actual job. The best-validated predictor of performance available.' },
      { term: 'Anchoring in panels', meaning: 'The first opinion voiced shifting everyone else\'s. Why scores get collected before the debrief.' }
    ]
  },

  'leadership/direction': {
    idea: 'Direction is a small number of things that are true, specific and repeated until people are bored of hearing them. If the team cannot state the priority without checking, there is no direction regardless of what the deck says.',
    why: 'People make dozens of small decisions you never see. Direction works by making those decisions consistent without your involvement, which requires it to be memorable and to say what is not being done. A priority list of nine is a list.',
    misread: 'That communicating direction once, well, is enough. You will be tired of the message long before the organisation has heard it. That gap is where most strategies quietly die.',
    tell: 'Ask three people what the top priority is. Three different answers means you have a document rather than a direction.',
    terms: [
      { term: 'Strategy', meaning: 'A diagnosis, a guiding approach, and coherent actions. Not a set of goals — goals are what you want, strategy is how.' },
      { term: 'Explicit non-goals', meaning: 'What you are deliberately not doing this period. Makes a priority real, since anything can be a priority if nothing is dropped.' },
      { term: 'Commander\'s intent', meaning: 'Stating the purpose so people can improvise correctly when the plan meets reality.' }
    ]
  },

  'leadership/self': {
    idea: 'Managing yourself is a leadership skill because your state propagates. How you react to bad news sets whether you get told about it early. That single behaviour does more to shape a team than any process you introduce.',
    why: 'Information flows toward people who are safe to tell. One visibly bad reaction is remembered for months and quietly reduces what reaches you afterwards, which means the cost is paid in problems you find out about too late.',
    misread: 'That this means never showing frustration. Suppression reads as inauthentic and does not fool anyone. What matters is where the frustration is aimed: at the situation, and not at the person who told you.',
    tell: 'Ask a report to describe how you took the last piece of bad news. Their answer is more accurate than your memory of it.',
    terms: [
      { term: 'Amplification', meaning: 'The way a manager\'s casual remark lands with the weight of a decision. The main reason offhand comments cause weeks of rework.' },
      { term: 'Calibration', meaning: 'Checking your view of your own behaviour against how others experience it. Requires asking, because nobody volunteers it upward.' },
      { term: 'Load shedding', meaning: 'Explicitly dropping work when capacity falls, rather than letting quality degrade silently across everything.' }
    ]
  },

  /* -------------------------------------------- STRATEGIC JUDGMENT */

  'strategic-judgment/framing': {
    idea: 'Most bad decisions are answers to the wrong question. Framing is the discipline of stating the decision precisely, listing the real options, and noticing when the option set has been quietly narrowed to two.',
    why: 'The frame determines the answer more than the analysis does. "Should we do X?" gets a yes or no; "What is the best use of these resources?" gets a comparison. The second question is harder and is the one worth asking.',
    misread: 'That more analysis compensates for a poor frame. It does not — it produces a more confident answer to the wrong question, which is worse than an uncertain answer to the right one.',
    tell: 'Write the decision as a question, then write two more versions of it. If the versions imply different options, your first framing was doing hidden work.',
    terms: [
      { term: 'Whether-or-not decision', meaning: 'A choice presented as a single yes/no. Outcomes are measurably worse than when more options are generated first.' },
      { term: 'Opportunity cost', meaning: 'The value of the best thing you did not do. Invisible unless the frame includes alternatives.' },
      { term: 'Problem statement', meaning: 'One sentence naming what is wrong, for whom, and how you would know it was fixed.' }
    ]
  },

  'strategic-judgment/evidence': {
    idea: 'Start from what usually happens to things like this, then adjust for what is specific. People do the reverse — build a story from the details and never check it against the base rate — which is why forecasts are systematically overconfident.',
    why: 'The inside view generates plausible narratives, and plausibility is uncorrelated with likelihood. The outside view uses a reference class of similar cases, which contains information no amount of thinking about your case can produce.',
    misread: 'That forecasting is about being clever. It is mostly about being calibrated: making probabilistic statements, recording them, scoring them, and updating in small increments rather than in dramatic reversals.',
    tell: 'Keep a prediction log with dates and probabilities. When your 90 per cent predictions come true 65 per cent of the time, that is the finding, and no argument reaches it.',
    terms: [
      { term: 'Base rate', meaning: 'How often this outcome occurs in comparable cases. The starting point that gets skipped.' },
      { term: 'Calibration', meaning: 'Whether your confidence matches your accuracy. Improvable with feedback, and almost nobody gets the feedback.' },
      { term: 'Brier score', meaning: 'A scoring rule for probabilistic forecasts. Rewards being right and being appropriately uncertain.' }
    ]
  },

  'strategic-judgment/strategy': {
    idea: 'Strategy is choosing what not to do. A diagnosis of the actual constraint, an approach that addresses it, and a set of coherent actions. If it does not exclude anything, it is a statement of ambition.',
    why: 'Advantage comes from doing different things or the same things differently, and both require declining options that look attractive. Organisations that never decline anything spread resources evenly and are beaten by anyone concentrated.',
    misread: 'That strategy means goals and targets. "Grow 30 per cent" is a target. The strategy is the argument for why growth will happen and what you are giving up to make it happen.',
    tell: 'Read your strategy and list what it rules out. An empty list means you have a plan to try hard.',
    terms: [
      { term: 'Kernel', meaning: 'Rumelt\'s three parts: diagnosis, guiding policy, coherent action. A useful test — most strategy documents are missing the diagnosis.' },
      { term: 'Competitive advantage', meaning: 'A reason customers choose you that competitors cannot easily copy. Sustainable only if the reason is structural.' },
      { term: 'Bad strategy', meaning: 'Fluff, unwillingness to choose, goals mistaken for strategy. Recognisable and extremely common.' }
    ]
  },

  'strategic-judgment/risk': {
    idea: 'What matters is not how likely you are to be wrong but what happens when you are. Decisions with survivable downsides and large upsides can be taken with poor odds; decisions with ruinous downsides should be declined at almost any odds.',
    why: 'Compounding requires survival. A strategy with a positive expected value and a small chance of ruin goes to zero given enough repetitions, because ruin is absorbing. This is why the shape of the payoff matters more than its average.',
    misread: 'That risk means volatility. Volatility is fluctuation you can sit through; risk is the permanent loss of something you needed. Confusing them leads to avoiding the first and walking into the second.',
    tell: 'For any significant decision, write the worst realistic case and ask whether you can continue afterwards. If not, size it down until you can.',
    terms: [
      { term: 'Asymmetry', meaning: 'A payoff where the upside is much larger than the downside. Worth taking repeatedly even at low hit rates.' },
      { term: 'Ruin', meaning: 'An outcome you cannot recover from. Its probability must be treated separately, not folded into an average.' },
      { term: 'Reversibility', meaning: 'Whether a decision can be undone. Reversible ones should be made fast; irreversible ones deserve the meeting.' }
    ]
  },

  'strategic-judgment/execution': {
    idea: 'A decision is not made until something is different: a date, an owner, a resource moved. Everything before that is discussion, and organisations are full of decisions everyone remembers making and nobody acted on.',
    why: 'Most decisions are reversible and cheap, so the cost of deliberating exceeds the cost of being wrong. Sorting decisions by reversibility and moving fast on the reversible ones is where most of the speed available to an organisation is.',
    misread: 'That commitment means never revisiting. Commitment means acting fully while stating in advance what evidence would change your mind. Without that condition, revisiting is drift and not revisiting is stubbornness.',
    tell: 'A week after a decision, check what actually changed. If the answer is nothing, it was a conversation.',
    terms: [
      { term: 'One-way door', meaning: 'An irreversible decision. Bezos\'s distinction: these deserve deliberation, the rest deserve speed.' },
      { term: 'Disagree and commit', meaning: 'Backing a decision fully after losing the argument. What stops disagreement becoming quiet sabotage.' },
      { term: 'Decision record', meaning: 'A written note of what was decided, why, and what would change it. Makes later reversals honest rather than embarrassing.' }
    ]
  },

  /* ----------------------------------------------- LEARNING VELOCITY */

  'learning-velocity/deconstruct': {
    idea: 'Skills are not monolithic. Taking one apart into sub-skills, finding which ones actually carry the outcome, and training those directly is the difference between improving in months and improving in years.',
    why: 'Practice time spread evenly across a skill mostly maintains what you can already do. Targeting the specific sub-skill that is limiting you concentrates the effort where it changes the outcome, which is what makes deliberate practice deliberate.',
    misread: 'That deconstruction means making a syllabus. A list of topics is not a decomposition. What you want is the smallest set of components that predicts performance, which you find by watching where things actually break.',
    tell: 'Name the one sub-skill that, if fixed, would most improve your output. If you cannot, you have not taken the skill apart.',
    terms: [
      { term: 'Sub-skill', meaning: 'A trainable component that can be practised and measured on its own.' },
      { term: 'Rate limiter', meaning: 'The component currently capping your performance. Everything else is maintenance until it moves.' },
      { term: 'Transfer', meaning: 'Whether improving a sub-skill improves the whole. Not automatic, which is why isolated drills need checking against real performance.' }
    ]
  },

  'learning-velocity/practice': {
    idea: 'Practice that improves you is at the edge of what you can do, aimed at something specific, and followed by feedback. Practice missing any of the three maintains rather than builds, however many hours it takes.',
    why: 'Improvement requires errors — errors are the signal that adjustment is needed. Practising what you already do well produces no errors and no adjustment, which is why comfortable practice feels productive and changes nothing.',
    misread: 'That harder always means better. Past roughly a third failure rate, the feedback becomes noise and motivation collapses. The band is real: hard enough to fail sometimes, not so hard that failure is uninformative.',
    tell: 'Track your success rate. Consistently above about 85 per cent means it is too easy; consistently below 50 means too hard. Both are wasted sessions.',
    terms: [
      { term: 'Deliberate practice', meaning: 'Effortful, targeted at a specific weakness, with immediate feedback. Ericsson\'s term, and routinely misapplied to mean "practising a lot".' },
      { term: 'Desirable difficulty', meaning: 'Conditions that slow learning now and improve retention later. Spacing and interleaving are the main examples.' },
      { term: 'Interleaving', meaning: 'Mixing problem types rather than blocking them. Feels worse during, tests better after.' }
    ]
  },

  'learning-velocity/retention': {
    idea: 'Getting something out of memory is what makes it stick. Rereading produces the feeling of knowing without the ability to retrieve, which is why people are so often surprised by how little they remember from things they read carefully.',
    why: 'Each successful retrieval strengthens the memory more than another exposure does, and spacing the retrievals out strengthens it further. The effect is large, replicated, and almost universally ignored in favour of rereading and highlighting.',
    misread: 'That testing is for assessment. Testing is a learning method, and the strongest one available. Being asked a question you fail is more useful than reading the answer again.',
    tell: 'Close the book and write what you remember. The gap between what you produce and what is there is the actual state of your knowledge.',
    terms: [
      { term: 'Retrieval practice', meaning: 'Recalling from memory rather than re-reading. The single best-supported study technique.' },
      { term: 'Spaced repetition', meaning: 'Reviewing at increasing intervals, timed to just before you would forget.' },
      { term: 'Fluency illusion', meaning: 'Mistaking ease of reading for knowing. Why highlighting feels productive and is not.' }
    ]
  },

  'learning-velocity/transfer': {
    idea: 'Knowledge that has never been used on a real problem tends not to be available when a real problem arrives. Application is not the reward at the end of learning, it is a part of the learning, and it belongs from the first week.',
    why: 'Memory is retrieved by cues. Knowledge learned only in the context of study is cued by study, so it does not surface at work. Practising in the context of use is what makes it available there.',
    misread: 'That you should learn the fundamentals thoroughly before applying anything. In practice, applying early tells you which fundamentals matter, and that ordering is faster and more motivating.',
    tell: 'For anything you learned this month, name where you used it on a real problem. Blanks mean it is unlikely to be there when you need it.',
    terms: [
      { term: 'Near and far transfer', meaning: 'Applying to a similar situation versus a distant one. Near transfer is reliable; far transfer is rare and often overclaimed.' },
      { term: 'Context-dependent memory', meaning: 'Recall being better in the setting where learning happened. An argument for practising in the setting you need it.' },
      { term: 'Worked example effect', meaning: 'Beginners learn faster from studied examples than from unaided problem-solving; the advantage reverses with expertise.' }
    ]
  },

  'learning-velocity/metacognition': {
    idea: 'Running your own learning means noticing which methods are actually working for you and dropping the ones that are not. Most people never check, and keep using the method that feels best rather than the one that works.',
    why: 'Judgements of learning are poorly correlated with actual learning, and the correlation is negative for some methods. So self-assessment has to be based on measured performance rather than on how well a session felt.',
    misread: 'That metacognition means reflecting more. Reflection without measurement recycles impressions. What is needed is a record: what you tried, what changed, and by how much.',
    tell: 'Look back over a month. Can you name one method you dropped because the evidence said it was not working? If not, you are not running the system, it is running you.',
    terms: [
      { term: 'Judgement of learning', meaning: 'Your prediction of how much you will remember. Reliably overconfident, especially after rereading.' },
      { term: 'Learning log', meaning: 'A record of methods and results. Makes what worked visible over months, which no memory does.' },
      { term: 'Plateau', meaning: 'A stretch with no measurable improvement. Signals that a variable needs changing, not that more of the same is required.' }
    ]
  },

  /* ------------------------------------------- PERFORMANCE SYSTEMS */

  'performance-systems/sleep': {
    idea: 'Sleep is where the previous day\'s practice gets consolidated. Cutting it to make room for more practice trades the mechanism for the appearance of effort, which is a bad trade at any hour count.',
    why: 'Motor and declarative consolidation both happen during sleep, and restriction measurably degrades attention, mood and learning. The degradation accumulates and, notably, self-assessment of it does not — people rate themselves as adjusted while performing worse.',
    misread: 'That you can adapt to less. Genuine short sleepers are rare enough to be irrelevant. What people adapt to is the feeling of being impaired, not the impairment.',
    tell: 'Track sleep and next-day performance for two weeks and look at them together. The relationship is usually obvious in your own data and unconvincing in the abstract.',
    terms: [
      { term: 'Sleep debt', meaning: 'Accumulated shortfall against your requirement. Repays slowly and does not clear in one weekend.' },
      { term: 'Sleep consolidation', meaning: 'The overnight process that stabilises what you practised. Why a session before sleep is not the same as one after a night awake.' },
      { term: 'Circadian anchor', meaning: 'A fixed wake time and morning light. The most reliable lever on sleep timing, and it works on the wake end rather than the bedtime end.' }
    ]
  },

  'performance-systems/training': {
    idea: 'Physical capacity is the substrate everything else runs on. Two or three sessions a week of progressive resistance work and some aerobic base is a small time cost with a large and well-evidenced effect on energy and mood.',
    why: 'Progressive overload works because tissue adapts to demands slightly beyond current capacity. The same principle as skill practice, with the same requirement: increase something over time, or you are maintaining.',
    misread: 'That you need an optimal programme. Adherence dominates programme design by a wide margin. A mediocre plan done for a year beats an optimal one abandoned in March.',
    tell: 'Look at your log from eight weeks ago. If nothing has increased — load, reps, distance, pace — you have been exercising rather than training.',
    terms: [
      { term: 'Progressive overload', meaning: 'Gradually increasing demand so adaptation continues. Without it, training becomes maintenance.' },
      { term: 'Zone 2', meaning: 'Sustained easy aerobic work where you could hold a conversation. Builds base capacity, and most people do it too hard.' },
      { term: 'Minimum effective dose', meaning: 'The least that produces the adaptation. Usually far less than assumed, which is why "no time" is rarely the real obstacle.' }
    ]
  },

  'performance-systems/attention': {
    idea: 'Sustained, undistracted attention is the input to every skill on this site, and it is trainable. Most of the training is environmental: removing the interruptions rather than resisting them.',
    why: 'Switching tasks leaves residue — part of your attention stays with the previous task for some minutes. Frequent switching means never reaching full capacity on anything, and the cost is invisible because you never see the version of the work that did not get interrupted.',
    misread: 'That focus is willpower. Willpower is a poor and depleting mechanism. People with good attention mostly have environments where distraction is expensive: notifications off, phone elsewhere, a defended block in the calendar.',
    tell: 'Count interruptions in one work block. That number, not your intentions, is what determines the quality of the block.',
    terms: [
      { term: 'Attention residue', meaning: 'The part of your focus still on the last task after switching. Why five-minute interruptions cost far more than five minutes.' },
      { term: 'Deep work', meaning: 'Cognitively demanding work done without distraction. Newport\'s term for the thing most jobs make structurally difficult.' },
      { term: 'Environment design', meaning: 'Changing the surroundings so the default is focus. More reliable than intention, every time.' }
    ]
  },

  'performance-systems/consistency': {
    idea: 'Habits are made by repetition in a stable context, not by motivation. The reliable levers are making the cue obvious, the action small, and the setting the same — and having a written rule for what happens after you miss.',
    why: 'Behaviours become automatic when the same context repeatedly precedes them. That is why "after coffee, at this desk" works and "when I feel like it" does not: the second has no cue for the association to attach to.',
    misread: 'That consistency requires discipline. Discipline is what you spend when the system fails. A well-designed cue costs nothing, which is the point.',
    tell: 'Look at your last three misses. Same day, same cause? Then it is a design problem, and no amount of resolve fixes a design problem.',
    terms: [
      { term: 'Implementation intention', meaning: 'A written "when X, I will do Y at Z". One of the most reliably effective interventions in behavioural research.' },
      { term: 'Habit stacking', meaning: 'Attaching a new behaviour to an existing reliable one, borrowing its cue.' },
      { term: 'Never miss twice', meaning: 'A rule that treats one miss as noise and two as the start of a trend. Removes the all-or-nothing collapse.' }
    ]
  },

  'performance-systems/stress': {
    idea: 'Load only becomes capacity when it is followed by recovery. Continuous load without it produces the appearance of effort and a slow decline, and the decline is usually noticed by other people first.',
    why: 'Adaptation happens during recovery, not during stress. This is true of muscle, of attention and of motivation. Planning lighter periods before you need them is how you avoid the pattern where a hard year ends in quitting entirely.',
    misread: 'That burnout is caused by hours. It correlates better with lack of control, unclear expectations and effort that produces no visible result. Long hours on work you control and can see land are far more survivable.',
    tell: 'Score energy weekly on the same scale. A four-week downward trend is a signal to act on, and it is only visible if you were writing it down.',
    terms: [
      { term: 'Deload', meaning: 'A planned lighter period taken before performance drops. Cheaper than the unplanned version.' },
      { term: 'Allostatic load', meaning: 'The cumulative cost of prolonged stress responses. Explains why the effects show up long after the stressful period.' },
      { term: 'Recovery debt', meaning: 'Shortfall in real rest. Accumulates quietly and gets paid eventually, usually at a bad time.' }
    ]
  }
});
