/*
 * teaching-01-communication.js
 *
 * The teaching layer, keyed by "disciplineId/pillarId". A schedule tells you
 * what to do. This tells you what you are supposed to be learning while you do
 * it, which is the part that decides whether the hours turn into skill.
 *
 *   idea     the one thing that makes this pillar work, stated plainly
 *   why      the mechanism: why it works, not just that it does
 *   misread  the wrong version people arrive with, and why it fails
 *   tell     how to check your own work without asking anyone
 *   terms    the vocabulary of the field, so the reading stops being fog
 *
 * Written to be read in ninety seconds before a session and understood
 * without a teacher in the room.
 */

window.PILLAR_TEACHING = Object.assign(window.PILLAR_TEACHING || {}, {

  /* ------------------------------------------------------- WRITING */

  'persuasive-writing/clarity': {
    idea: 'A sentence is hard to read when the reader has to hold something in mind before it resolves. Almost every clarity problem is that one thing: a subject separated from its verb, an action buried in a noun, a negative wrapped around a negative. Fix the distance and you fix the sentence.',
    why: 'Reading uses working memory, and working memory is small. When the subject arrives on word three and the verb on word nineteen, everything between them is held in a buffer that was not built for it. The reader does not consciously notice; they just feel that the writing is heavy and stop.',
    misread: 'People hear "be clear" and translate it as "write short sentences". Length is not the variable. A thirty-word sentence with the subject and verb next to each other reads faster than a twelve-word one that opens with a subordinate clause.',
    tell: 'Read your paragraph aloud and mark every place you had to take a breath in an unnatural spot. Those are the sentences to rebuild, and there is no ambiguity about where they are.',
    terms: [
      { term: 'Nominalisation', meaning: 'An action turned into a noun: "make a decision" instead of "decide", "the implementation of" instead of "we built". It hides who does what, which is why bureaucracies love it.' },
      { term: 'Subject-verb distance', meaning: 'The number of words between the thing acting and the acting. Under about six, prose feels light; past twelve it feels like wading.' },
      { term: 'Given-new', meaning: 'Start a sentence with information the reader already has and end with what is new. It is why "Because of this, X happened" reads better than "X happened because of this" in a chain of argument.' }
    ]
  },

  'persuasive-writing/structure': {
    idea: 'A document is an argument with a shape. The shape is: here is the situation, here is what changed, here is the question that raises, here is my answer, and here is why the answer holds. If a reader cannot say what the question was, no amount of evidence will land.',
    why: 'Readers build a mental model as they go and file each new fact into it. Give them the answer first and every subsequent fact has somewhere to go. Give them the answer last and they carry a pile of unsorted facts and give up around the third page.',
    misread: 'The academic habit: build carefully to a conclusion so the reader arrives at it with you. That works when the reader is obliged to finish. In work, nobody is obliged to finish, and burying the answer reads as either hedging or not having one.',
    tell: 'Delete everything except your headings and read what is left. If the headings alone do not carry the argument, the structure is decoration rather than structure.',
    terms: [
      { term: 'SCQA', meaning: 'Situation, Complication, Question, Answer. Barbara Minto\'s opening frame: state the stable world, the thing that disturbed it, the question that forces, and your answer to it.' },
      { term: 'MECE', meaning: 'Mutually exclusive, collectively exhaustive. Your supporting points should not overlap and should not leave a gap. Overlap wastes the reader; gaps are where the objection lives.' },
      { term: 'Governing thought', meaning: 'The single sentence the whole document is arguing for. If you cannot write it on one line, you are not ready to write the document.' }
    ]
  },

  'persuasive-writing/audience': {
    idea: 'You are not writing to an audience, you are writing to one person mid-thought. What they already believe, what they are afraid of, and what they will have to do next decide every choice you make. Everything else is style.',
    why: 'Persuasion is the reduction of resistance, not the addition of enthusiasm. A reader has a specific objection sitting in their head, and until you name it, everything you write is being read through it. Naming it costs you two sentences and buys you their attention back.',
    misread: '"Know your audience" gets treated as demographics. Age and job title tell you almost nothing. What tells you something is the sentence they would say if they disagreed with you out loud, which you can only get by actually asking people.',
    tell: 'Write the strongest one-line objection to your piece at the top of the draft. If your piece does not answer it by the halfway point, you wrote for yourself.',
    terms: [
      { term: 'Awareness stage', meaning: 'How much the reader already knows: unaware of the problem, aware of the problem, aware of solutions, aware of yours. Each one needs a different opening; the classic error is writing stage-four copy for stage-one readers.' },
      { term: 'Steelman', meaning: 'The strongest honest version of the position you are arguing against. Attacking a weak version tells informed readers you have not understood the debate.' },
      { term: 'Concrete-first', meaning: 'Leading with the specific example and generalising afterwards. Abstractions are only decodable by people who already agree.' }
    ]
  },

  'persuasive-writing/longform': {
    idea: 'Long pieces fail structurally, not sentence by sentence. The reader gets lost because the piece stopped telling them where they are. Control over long form is mostly control over transitions and the promise you made in the first two paragraphs.',
    why: 'Attention over ten pages is a series of small decisions to continue. Each section break is a place a reader can leave. A transition that restates what was just settled and names what comes next converts that exit into a reason to stay.',
    misread: 'That long form means more research. Usually the opposite: the piece is long because the writer has not decided what it is about, so everything survives the draft. Cutting a third almost always improves it.',
    tell: 'Write a one-line summary of each section in the margin. Read only those lines in order. If it does not read as a coherent argument, the reader is lost too, and no paragraph-level editing will save it.',
    terms: [
      { term: 'Throughline', meaning: 'The single question the whole piece is answering, restated often enough that a reader who put it down yesterday can pick it up today.' },
      { term: 'Scene and summary', meaning: 'Scene is slow, specific, one moment. Summary is fast and covers ground. Long pieces alternate; pieces that use only one of the two are either exhausting or weightless.' },
      { term: 'The turn', meaning: 'The point where the piece stops describing and starts arguing. Readers can feel it missing even when they cannot name it.' }
    ]
  },

  'persuasive-writing/voice': {
    idea: 'Voice is not personality applied to a subject. It is the accumulation of consistent choices: what you refuse to say, what you always define, how much you concede. It emerges from volume and editing, which is why it cannot be adopted in a weekend.',
    why: 'Readers build trust from prediction. When your fifth piece confirms what your second implied, they start reading as an ally rather than a sceptic. That is what a body of work does that individual pieces cannot, and it is why publishing on a schedule beats publishing when inspired.',
    misread: 'That voice means being provocative. Provocation is a fast way to be noticed and a fast way to be ignored later. The durable version is being consistently useful about a narrow thing.',
    tell: 'Give three of your pieces to someone who does not know which are yours, mixed with three by someone else in your field. If they cannot sort them, you do not have a voice yet.',
    terms: [
      { term: 'Body of work', meaning: 'Pieces that reference and build on each other, so the tenth is worth more than the first because the first exists.' },
      { term: 'Register', meaning: 'How formal, how technical, how close to the reader. Consistency of register does more for voice than vocabulary does.' },
      { term: 'Compounding audience', meaning: 'Readers who arrived for one piece and stayed. The only audience metric that predicts anything.' }
    ]
  },

  /* ------------------------------------------------------ SPEAKING */

  'speaking-presence/mechanics': {
    idea: 'Delivery is physical before it is anything else. Pace, breath, where your weight sits, whether you finish sentences with your voice going down. These are trainable in a way that "confidence" is not, and fixing them changes how you are heard more than any content change.',
    why: 'Listeners read competence off signals that have nothing to do with what you are saying: whether you fill pauses, whether your pitch rises at the end of statements, whether you move without purpose. These fire before the content is processed, and they set the frame it lands in.',
    misread: 'That nerves are the problem and calm is the solution. The physiological state of nerves and of excitement is nearly identical. What separates a good speaker is not less arousal, it is that their mechanics hold under it, which comes from rehearsing under load rather than from relaxing.',
    tell: 'Record five minutes and count filler words per minute, then count how many sentences ended on a rising pitch. Both numbers should fall week to week. Impressions of how it felt are useless; the counts are not.',
    terms: [
      { term: 'Uptalk', meaning: 'Ending a statement on a rising pitch so it sounds like a question. Reads as asking permission, which undermines everything above it.' },
      { term: 'Filled pause', meaning: '"Um", "so", "like" — the sound of thinking out loud. A silent pause does the same work and reads as authority instead of hesitancy.' },
      { term: 'Diaphragmatic support', meaning: 'Breathing low so the voice sits in the chest rather than the throat. It is what stops a voice thinning out under pressure.' }
    ]
  },

  'speaking-presence/talkdesign': {
    idea: 'A talk is not a document read aloud. The listener cannot re-read, cannot skim, and cannot see your structure unless you say it. So a talk carries roughly one idea per ten minutes, signposted out loud, with everything else in service of it.',
    why: 'Listening is linear and lossy. A reader who misses a sentence goes back; a listener who misses one loses the thread and spends the next minute recovering rather than following. Redundancy that would be intolerable on the page is what makes a talk followable.',
    misread: 'That more slides mean more value. Slides compete with you for the same attention channel. Every slide with a paragraph on it is a slide where the audience is reading instead of listening.',
    tell: 'Ask someone the day after what your talk was about. If they give you a topic rather than a claim, the talk had no spine.',
    terms: [
      { term: 'Throughline', meaning: 'The single claim the talk exists to land, stated in the first two minutes and returned to at every section break.' },
      { term: 'Signposting', meaning: 'Saying out loud where you are: "That was the problem. Here is what we tried." The spoken equivalent of headings.' },
      { term: 'Assertion-evidence', meaning: 'A slide whose title is a full-sentence claim and whose body is one image or chart supporting it. Beats bullet points in comprehension studies and in practice.' }
    ]
  },

  'speaking-presence/pressure': {
    idea: 'Questions are where credibility is actually decided. The room has heard your prepared material and discounted it; what they weigh is how you handle the thing you did not prepare. The skill is a repeatable sequence, not quick wits.',
    why: 'Under pressure, working memory drops and people start talking to fill silence. A fixed sequence — acknowledge, restate, answer the strongest version, stop — replaces improvisation with a procedure that survives the drop.',
    misread: 'That you should have an answer for everything. "I do not know, here is how I would find out, I will come back to you by Thursday" reads as far stronger than an improvised answer that is later found to be wrong.',
    tell: 'Record a Q&A and count how many of your answers ran past forty seconds. Long answers are almost always the sound of someone talking their way toward a point they had not found yet.',
    terms: [
      { term: 'Bridging', meaning: 'Answering the question asked, then moving to the point you needed to make. Skipping the first half is what makes politicians unbearable.' },
      { term: 'The hostile restate', meaning: 'Repeating a hostile question in neutral language before answering. It buys time, checks understanding, and removes the sting without dodging.' },
      { term: 'Parking', meaning: 'Explicitly deferring a question with a named time and owner, rather than absorbing the room into a tangent.' }
    ]
  },

  'speaking-presence/narrative': {
    idea: 'A story works because it makes the listener predict. Someone wants something, something is in the way, and the listener starts guessing what happens. That guessing is the attention. Facts arranged without that structure are a list, and lists are forgettable by design.',
    why: 'Memory is organised around causes and consequences. A sequence of events with causal links between them is stored as one chunk; the same events without links are stored as many. That is why an anecdote survives a meeting and a statistic does not.',
    misread: 'That storytelling means being emotional or personal. The mechanism is structural. A two-sentence story about a customer with a specific problem does the work; a moving preamble about your childhood usually does not.',
    tell: 'Strip your story to: who wanted what, what stopped them, what happened. If any of the three is missing, you have an anecdote rather than a story, and it will not carry a point.',
    terms: [
      { term: 'Complication', meaning: 'The obstacle that makes the story worth telling. No obstacle, no story — just a report of things going fine.' },
      { term: 'Specificity', meaning: 'Named people, real numbers, actual dates. Generic stories are heard as illustration; specific ones are heard as evidence.' },
      { term: 'The turn', meaning: 'The moment the situation changes direction. Land it in one sentence, not three.' }
    ]
  },

  'speaking-presence/presence': {
    idea: 'Presence in a senior room is mostly about compression and timing. Say the thing in one sentence, say it at the point where a decision is actually being made, and be willing to stop. People with presence are not talking more, they are talking at the right moment.',
    why: 'Senior rooms are attention-poor and decision-focused. Long contributions are read as not knowing what matters. A short, well-timed one carries an implicit claim — that you can tell signal from noise — which is exactly what seniority is being judged on.',
    misread: 'That presence is projected: posture, gravitas, a lower voice. Those help at the margin. What actually reads as presence is being the person who names the real question when everyone else is discussing its symptoms.',
    tell: 'After a meeting, write the one sentence you contributed that changed what happened. If there is not one most weeks, you were attending rather than present.',
    terms: [
      { term: 'The room\'s real question', meaning: 'What is actually being decided, as opposed to what is on the agenda. Naming it is the highest-leverage thing anyone says in most meetings.' },
      { term: 'Costly signal', meaning: 'Saying the inconvenient true thing. It is credible precisely because it is costly, which is why agreement is cheap and disagreement is expensive.' },
      { term: 'Airtime discipline', meaning: 'Speaking in proportion to what you actually add. Over-speaking discounts everything you say, including the good parts.' }
    ]
  },

  /* -------------------------------------------------------- DESIGN */

  'design-communication/fundamentals': {
    idea: 'Almost all amateur design problems are spacing problems. Things that belong together are not close enough, things that do not belong together are too close, and there are eleven different gaps where there should be three. Fix spacing and typography and most of the "it looks unprofessional" feeling goes.',
    why: 'The eye groups by proximity before it reads anything. A layout with inconsistent gaps is asking the viewer to re-derive the grouping at every element, which registers as unease rather than as a specific complaint. That is why people say "it looks off" and cannot say why.',
    misread: 'That good design is about choosing nice colours and fonts. Colour is the last decision and the least important one. A layout with one typeface, black text and disciplined spacing beats a colourful one with sloppy alignment every time.',
    tell: 'Squint at your layout until the text blurs. You should see a small number of clean blocks with even gaps. If you see a speckled field, the spacing is doing nothing.',
    terms: [
      { term: 'Spacing scale', meaning: 'A fixed set of gaps (say 4, 8, 16, 32, 64) used everywhere instead of arbitrary values. The single highest-return rule in visual design.' },
      { term: 'Optical alignment', meaning: 'Aligning by what looks aligned rather than by the bounding box. Round shapes and punctuation need to overshoot slightly to look level.' },
      { term: 'Measure', meaning: 'Line length, counted in characters. Around 45 to 75 is comfortable; much longer and the eye loses its place returning to the next line.' }
    ]
  },

  'design-communication/interface': {
    idea: 'An interface is a set of answers to "what can I do here, and what just happened?" Every state you did not design — empty, loading, error, too much data — is a state a user will find, and those are where products feel broken.',
    why: 'Users build a model of what the system will do and act on it. Interfaces feel good when the model holds and bad when it breaks, which is why an obvious feature that behaves predictably beats a clever one that surprises. Consistency is not a style preference, it is what makes the model learnable.',
    misread: 'That the work is the happy path in a polished mockup. The happy path is maybe a fifth of the work. What separates a real product from a portfolio piece is that the other four fifths exist.',
    tell: 'List every state of the screen you just designed. If the list has fewer than four entries, you have not designed the screen, you have illustrated it.',
    terms: [
      { term: 'Affordance', meaning: 'A visible property that suggests what an element does. A button that looks pressable has one; a div with a click handler does not.' },
      { term: 'Empty state', meaning: 'What the screen shows before there is any data. Usually the first thing a new user sees and usually the last thing designed.' },
      { term: 'Progressive disclosure', meaning: 'Showing the common case and hiding the rest behind an explicit action. The alternative is an interface that is complete and unusable.' }
    ]
  },

  'design-communication/brand': {
    idea: 'A brand is a set of constraints that stays fixed long enough to become recognisable. The value is in the repetition, not the invention. A mediocre system applied consistently for two years beats a brilliant one that changes every quarter.',
    why: 'Recognition is built by repeated exposure to the same cues. Every deviation resets some of that. That is why brand guidelines exist and why the constraint feels arbitrary from inside and obvious from outside.',
    misread: 'That a brand is a logo. The logo is the least load-bearing part. Colour, typography, spacing, tone and photography do the recognising; most people cannot draw the logo of brands they recognise instantly.',
    tell: 'Cover the logo on three of your pieces and show them to someone. If they cannot tell they are from the same place, the system is not doing its job.',
    terms: [
      { term: 'Design system', meaning: 'The reusable decisions — colours, type scale, spacing, components — written down so they survive the person who made them.' },
      { term: 'Token', meaning: 'A named value (`--accent`, `space-4`) used instead of a literal. Changing the value changes everything that uses it, which is what makes a system a system.' },
      { term: 'Tone of voice', meaning: 'The verbal half of the identity. Usually neglected, and usually the half that gives an inconsistent brand away.' }
    ]
  },

  'design-communication/information': {
    idea: 'A chart has one job: make a specific comparison easy. Before choosing a form, finish the sentence "this chart shows that ___". If you cannot, you are decorating data rather than communicating it.',
    why: 'The eye compares position along a common scale far more accurately than it compares angle, area or colour intensity. That is a measured perceptual ranking, and it is why bar and dot charts beat pie charts and bubble charts for nearly every comparison.',
    misread: 'That more data shown is more informative. A chart with everything on it forces the reader to do the analysis you were supposed to do. Choosing what to leave out is most of the craft.',
    tell: 'Show your chart to someone for five seconds, then take it away and ask what it said. If they describe the shape rather than the point, the point was not encoded.',
    terms: [
      { term: 'Data-ink ratio', meaning: 'Tufte\'s measure: the share of the ink that encodes actual data. Gridlines, shadows and 3D effects lower it and give nothing back.' },
      { term: 'Small multiples', meaning: 'The same chart repeated across categories at the same scale. Almost always beats one chart with eight overlapping series.' },
      { term: 'Baseline truncation', meaning: 'Starting a bar chart\'s axis above zero. It exaggerates differences and is the most common way a chart lies without stating anything false.' }
    ]
  },

  'design-communication/taste': {
    idea: 'Taste is trained by looking closely at good work and naming why it works, in words specific enough to reuse. Vague admiration builds nothing. "The gap above the heading is twice the gap below it, so the heading belongs to the text under it" builds something.',
    why: 'You cannot apply what you cannot articulate. Recognition and production are different capacities, and the bridge between them is verbal: naming a technique is what lets you reach for it later, under time pressure, on your own work.',
    misread: 'That taste is innate and either you have an eye or you do not. Every professional you admire spent years doing deliberate copying and critique. The appearance of innate taste is what a lot of accumulated specific vocabulary looks like from outside.',
    tell: 'Try to recreate a piece you admire from memory, then compare. The gaps between yours and theirs are precisely the things you were not really seeing.',
    terms: [
      { term: 'Deliberate copy', meaning: 'Rebuilding someone else\'s work exactly, to find the decisions you would not have made. A training exercise, not a portfolio piece.' },
      { term: 'Critique format', meaning: 'Describe, then interpret, then judge. Jumping straight to judgement is why most feedback is useless.' },
      { term: 'Reference library', meaning: 'A saved, annotated collection of work with notes on what specifically is good in each. Unannotated inspiration folders do nothing.' }
    ]
  }
});
