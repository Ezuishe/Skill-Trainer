/*
 * setup.js — what to do before week 1.
 *
 * "I do not know what to do" often means "I do not know how to start". Each
 * discipline gets: the tools you need, where the honest feedback will come
 * from, and a baseline you measure now so progress is visible later.
 */

window.DISCIPLINE_SETUP = {
  'persuasive-writing': {
    tools: ['Somewhere to publish: a newsletter, a blog, or an internal wiki', 'A plain text editor', 'A folder for drafts, one file per piece'],
    arena: 'Pick one now: a mailing list however small, a team that reads your documents, or one editor who will mark up your work.',
    baseline: [
      'Take 500 words you wrote in the last month.',
      'Count: sentences over 35 words, abstract nouns, hedges, and words total.',
      'Read it aloud and count the stumbles.',
      'Write those five numbers with today\'s date. You will re-measure at the last gate.'
    ],
    firstWeek: 'Publish something small in week one, even badly. The habit of shipping is harder to build than the writing.'
  },

  'speaking-presence': {
    tools: ['A phone with a camera and something to prop it up', 'A folder for recordings, named by date', 'Access to any audience: a team meeting, a meetup, a family dinner'],
    arena: 'Book one speaking slot in the next fortnight before you start. A meetup lightning talk, a team demo, a volunteer presentation.',
    baseline: [
      'Set the phone at eye height, two metres away.',
      'Talk for three minutes on a project you know, with no preparation.',
      'Count fillers per minute, times you looked away, and your longest pause.',
      'Save the file. Watching this back at the end is the most convincing evidence you will get.'
    ],
    firstWeek: 'The first week is unpleasant because you have to watch yourself. It is also the fastest week of the whole plan.'
  },

  'negotiation': {
    tools: ['A prep sheet template, one page', 'A deal log: date, opening, target, outcome, what moved it'],
    arena: 'Find something live to practise on within two weeks: a vendor renewal, a salary review, a rate conversation, a rent negotiation.',
    baseline: [
      'Write down your last three negotiations: what you asked for and what you got.',
      'For each, write the sentence where you first moved.',
      'Write whether you had a real alternative at the time.',
      'This is your baseline. Most people find they had none, three times out of three.'
    ],
    firstWeek: 'You will not be negotiating in week one. You will be preparing, which is where most of the value is.'
  },

  'sales': {
    tools: ['Something to sell, defined in one sentence', 'A list of at least fifty qualified contacts', 'Call recording, with permission', 'One place to log every contact and outcome'],
    arena: 'A real number you have to hit, or a freelance offer you have to fill. Without one of those, this stays theoretical.',
    baseline: [
      'Record your next call and measure your share of the talking.',
      'Count your qualified conversations in the last four weeks.',
      'Write your close rate, or write that you do not know it.',
      'Those three numbers are your starting point.'
    ],
    firstWeek: 'Week one is offer and list. Do not start outreach with a message you have not tested on five people.'
  },

  'product-distribution': {
    tools: ['A way to take money, even a payment link', 'Analytics on whatever you ship', 'A spreadsheet for interviews: name, date, what they actually do now'],
    arena: 'Paying customers. Until money changes hands you are guessing, and friends will lie to you politely.',
    baseline: [
      'Write in one paragraph who has this problem, how often, and what it costs them.',
      'Write what they do about it today.',
      'Write how many of those two things you actually know versus assume.',
      'The ratio of known to assumed is your real starting point.'
    ],
    firstWeek: 'Twenty interviews before you build anything. Yes, twenty. The temptation to skip this is exactly why most products fail.'
  },

  'software-engineering': {
    tools: ['One language and one stack, fixed for the whole plan', 'A git repository', 'A free hosting account you can deploy to', 'Somewhere to write session logs'],
    arena: 'Users who complain when it breaks, plus one engineer better than you who will review your code weekly.',
    baseline: [
      'Build something small from an empty file and time yourself.',
      'Note how often you had to look something up.',
      'Deploy something, anything, and time that too.',
      'Write both numbers down. Deployment time in particular will collapse.'
    ],
    firstWeek: 'Deploy on day one, before there are any features. It removes the fear and everything after is easier.'
  },

  'applied-ai': {
    tools: ['Access to a frontier model, ideally the API', 'A folder of saved specifications you reuse', 'A file of real failures, which becomes your evaluation set'],
    arena: 'Your own recurring work first, then colleagues who will complain immediately when it is wrong.',
    baseline: [
      'Log one week of recurring tasks: what, how long, how often.',
      'Multiply out to annual hours and sort.',
      'Pick a task in a domain you can grade and run it ten times; score the outputs.',
      'You now have a target list and a quality baseline.'
    ],
    firstWeek: 'Do not build anything in week one. Measure where your time goes, because most people automate the wrong thing.'
  },

  'capital-allocation': {
    tools: ['Access to every account in one place', 'A spreadsheet you build yourself', 'A decision journal file'],
    arena: 'Real money at a size where a mistake teaches you something without doing lasting damage, plus one person who will attack a thesis rather than admire it.',
    baseline: [
      'Compute your savings rate for the last three months.',
      'Add every fee you pay into one annual percentage.',
      'Write your net worth on one page.',
      'Write what you would do if markets fell 40% tomorrow. Keep it to compare with what you actually do.'
    ],
    firstWeek: 'Nothing gets invested in week one. The buffer and the policy come first, in that order.'
  },

  'leadership': {
    tools: ['A private note per person you manage', 'A decision log', 'A recurring weekly slot for your own review'],
    arena: 'A real team with real consequences, structured upward feedback, and one manager two levels above you who will be honest.',
    baseline: [
      'Ask each person what the team\'s three priorities are and write down exactly what they say.',
      'Categorise last month\'s calendar against your stated priorities.',
      'Write your regretted attrition for the last year.',
      'The spread in the first answer is usually the finding.'
    ],
    firstWeek: 'Start by asking rather than announcing. You will get a more honest answer in week one than in week six.'
  },

  'strategic-judgment': {
    tools: ['A forecast file: prediction, probability, resolution date', 'A decision memo template', 'A calendar for review dates'],
    arena: 'Decisions you actually own, plus somebody who argues with you rather than agreeing.',
    baseline: [
      'Write twenty predictions with explicit probabilities, resolving within three months.',
      'List every decision you have had open for more than two weeks.',
      'Write your three most recent significant decisions and whether the reasoning was sound at the time.',
      'The open-decision list is usually longer than people expect.'
    ],
    firstWeek: 'Write the predictions in week one. Without them there is nothing to calibrate against later.'
  },

  'learning-velocity': {
    tools: ['A real skill you need now, chosen before you start', 'A session log', 'A retrieval system: cards, a file, anything you will actually reopen'],
    arena: 'A real project with a deadline, and someone better than you who will assess the work.',
    baseline: [
      'Write what you can currently do in the target skill, honestly.',
      'Time how long you can concentrate on it before switching.',
      'Test yourself on something you learned a month ago, closed book.',
      'Those three numbers tell you where the constraint is.'
    ],
    firstWeek: 'This one is trained on live material. Pick the skill before day one or the whole plan stays abstract.'
  },

  'performance-systems': {
    tools: ['A paper calendar on the wall', 'A sleep and session log', 'A timer', 'Somewhere to put your phone that is not your desk'],
    arena: 'A training partner or anyone who notices when you do not turn up, plus a benchmark you retest.',
    baseline: [
      'Log one week of sleep, wake times, and how you felt at 10am.',
      'Measure how long you can concentrate before switching, five times.',
      'Do two simple physical tests and write the numbers.',
      'Change nothing during the baseline week. Measure first.'
    ],
    firstWeek: 'Week one is measurement only. Fixing things before you know your own numbers is guessing.'
  },

  'design-communication': {
    tools: ['Any design tool you already have', 'A spacing scale written where you can see it: 4, 8, 16, 24, 48', 'A folder of annotated references', 'A place to publish work'],
    arena: 'Real users or clients, plus one peer who will critique weekly in technical language rather than encouragement.',
    baseline: [
      'Take something you made recently.',
      'Count your colours, measure five gaps, and check whether they are on a scale.',
      'Do the squint test and write what you see first, second and third.',
      'Keep the file. The side-by-side at the end is what makes the progress obvious.'
    ],
    firstWeek: 'Work in black and white for the first fortnight. Colour hides weak hierarchy and you need to see yours.'
  }
};
