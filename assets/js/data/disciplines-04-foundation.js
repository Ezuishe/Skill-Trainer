/* People, judgement, and the foundations everything else runs on. */

window.DISCIPLINES = (window.DISCIPLINES || []).concat([

  /* ------------------------------------------------------------- LEADERSHIP */
  {
    id: 'leadership',
    name: 'Leading a Team',
    discipline: 'People',
    tagline: 'Get more done through other people than you could alone.',
    thesis:
      'There is a hard limit on what one person can produce, and management is the only way past it. It is ' +
      'also the most common place careers stall, because the things that made someone an excellent ' +
      'individual contributor are mostly not the things the job now requires. Almost nobody gets trained ' +
      'for it before they are doing it.',
    hours: { functional: 60, competent: 250, professional: 900, elite: 3000 },
    proofs: {
      functional: 'You run useful one-to-ones and give feedback that changes what people do.',
      competent: 'Your team hits its commitments and the people you want to keep stay.',
      professional: 'You build teams, hire well, and set direction other people execute.',
      elite: 'You develop other leaders and run an organisation through change.'
    },
    entryCheck: ['You are responsible for at least one other person\'s work, formally or otherwise'],
    pillars: [
      {
        id: 'oneonone',
        name: 'Managing Individuals',
        weight: 0.22,
        specialization: 'One-to-ones and feedback',
        objective: 'Make each person better for having worked with you.',
        competencies: [
          'One-to-ones that surface problems rather than status',
          'Feedback that is specific, quick, and actually delivered',
          'Understanding what each person is actually optimising for',
          'Knowing when to coach and when to just tell them'
        ],
        stages: [
          {
            name: 'Their agenda',
            work: 'Hand over the one-to-one and get comfortable with the silence while they think.',
            check: 'Four consecutive one-to-ones run on their agenda.'
          },
          {
            name: 'Fast feedback',
            work: 'Deliver feedback within two days of the thing happening, twice a week.',
            check: 'Eight pieces of specific feedback delivered inside 48 hours.'
          },
          {
            name: 'Motivation',
            work: 'Find out what each person actually wants and check whether you are right.',
            check: 'Each person\'s driver written down and confirmed by them.'
          }
        ],
        drills: [
          {
            name: 'Their agenda, not yours',
            dose: 'every one-to-one',
            protocol: 'They own the agenda. You ask questions and take notes. Move status to writing, so this time can be spent on the things that do not fit in a status update.',
            mistake: 'Filling the silence when they pause. The useful thing usually comes after the pause.'
          },
          {
            name: 'Within 48 hours',
            dose: '2 a week',
            protocol: 'Deliver two pieces of specific feedback a week, each within two days of the behaviour. Feedback delivered a month later is decoration; nobody can act on it.',
            mistake: 'Saving it for a review, by which point it is both stale and a surprise.'
          },
          {
            name: 'What do they want',
            dose: 'per person',
            protocol: 'Write down what you think each person is optimising for: growth, security, autonomy, recognition, money, time. Then ask them directly and see how wrong you were.',
            mistake: 'Assuming they want what you wanted at their stage.'
          },
          {
            name: 'Ask before advising',
            dose: 'every problem raised',
            protocol: 'When someone brings a problem, ask what they think before saying what you think. Two questions minimum. Half the time they already have the answer and needed to hear it out loud.',
            mistake: 'Solving it immediately, which is faster today and slower every day after.'
          }
        ],
        standard: 'People bring you problems while they are still small.',
        milestone: {
          name: 'Trust gate',
          criteria: [
            'Team members raise problems before you find them yourself',
            'A piece of your feedback visibly changed someone\'s behaviour',
            'Each person can state their own growth priority'
          ]
        }
      },
      {
        id: 'performance',
        name: 'Standards',
        weight: 0.22,
        specialization: 'Performance management',
        objective: 'Hold a bar without being either cruel or evasive.',
        competencies: [
          'Writing down what good actually looks like',
          'Handling underperformance early, which is the humane version',
          'Recognition specific enough to be instructional',
          'Managing someone out when that is the right call'
        ],
        stages: [
          {
            name: 'Define',
            work: 'Write the bar for each role before judging anyone against it.',
            check: 'Written expectations for every role you manage.'
          },
          {
            name: 'Say it early',
            work: 'Raise problems within a week of noticing rather than at review time.',
            check: 'One underperformance conversation held early.'
          },
          {
            name: 'No surprises',
            work: 'Make formal reviews contain nothing the person has not already heard.',
            check: 'A review cycle with no surprises in it.'
          }
        ],
        drills: [
          {
            name: 'Write the bar',
            dose: 'per role',
            protocol: 'Document what excellent, adequate and not acceptable look like for each role, in observable terms. Most performance problems turn out to be undocumented expectation problems.',
            mistake: 'Writing values instead of behaviours. "Takes ownership" cannot be assessed; "raises risks before they land" can.'
          },
          {
            name: 'The hard conversation',
            dose: 'as needed, never delayed',
            protocol: 'Script your first two sentences. Have the conversation within a week of noticing. Follow it with a written summary the same day so you both remember it the same way.',
            mistake: 'Softening it so much that they leave the room thinking it went well.'
          },
          {
            name: 'Specific praise',
            dose: '3 a week',
            protocol: 'Praise the behaviour and its effect, not the person\'s character. "The way you flagged that dependency on Monday saved us a week" teaches something. "You are great" does not.',
            mistake: 'Praising everything, which makes praise worthless as a signal.'
          },
          {
            name: 'Write the review early',
            dose: 'mid-cycle',
            protocol: 'Draft each person\'s review halfway through the cycle and tell them what it currently says. It gives them a chance to change the outcome, which is the point.',
            mistake: 'Writing it the night before, from memory, which mostly captures the last three weeks.'
          }
        ],
        standard: 'Nobody is ever surprised by their review.',
        milestone: {
          name: 'Standards gate',
          criteria: [
            'Written expectations for every role you manage',
            'One underperformance conversation handled early and directly',
            'No surprises in any formal review'
          ]
        }
      },
      {
        id: 'team',
        name: 'Hiring and Team Design',
        weight: 0.2,
        specialization: 'Hiring',
        objective: 'Build the team instead of inheriting the result.',
        competencies: [
          'Defining the role by what it must produce',
          'Structured interviews and evidence rather than impressions',
          'Onboarding that produces real contribution in a month',
          'Composition: who depends on whom, and who is carrying too much'
        ],
        stages: [
          {
            name: 'Define first',
            work: 'Write the outcomes before writing the advert.',
            check: 'A scorecard written before a role was posted.'
          },
          {
            name: 'Interview consistently',
            work: 'Same questions, same order, scored independently before anyone discusses.',
            check: 'Three hires run through a structured process.'
          },
          {
            name: 'Land them',
            work: 'Plan the first thirty days before day one.',
            check: 'A new person contributing inside 30 days.'
          }
        ],
        drills: [
          {
            name: 'Scorecard first',
            dose: 'per hire',
            protocol: 'Write what this person must have produced in twelve months, before writing the job advert. Then write the advert from that, and interview against it.',
            mistake: 'Copying the last advert for a similar title, which imports someone else\'s thinking about a different team.'
          },
          {
            name: 'Same questions, scored alone',
            dose: 'per hire',
            protocol: 'Every candidate gets the same questions in the same order. Interviewers score independently and write it down before the group discusses. Discussion first anchors everyone to whoever speaks first.',
            mistake: 'Unstructured interviews, which mostly measure how similar the candidate is to the interviewer.'
          },
          {
            name: 'Thirty-day plan',
            dose: 'per hire',
            protocol: 'Before day one, write what they will have shipped in thirty days, who they will have met, and what they will know. Give it to them on day one.',
            mistake: 'Planning the first week and leaving the rest to sort itself out.'
          },
          {
            name: 'Reference the specifics',
            dose: 'per hire',
            protocol: 'Ask referees what the person was like on a bad week, and what they needed from their manager. Generic reference questions get generic answers.',
            mistake: 'Skipping references because you liked the interview.'
          }
        ],
        standard: 'Your last three hires are people you would hire again.',
        milestone: {
          name: 'Hiring gate',
          criteria: [
            'Three hires made against written scorecards',
            'Structured interviews scored independently before discussion',
            'A new hire contributing meaningfully inside 30 days'
          ]
        }
      },
      {
        id: 'direction',
        name: 'Direction',
        weight: 0.2,
        specialization: 'Setting direction',
        objective: 'Make sure the effort is pointing the same way.',
        competencies: [
          'Turning strategy into a small number of team priorities',
          'Goals with real trade-offs rather than a wish list',
          'A cadence: planning, review, retrospective',
          'Sharing enough context that people can decide without you'
        ],
        stages: [
          {
            name: 'Choose',
            work: 'Name the three things that matter and publish what you are not doing.',
            check: 'A published priority list and a not-doing list.'
          },
          {
            name: 'Broadcast',
            work: 'Share the context you have that they do not, every week.',
            check: 'Eight weeks of written context updates.'
          },
          {
            name: 'Delegate the decision',
            work: 'Give away decisions and see whether the context was sufficient.',
            check: 'A decision made correctly in your absence.'
          }
        ],
        drills: [
          {
            name: 'Three and a not-doing list',
            dose: 'quarterly',
            protocol: 'Name the three things that matter this quarter and, in the same document, the things you are explicitly not doing. The second list is what makes the first one credible.',
            mistake: 'Listing seven priorities, which tells the team you have not decided.'
          },
          {
            name: 'Context broadcast',
            dose: 'weekly',
            protocol: 'Write what you know that the team does not: constraints, reasons, what changed upstream. Most alignment failures are context failures wearing a different hat.',
            mistake: 'Sharing conclusions without the reasoning, which means nobody can extend it to a new situation.'
          },
          {
            name: 'Decision log',
            dose: 'per decision',
            protocol: 'Record the decision, the reasoning, and what you rejected. It teaches the team how to decide and saves you relitigating it in four months.',
            mistake: 'Logging what was decided but not why, which is the only part that transfers.'
          },
          {
            name: 'Ask them to decide',
            dose: 'weekly',
            protocol: 'Hand one real decision a week to the team with the context and the constraints, and let them make it. Review the reasoning, not the outcome.',
            mistake: 'Overruling the first time they decide differently to you, which ends the experiment permanently.'
          }
        ],
        standard: 'People make good decisions when you are on holiday.',
        milestone: {
          name: 'Alignment gate',
          criteria: [
            'Everyone can state the quarter\'s three priorities',
            'A decision made correctly in your absence, from published context',
            'A published not-doing list'
          ]
        }
      },
      {
        id: 'self',
        name: 'Managing Yourself',
        weight: 0.16,
        specialization: 'Leadership habits',
        objective: 'Be the steady point other people calibrate against.',
        competencies: [
          'Staying level when the organisation is not',
          'Delegating authority rather than just the work',
          'Spending your time on what you said matters',
          'Asking for feedback upward and acting on it'
        ],
        stages: [
          {
            name: 'Audit',
            work: 'Compare where your time goes against what you say your priorities are.',
            check: 'One month of calendar categorised.'
          },
          {
            name: 'Hand over',
            work: 'Give away one responsibility a week, including the authority.',
            check: 'Three responsibilities fully transferred.'
          },
          {
            name: 'Ask',
            work: 'Get feedback from the people who report to you and act on one piece visibly.',
            check: 'You stopped doing something because they asked.'
          }
        ],
        drills: [
          {
            name: 'Calendar audit',
            dose: 'monthly',
            protocol: 'Categorise last month\'s hours against your stated priorities. The gap between the two is your actual strategy, whatever the document says.',
            mistake: 'Auditing a good week rather than a normal one.'
          },
          {
            name: 'Delegate the decision too',
            dose: 'weekly',
            protocol: 'Hand over one thing fully: the outcome, the authority, and the right to do it differently from how you would. Then leave it alone.',
            mistake: 'Delegating the work and keeping the decision, which is just adding a step.'
          },
          {
            name: 'What should I stop',
            dose: 'quarterly',
            protocol: 'Ask each person for one thing you should stop doing. Then visibly stop one of them and say that you are doing it because they asked.',
            mistake: 'Asking and doing nothing, which guarantees you never get an honest answer again.'
          },
          {
            name: 'The pause before reacting',
            dose: 'daily',
            protocol: 'When something lands badly, wait an hour before responding in writing. Your team reads your temperature far more closely than you think.',
            mistake: 'Replying immediately to bad news, which teaches people to bring it to you later.'
          }
        ],
        standard: 'The team is calmer because you are in the room.',
        milestone: {
          name: 'Self-management gate',
          criteria: [
            'Your calendar broadly matches your stated priorities',
            'Three responsibilities fully delegated and still running',
            'You visibly acted on upward feedback'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Regretted attrition', method: 'People you wanted to keep who left.' },
      { name: 'Commitments hit', method: 'What the team said it would deliver, against what it delivered.' },
      { name: 'Feedback delivered', method: 'Specific instances per week.' },
      { name: 'What survives two weeks away', method: 'The honest test of everything above.' }
    ],
    failureModes: [
      { name: 'Still being the best individual contributor', fix: 'Measure output through others, not your own commits or decks.' },
      { name: 'Avoiding hard conversations', fix: 'A 48-hour rule, a scripted opener, and a written follow-up.' },
      { name: 'Delegating work but not authority', fix: 'Give away the decision, or accept that you have not delegated.' },
      { name: 'Managing by meeting', fix: 'Status goes in writing. Meetings are for decisions and for people.' }
    ],
    arena: [
      'A real team with real consequences',
      'Structured upward feedback, ideally anonymous',
      'A peer group of managers who discuss actual cases',
      'A mentor two levels above you'
    ],
    library: [
      { title: 'High Output Management', author: 'Andrew Grove', note: 'Still the most useful management book anyone has written.' },
      { title: 'The Making of a Manager', author: 'Julie Zhuo', note: 'Honest about the first year, which most books are not.' },
      { title: 'Radical Candor', author: 'Kim Scott', note: 'Care personally and challenge directly. Ignore the merchandise.' },
      { title: 'Who', author: 'Geoff Smart and Randy Street', note: 'Structured hiring that beats intuition.' }
    ]
  },

  /* --------------------------------------------------------------- JUDGMENT */
  {
    id: 'strategic-judgment',
    name: 'Judgement and Strategy',
    discipline: 'Judgment',
    tagline: 'Get the handful of decisions right that determine the rest.',
    thesis:
      'Most of the variance in how a life or a business turns out sits in a small number of decisions: ' +
      'what to work on, who with, and what to say no to. Judgement is trainable, mainly through writing ' +
      'predictions down and scoring yourself honestly, which is uncomfortable enough that very few people ' +
      'ever do it.',
    hours: { functional: 40, competent: 180, professional: 600, elite: 2500 },
    proofs: {
      functional: 'You can structure a hard decision and defend it in writing.',
      competent: 'Your forecasts are calibrated and your decisions hold up under scrutiny.',
      professional: 'You are trusted with consequential decisions under real ambiguity.',
      elite: 'You have a record of non-obvious calls that turned out right.'
    },
    entryCheck: ['You own some decisions', 'You are willing to be scored wrong in your own handwriting'],
    pillars: [
      {
        id: 'framing',
        name: 'Framing',
        weight: 0.22,
        specialization: 'Problem framing',
        objective: 'Solve the right problem before solving it well.',
        competencies: [
          'Separating the decision from how it turned out',
          'Finding options beyond the two you were offered',
          'Identifying what is actually constraining you',
          'Taking a problem apart to its basic parts'
        ],
        stages: [
          {
            name: 'Widen',
            work: 'Generate more options on real decisions you already face.',
            check: 'Ten decisions documented with more than two options.'
          },
          {
            name: 'Find the constraint',
            work: 'Work out what would have to change for the problem to disappear.',
            check: 'You can name the binding constraint on your current work.'
          },
          {
            name: 'Reframe',
            work: 'State problems several ways and see how the answer moves.',
            check: 'One decision materially improved by a reframe.'
          }
        ],
        drills: [
          {
            name: 'Widen the options',
            dose: 'every decision',
            protocol: 'For every either/or, generate three more options, including doing nothing and doing it later at lower cost. Write them down even when they are obviously worse.',
            mistake: 'Generating three variations of the option you already preferred.'
          },
          {
            name: 'Name the constraint',
            dose: 'per problem',
            protocol: 'Write what would have to change for this problem to stop existing. That is usually the real target, and it is often not what you were about to work on.',
            mistake: 'Naming a symptom. "Not enough time" is nearly always a prioritisation constraint wearing a disguise.'
          },
          {
            name: 'Three framings',
            dose: '3 per decision',
            protocol: 'State the same problem three different ways. "Should we hire?" becomes "what work do we want to stop doing?" and "what would we do with twice the budget?". The framing usually decides the answer.',
            mistake: 'Accepting the framing you were handed, which contains someone else\'s assumptions.'
          },
          {
            name: 'What would have to be true',
            dose: 'per option',
            protocol: 'For each option, write what would have to be true for it to be the right one. Then work out which of those you can cheaply check.',
            mistake: 'Debating which option is best when you could just test the assumption underneath.'
          }
        ],
        standard: 'You routinely find an option nobody in the room had named.',
        milestone: {
          name: 'Framing gate',
          criteria: [
            'Ten decisions documented with more than two options considered',
            'One decision materially improved by reframing it',
            'You can name the binding constraint on your current work'
          ]
        }
      },
      {
        id: 'evidence',
        name: 'Evidence and Base Rates',
        weight: 0.22,
        specialization: 'Forecasting',
        objective: 'Reason from what usually happens rather than what comes to mind.',
        competencies: [
          'Asking what happened the last hundred times',
          'Updating when evidence arrives, by a sensible amount',
          'Telling strong evidence from vivid evidence',
          'Putting numbers on uncertainty instead of hedging in words'
        ],
        stages: [
          {
            name: 'Numbers',
            work: 'Replace vague words with explicit probabilities in your own notes.',
            check: 'Twenty forecasts with percentages attached.'
          },
          {
            name: 'Reference classes',
            work: 'Find the outside view before forming the inside one.',
            check: 'Ten forecasts anchored on a base rate.'
          },
          {
            name: 'Score',
            work: 'Check yourself and find out where you are overconfident.',
            check: 'Fifty forecasts scored, with a calibration curve.'
          }
        ],
        drills: [
          {
            name: 'Numbers not words',
            dose: 'daily',
            protocol: 'Replace "probably" and "unlikely" with explicit percentages in your notes and messages. It feels pedantic for a fortnight and then it changes how you argue.',
            mistake: 'Using round numbers as a way of not committing. 50% often means "I have not thought about it".'
          },
          {
            name: 'Reference class first',
            dose: 'per forecast',
            protocol: 'Before predicting, ask what happened the last hundred times something like this was attempted. Then adjust for what is genuinely different here, which is usually less than you think.',
            mistake: 'Starting from the specifics of your case, which is exactly how projects end up late.'
          },
          {
            name: 'Update log',
            dose: 'weekly',
            protocol: 'Record one belief that changed this week and the specific evidence that moved it. A belief that never updates is not really a belief.',
            mistake: 'Recording only the big reversals, when most calibration comes from small adjustments.'
          },
          {
            name: 'Score yourself',
            dose: 'quarterly',
            protocol: 'Group your forecasts by confidence band and check how often you were right in each. Most people find their 90% band comes in around 70%.',
            mistake: 'Only scoring the predictions you remember, which are the ones you got right.'
          }
        ],
        standard: 'When you say 80%, it happens about eight times in ten.',
        milestone: {
          name: 'Calibration gate',
          criteria: [
            'Fifty forecasts with explicit probabilities, scored',
            'Calibration within 10% at each confidence band',
            'A documented belief change with the evidence that caused it'
          ]
        }
      },
      {
        id: 'strategy',
        name: 'Strategy',
        weight: 0.22,
        specialization: 'Competitive strategy',
        objective: 'Choose where to compete and what to refuse.',
        competencies: [
          'Diagnosis, then a guiding policy, then coherent action',
          'Finding an advantage that is actually asymmetric',
          'Thinking past the first-order consequence',
          'Saying no, which is most of the work'
        ],
        stages: [
          {
            name: 'Diagnose',
            work: 'Write the diagnosis before any goals. Most strategies fail right here.',
            check: 'A written diagnosis of the actual obstacle.'
          },
          {
            name: 'Policy',
            work: 'Turn the diagnosis into one guiding policy and three actions.',
            check: 'A strategy kernel on one page.'
          },
          {
            name: 'Refuse',
            work: 'Decline something good, on the record, for a stated reason.',
            check: 'One real opportunity declined strategically.'
          }
        ],
        drills: [
          {
            name: 'Strategy kernel',
            dose: '1 a month',
            protocol: 'One paragraph of diagnosis, one sentence of guiding policy, three actions that follow. If the diagnosis paragraph is vague, everything after it will be too.',
            mistake: 'Writing goals and calling them a strategy. "Grow 40%" is an aspiration, not a plan.'
          },
          {
            name: 'And then what',
            dose: 'per decision',
            protocol: 'Ask "and then what happens?" three times. Most bad decisions look fine at the first order and reveal themselves at the second.',
            mistake: 'Stopping at the first order because the first order is the part that is easy to model.'
          },
          {
            name: 'Not-doing list',
            dose: 'monthly',
            protocol: 'Write what you are declining this month and what declining it buys you. Publish it where the people affected can see it.',
            mistake: 'Keeping the list private, which means everyone still expects the thing you quietly dropped.'
          },
          {
            name: 'Where are you strong',
            dose: 'quarterly',
            protocol: 'Write down what you can do that a competent competitor cannot easily copy. Be strict. Most listed advantages are not advantages.',
            mistake: 'Listing effort, care or quality, which every competitor also claims.'
          }
        ],
        standard: 'You can explain what you are not doing, and why, without hesitating.',
        milestone: {
          name: 'Strategy gate',
          criteria: [
            'A written strategy with a real diagnosis rather than a goal list',
            'A significant opportunity declined for a stated strategic reason',
            'Second-order analysis that actually changed a decision'
          ]
        }
      },
      {
        id: 'risk',
        name: 'Risk and Asymmetry',
        weight: 0.18,
        specialization: 'Risk',
        objective: 'Avoid the things that end the game and take the bets worth taking.',
        competencies: [
          'Knowing when to maximise expected value and when to prioritise survival',
          'Finding bets with limited downside and open upside',
          'Imagining the failure in advance, in detail',
          'Deciding fast when it is reversible and slowly when it is not'
        ],
        stages: [
          {
            name: 'Pre-mortem',
            work: 'Imagine the failure before committing.',
            check: 'Pre-mortems on your last three significant decisions.'
          },
          {
            name: 'Sort',
            work: 'Separate reversible from irreversible and change your speed accordingly.',
            check: 'A week of decisions sorted and handled at different speeds.'
          },
          {
            name: 'Take one',
            work: 'Place a deliberate asymmetric bet at a size you can afford.',
            check: 'One asymmetric bet placed on purpose.'
          }
        ],
        drills: [
          {
            name: 'Pre-mortem',
            dose: 'per major decision',
            protocol: 'Assume it is a year later and this failed badly. Write the story of how, in detail, as if it happened. Then remove the top two causes. This finds more than a risk register does.',
            mistake: 'Listing risks rather than telling the story. The narrative surfaces things a list does not.'
          },
          {
            name: 'Reversible or not',
            dose: 'weekly',
            protocol: 'Sort your open decisions into reversible and irreversible. Make the reversible ones today, quickly. Slow down for the others and get more information.',
            mistake: 'Treating everything as irreversible, which is how organisations become slow without becoming careful.'
          },
          {
            name: 'Find the asymmetry',
            dose: 'monthly',
            protocol: 'Find one bet where the downside is bounded and known, and the upside is not. Take a small version of it. Most careers are made of three or four of these.',
            mistake: 'Confusing an unlimited downside for an unlikely one.'
          },
          {
            name: 'What ends the game',
            dose: 'quarterly',
            protocol: 'List everything that could take you out permanently: financial, legal, reputational, health. Bound each one, even at some cost to expected return.',
            mistake: 'Optimising expected value across situations where one bad outcome removes you from future ones.'
          }
        ],
        standard: 'Nothing you are exposed to could permanently take you out.',
        milestone: {
          name: 'Risk gate',
          criteria: [
            'Pre-mortems on your last three significant decisions',
            'No exposure that could end the game',
            'One asymmetric bet placed deliberately'
          ]
        }
      },
      {
        id: 'execution',
        name: 'Deciding and Committing',
        weight: 0.16,
        specialization: 'Making the call',
        objective: 'Turn analysis into a decision, on a date.',
        competencies: [
          'Putting deadlines on decisions',
          'Deciding at about 70% of the information you would like',
          'Communicating a decision so people can act on it',
          'Reviewing decisions on the reasoning rather than the result'
        ],
        stages: [
          {
            name: 'Deadline',
            work: 'Put a date on every open decision.',
            check: 'No decision open past its date.'
          },
          {
            name: 'Write it',
            work: 'One page per significant decision, with a review date.',
            check: 'Ten decision memos.'
          },
          {
            name: 'Review process',
            work: 'Judge past decisions on what was knowable at the time.',
            check: 'One quarterly review done on process, not outcome.'
          }
        ],
        drills: [
          {
            name: 'Decision deadline',
            dose: 'per decision',
            protocol: 'Every open decision gets a date. On that date you decide with whatever you have. Waiting has a cost that never appears on any list.',
            mistake: 'Extending the deadline because more information is coming. There is always more information coming.'
          },
          {
            name: 'Decision memo',
            dose: 'per significant call',
            protocol: 'One page: the decision, the reasoning, what you rejected, what would change your mind, and when you will review it. The "what would change my mind" line is the one that does the work.',
            mistake: 'Writing it after the outcome is known, at which point it is a justification.'
          },
          {
            name: 'Process review',
            dose: 'quarterly',
            protocol: 'Review past decisions on whether the reasoning was sound given what you could have known. Good decisions sometimes lose and bad ones sometimes win.',
            mistake: 'Grading yourself on outcomes, which teaches you to be lucky rather than to be right.'
          },
          {
            name: 'Say it once, clearly',
            dose: 'per decision',
            protocol: 'Communicate the decision, the reasoning, and what it means for each person, in writing, once. Then stop relitigating it in corridors.',
            mistake: 'Announcing it in a meeting only, so half the affected people hear it thirdhand.'
          }
        ],
        standard: 'Decisions get made on time and people know why.',
        milestone: {
          name: 'Commitment gate',
          criteria: [
            'No decision open past its deadline',
            'Ten decision memos with review dates',
            'A quarterly review that judged reasoning rather than outcomes'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Calibration', method: 'How often you are right at each stated confidence level.' },
      { name: 'Decision latency', method: 'Days from recognising a decision to making it.' },
      { name: 'Reversals', method: 'Decisions undone within 90 days.' },
      { name: 'Declined opportunities', method: 'Deliberate strategic noes per quarter.' }
    ],
    failureModes: [
      { name: 'Judging decisions by outcomes', fix: 'Review the reasoning against what was knowable then. Write it down before you know.' },
      { name: 'Analysis paralysis', fix: 'Deadlines on decisions, and a rule that 70% of the information is enough.' },
      { name: 'Never writing it down', fix: 'Unwritten reasoning cannot be reviewed, so it cannot improve.' },
      { name: 'Goals dressed as strategy', fix: 'No strategy without a written diagnosis of the actual obstacle.' }
    ],
    arena: [
      'Public forecasting where you get scored',
      'Decisions with real consequences that you own',
      'Someone who argues with you rather than agreeing',
      'A decision journal you actually reread'
    ],
    library: [
      { title: 'Good Strategy / Bad Strategy', author: 'Richard Rumelt', note: 'Diagnosis, guiding policy, coherent action. The best book on the subject.' },
      { title: 'Superforecasting', author: 'Philip Tetlock and Dan Gardner', note: 'Calibration as something you train rather than have.' },
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', note: 'The bias catalogue. Read it as a checklist, not as gospel.' },
      { title: 'Seeking Wisdom', author: 'Peter Bevelin', note: 'Densely assembled mental models with the sources attached.' }
    ]
  },

  /* --------------------------------------------------------------- LEARNING */
  {
    id: 'learning-velocity',
    name: 'Learning Faster',
    discipline: 'Foundation',
    tagline: 'The skill that shortens every skill after it.',
    thesis:
      'The useful skill set turns over every few years now, so how quickly you can acquire a new competence ' +
      'matters more than any particular one you currently have. Most people never learned how to learn ' +
      'deliberately and are running on habits they picked up at school, which were optimised for passing ' +
      'exams rather than for being able to do things.',
    hours: { functional: 25, competent: 100, professional: 300, elite: 1000 },
    proofs: {
      functional: 'You took a new skill to something useful on a deliberate plan.',
      competent: 'You reliably get to working competence in a new domain in weeks.',
      professional: 'You design training for other people and shorten their curves.',
      elite: 'You build learning systems for organisations.'
    },
    entryCheck: ['A real skill you need now. This one is trained on live material, not in the abstract.'],
    pillars: [
      {
        id: 'deconstruct',
        name: 'Taking a Skill Apart',
        weight: 0.22,
        specialization: 'Skill deconstruction',
        objective: 'Find the part of the skill that carries most of the outcome.',
        competencies: [
          'Breaking a skill into sub-skills and their dependencies',
          'Finding the smallest useful repertoire',
          'Working out what genuinely has to come first',
          'Getting the hidden curriculum out of practitioners'
        ],
        stages: [
          {
            name: 'Map',
            work: 'Draw the skill tree and mark what depends on what.',
            check: 'A written skill tree for your target.'
          },
          {
            name: 'Ask',
            work: 'Interview people who can already do it.',
            check: 'Three practitioner interviews done.'
          },
          {
            name: 'Cut',
            work: 'Identify the twenty per cent that produces most of the visible competence.',
            check: 'The critical few named and defended.'
          }
        ],
        drills: [
          {
            name: 'Skill tree',
            dose: 'per new skill',
            protocol: 'Map the sub-skills and what depends on what. Mark the three that produce most of the visible competence. This takes an hour and saves weeks.',
            mistake: 'Copying a course syllabus, which is ordered for teaching convenience rather than for usefulness.'
          },
          {
            name: 'Ask three practitioners',
            dose: '3 people',
            protocol: 'Ask three competent people what they wish they had trained first and what they wasted time on. The second question gets better answers than the first.',
            mistake: 'Asking people who teach it rather than people who do it. The answers differ more than you would expect.'
          },
          {
            name: 'Compare two syllabuses',
            dose: '2 courses',
            protocol: 'Find two curricula for the same skill. What appears in both is probably core. What appears in one is probably optional or someone\'s hobby horse.',
            mistake: 'Trusting a single source, which encodes one person\'s idiosyncrasies as the field.'
          },
          {
            name: 'What can I skip',
            dose: 'per skill',
            protocol: 'Write down what you are deliberately not learning and why. Doing this explicitly stops you feeling vaguely guilty about it for months.',
            mistake: 'Trying to cover everything, which is how a three-month plan becomes a two-year plan.'
          }
        ],
        standard: 'You can explain what matters in a skill before you can do it.',
        milestone: {
          name: 'Map gate',
          criteria: [
            'A written skill tree with dependencies for your target skill',
            'Three practitioner interviews completed',
            'The critical few identified and defended in writing'
          ]
        }
      },
      {
        id: 'practice',
        name: 'Designing Practice',
        weight: 0.24,
        specialization: 'Practice design',
        objective: 'Practise at the edge instead of in the comfortable middle.',
        competencies: [
          'Building a drill that isolates one weakness',
          'Setting difficulty so you fail usefully often',
          'Spacing and mixing rather than blocking',
          'Getting feedback quickly enough to matter'
        ],
        stages: [
          {
            name: 'Isolate',
            work: 'Name one weakness a week and build something that only hits that.',
            check: 'Three custom drills built for your own weaknesses.'
          },
          {
            name: 'Calibrate',
            work: 'Tune difficulty until you are succeeding somewhere between half and most of the time.',
            check: 'Success rate held in the 50–85% band.'
          },
          {
            name: 'Shorten the loop',
            work: 'Find the fastest available signal of quality and move it earlier.',
            check: 'Feedback inside 24 hours.'
          }
        ],
        drills: [
          {
            name: 'Name the weakness',
            dose: 'weekly',
            protocol: 'Write your single biggest weakness this week and build a drill that hits only that. General practice mostly reinforces what you can already do.',
            mistake: 'Naming something too broad to drill. "Bad at writing" is not a weakness you can practise; "openings are weak" is.'
          },
          {
            name: 'Check the failure rate',
            dose: 'every session',
            protocol: 'If you are succeeding more than 85% of the time, make it harder. Below 50%, make it easier. Comfortable practice feels productive and mostly is not.',
            mistake: 'Staying at the easy level because the session feels better. The feeling is the warning sign.'
          },
          {
            name: 'Shorten the feedback loop',
            dose: 'per skill',
            protocol: 'Find the fastest signal of quality available and move it earlier. Learning rate roughly tracks feedback speed, so a day is much better than a fortnight.',
            mistake: 'Waiting for expert feedback when a rough signal today would do.'
          },
          {
            name: 'Mix it up',
            dose: 'weekly',
            protocol: 'Interleave different sub-skills within a session rather than blocking one for an hour. It feels worse during the session and works better afterwards.',
            mistake: 'Judging a practice method by how good the session felt.'
          }
        ],
        standard: 'You fail often enough in practice that improvement is visible weekly.',
        milestone: {
          name: 'Practice gate',
          criteria: [
            'Three custom drills built for your own named weaknesses',
            'Success rate held between 50% and 85%',
            'A feedback loop under 24 hours'
          ]
        }
      },
      {
        id: 'retention',
        name: 'Keeping What You Learn',
        weight: 0.2,
        specialization: 'Retention',
        objective: 'Stop relearning the same things.',
        competencies: [
          'Recall from memory rather than rereading',
          'Spacing repetition for things that are genuinely facts',
          'Explaining things to find the holes',
          'Notes built for retrieval rather than for collection'
        ],
        stages: [
          {
            name: 'Recall',
            work: 'End every session with closed-book recall.',
            check: 'Twenty sessions ending in written recall.'
          },
          {
            name: 'Space it',
            work: 'Schedule retrieval rather than review.',
            check: 'A working retrieval schedule.'
          },
          {
            name: 'Teach',
            work: 'Explain the material to someone who does not know it.',
            check: 'You taught it successfully to one person.'
          }
        ],
        drills: [
          {
            name: 'Closed-book recall',
            dose: 'end of every session',
            protocol: 'Write everything you remember with the material shut. Then open it and check. This one habit outperforms rereading by a wide margin and takes five minutes.',
            mistake: 'Peeking when you get stuck. The struggle is the part that does the work.'
          },
          {
            name: 'Teach it back',
            dose: 'weekly',
            protocol: 'Explain the week\'s material to someone who does not know it, without notes. Confusion on their face marks your gaps precisely.',
            mistake: 'Teaching someone who already knows it, who will fill in your gaps without noticing.'
          },
          {
            name: 'Questions, not summaries',
            dose: '5 per session',
            protocol: 'Turn new material into questions rather than notes. Scheduled retrieval beats scheduled review, and a summary you never reread is just a nice feeling.',
            mistake: 'Writing beautiful notes, which is a satisfying activity and a poor learning method.'
          },
          {
            name: 'Thirty-day check',
            dose: 'monthly',
            protocol: 'Take something you learned a month ago and reconstruct it closed-book. Whatever is gone was never encoded properly and needs a different approach.',
            mistake: 'Assuming that because it felt clear at the time, it stuck.'
          }
        ],
        standard: 'You can still do it a month later without revising.',
        milestone: {
          name: 'Retention gate',
          criteria: [
            'You reconstructed core material closed-book after 30 days',
            'A retrieval schedule you actually follow',
            'You taught the material to someone successfully'
          ]
        }
      },
      {
        id: 'transfer',
        name: 'Using It',
        weight: 0.18,
        specialization: 'Application',
        objective: 'Turn knowing into doing, under real conditions.',
        competencies: [
          'Projects as the way to consolidate',
          'Varying the context so the skill is not tied to one setting',
          'Working where being wrong costs something',
          'Noticing the gap between knowing and being able'
        ],
        stages: [
          {
            name: 'Apply immediately',
            work: 'Use new material on something real within a day.',
            check: 'Twenty sessions each followed by an application.'
          },
          {
            name: 'Vary',
            work: 'Use the skill in a different setting, tool or constraint.',
            check: 'Performed successfully in a new context.'
          },
          {
            name: 'Raise the stakes',
            work: 'Do it once where being wrong actually costs something.',
            check: 'One real-stakes application completed.'
          }
        ],
        drills: [
          {
            name: 'Within 24 hours',
            dose: 'every session',
            protocol: 'Apply new material to a real problem within a day. Unapplied material decays fast, and applying it immediately shows you what you did not actually understand.',
            mistake: 'Batching application for "when I have finished learning", a point which never arrives.'
          },
          {
            name: 'Change the context',
            dose: 'weekly',
            protocol: 'Use the skill in a different setting, with a different tool, or under a different constraint from where you learned it. Skills learned in one context stay stuck there.',
            mistake: 'Practising in the same environment every time, which builds a narrower skill than you think.'
          },
          {
            name: 'Real stakes',
            dose: 'monthly',
            protocol: 'Do it once where being wrong has a real cost: in front of a client, in production, in public. This is where knowledge converts into skill.',
            mistake: 'Staying in practice mode until you feel ready, which delays the conversion indefinitely.'
          },
          {
            name: 'Ship something',
            dose: 'per phase',
            protocol: 'Produce a real deliverable that uses the skill and give it to someone. A project consolidates more than any amount of additional study.',
            mistake: 'Doing exercises rather than making something, which keeps the skill hypothetical.'
          }
        ],
        standard: 'You have used it for real, and it worked.',
        milestone: {
          name: 'Transfer gate',
          criteria: [
            'A real deliverable produced with the new skill',
            'Performed successfully in a context different from where you trained',
            'One real-stakes application completed'
          ]
        }
      },
      {
        id: 'metacognition',
        name: 'Running the Machine',
        weight: 0.16,
        specialization: 'Learning systems',
        objective: 'Manage the person doing the learning.',
        competencies: [
          'Attention management and protected blocks',
          'Sleep and exercise, and their measurable effect on retention',
          'Tracking progress and diagnosing plateaus',
          'Knowing when to push, rest, or change approach'
        ],
        stages: [
          {
            name: 'Log',
            work: 'Three lines after every session. This is the programme correcting itself.',
            check: 'Twenty session logs.'
          },
          {
            name: 'Diagnose',
            work: 'Use the log to spot patterns in your good and bad sessions.',
            check: 'You can predict your own good days.'
          },
          {
            name: 'Break a plateau',
            work: 'Change one variable rather than adding hours.',
            check: 'One plateau broken by a deliberate change.'
          }
        ],
        drills: [
          {
            name: 'Three-line log',
            dose: 'every session',
            protocol: 'What you practised, what was hard, what changes next session. Three lines. This log is the difference between practice and repetition, and it takes ninety seconds.',
            mistake: 'Writing what you covered rather than what was hard, which is the only part that guides the next session.'
          },
          {
            name: 'Plateau protocol',
            dose: 'when stuck two weeks',
            protocol: 'Change exactly one variable: difficulty, feedback source, drill design, or rest. Adding hours to a plateau usually just adds fatigue.',
            mistake: 'Changing everything at once, so you cannot tell what unstuck it.'
          },
          {
            name: 'Protect the sleep',
            dose: 'nightly on training days',
            protocol: 'Guard sleep on days you train hard and note in your log how the next session went. The correlation is usually obvious within a fortnight of your own data.',
            mistake: 'Borrowing from sleep to add practice hours, which reliably costs more than it buys.'
          },
          {
            name: 'One clean block',
            dose: 'daily',
            protocol: 'One session a day with the phone in another room and notifications off. Log the actual focused minutes rather than the elapsed time.',
            mistake: 'Counting time at the desk as practice time. They are frequently very different numbers.'
          }
        ],
        standard: 'You know what makes a good session for you, specifically.',
        milestone: {
          name: 'Self-regulation gate',
          criteria: [
            'Thirty session logs',
            'A plateau diagnosed and broken by changing one variable',
            'You can predict your own good and bad training days'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Time to first competence', method: 'Hours from zero to a working deliverable.' },
      { name: 'Retention at 30 days', method: 'Closed-book recall, as a percentage.' },
      { name: 'Feedback latency', method: 'Hours between attempting and finding out how it went.' },
      { name: 'Log streak', method: 'Consecutive logged sessions.' }
    ],
    failureModes: [
      { name: 'Consuming instead of practising', fix: 'Cap input at a quarter of the session. Watching is not doing.' },
      { name: 'Rereading as revision', fix: 'Replace all rereading with closed-book recall.' },
      { name: 'Comfortable practice', fix: 'Track your success rate and keep it between 50 and 85 per cent.' },
      { name: 'No log', fix: 'Three lines a session. Without it you are repeating rather than practising.' }
    ],
    arena: [
      'Real projects with deadlines',
      'Teaching the material to someone else',
      'Assessment by someone better than you',
      'A public commitment to demonstrate it on a date'
    ],
    library: [
      { title: 'Make It Stick', author: 'Peter Brown, Henry Roediger and Mark McDaniel', note: 'The evidence for retrieval practice. Short and practical.' },
      { title: 'Peak', author: 'Anders Ericsson', note: 'Deliberate practice from the researcher who defined the term, including what the popular version got wrong.' },
      { title: 'Ultralearning', author: 'Scott Young', note: 'Aggressive self-directed project design.' },
      { title: 'Why Don\'t Students Like School?', author: 'Daniel Willingham', note: 'How memory and understanding actually work. Better than the title suggests.' }
    ]
  },

  /* ------------------------------------------------------------ PERFORMANCE */
  {
    id: 'performance-systems',
    name: 'Consistency and Energy',
    discipline: 'Foundation',
    tagline: 'The base everything else on this site runs on.',
    thesis:
      'Every skill here is executed by a body with a finite amount of energy and an attention system that ' +
      'can be trained or wrecked. Very few people fail for lack of information. They fail because execution ' +
      'is inconsistent, and inconsistency is nearly always downstream of sleep, attention and load.',
    hours: { functional: 40, competent: 150, professional: 400, elite: 1200 },
    proofs: {
      functional: 'Consistent sleep, regular training, and a deep work block held for a month.',
      competent: 'You get through a demanding period without falling apart afterwards.',
      professional: 'Your system survives travel, stress and disruption.',
      elite: 'Long-horizon consistency that other people plan around.'
    },
    entryCheck: ['No medical reason not to exercise. Check with a doctor if you are unsure.'],
    pillars: [
      {
        id: 'sleep',
        name: 'Sleep',
        weight: 0.22,
        specialization: 'Recovery',
        objective: 'Protect the process that consolidates everything you practise.',
        competencies: [
          'A consistent wake time, which anchors everything downstream',
          'Light, caffeine and what you do in the last hour',
          'Noticing the link between your sleep and your output',
          'Handling sleep debt during a demanding stretch'
        ],
        stages: [
          {
            name: 'Anchor',
            work: 'Fix the wake time, including at weekends. This is the single highest-leverage change.',
            check: 'Twenty-one days within a 45-minute window.'
          },
          {
            name: 'Remove',
            work: 'Take out the things degrading sleep quality: late caffeine, late screens, late food.',
            check: 'One variable removed and its effect logged.'
          },
          {
            name: 'Survive disruption',
            work: 'Get the protocol back after travel or a bad week.',
            check: 'The protocol survived one disrupted week.'
          }
        ],
        drills: [
          {
            name: 'Fixed wake time',
            dose: 'daily, seven days',
            protocol: 'Same wake time every day for four weeks, weekends included. Anchoring the wake time stabilises the rest of it, and it is more effective than trying to fix bedtime directly.',
            mistake: 'Sleeping in at weekends, which resets the clock and undoes most of the weekday work.'
          },
          {
            name: 'Caffeine curfew',
            dose: 'daily',
            protocol: 'No caffeine within eight hours of intended sleep. Track sleep quality for two weeks before and after. Most people underestimate how long it stays in their system.',
            mistake: 'Believing that because you fall asleep fine, the caffeine is not affecting sleep quality.'
          },
          {
            name: 'Same wind-down',
            dose: 'nightly',
            protocol: 'Thirty screen-free minutes with the same sequence every night. The consistency of the sequence matters more than what is in it.',
            mistake: 'Changing the routine constantly, which stops it functioning as a signal.'
          },
          {
            name: 'Correlate it',
            dose: 'daily',
            protocol: 'Note your sleep and your next-day output in the same log. Two weeks of your own data is more persuasive than any study.',
            mistake: 'Tracking sleep with a device and never comparing it to how the day actually went.'
          }
        ],
        standard: 'You wake at the same time and your good days outnumber your flat ones.',
        milestone: {
          name: 'Recovery gate',
          criteria: [
            'Wake time within a 45-minute window for 21 consecutive days',
            'A documented link between your sleep and your next-day output',
            'The protocol survived one week of disruption'
          ]
        }
      },
      {
        id: 'training',
        name: 'Physical Training',
        weight: 0.2,
        specialization: 'Physical capacity',
        objective: 'Build the capacity that makes long days possible.',
        competencies: [
          'Strength training with the load going up over time',
          'Enough aerobic base to sustain cognitive work',
          'Moving well enough not to get injured',
          'A programme that survives a real schedule'
        ],
        stages: [
          {
            name: 'Turn up',
            work: 'Three sessions a week, in the calendar, non-negotiable. Attendance before optimisation.',
            check: 'Four weeks at three sessions.'
          },
          {
            name: 'Progress',
            work: 'Log every set and make the numbers go up.',
            check: 'Twelve weeks of logged progression.'
          },
          {
            name: 'Survive bad weeks',
            work: 'Use the minimum version rather than skipping.',
            check: 'The minimum dose used through one disrupted week.'
          }
        ],
        drills: [
          {
            name: 'Three fixed sessions',
            dose: '3 × 45-60 minutes',
            protocol: 'Two strength, one aerobic, in fixed calendar slots. Consistency beats programme design by a wide margin at every level below competitive.',
            mistake: 'Optimising the programme before establishing attendance, which is the wrong order.'
          },
          {
            name: 'Log every set',
            dose: 'every session',
            protocol: 'Write down the weight and the reps. Progression needs evidence; memory will tell you that you are doing more than you are.',
            mistake: 'Training by feel, which reliably drifts downward over a few months.'
          },
          {
            name: 'The twelve-minute version',
            dose: 'on bad days',
            protocol: 'Define in advance the twelve-minute session you do when the day collapses. It keeps the streak alive, and the streak is what keeps the identity alive.',
            mistake: 'Treating a missed full session as a missed day, and then missing the next one too.'
          },
          {
            name: 'Move before you sit',
            dose: 'daily',
            protocol: 'Ten minutes of movement before your first deep work block. Notice in your log whether the block goes better. For most people it does.',
            mistake: 'Putting exercise at the end of the day, where it is the first thing sacrificed.'
          }
        ],
        standard: 'You train three times a week whether or not the week went well.',
        milestone: {
          name: 'Capacity gate',
          criteria: [
            'Twelve weeks of logged training with measurable progression',
            'Enough aerobic base for 30 minutes of continuous work',
            'The minimum dose used through one disrupted week'
          ]
        }
      },
      {
        id: 'attention',
        name: 'Attention',
        weight: 0.24,
        specialization: 'Deep work',
        objective: 'Get back the ability to concentrate for a couple of hours.',
        competencies: [
          'Protected blocks with the environment doing the work',
          'Removing distractions rather than resisting them',
          'Batching, and knowing what a context switch costs you',
          'Extending your sustainable block gradually'
        ],
        stages: [
          {
            name: 'Measure',
            work: 'Find out how long you can actually concentrate. It is usually less than you assume.',
            check: 'A week of logged focused minutes.'
          },
          {
            name: 'Remove',
            work: 'Make distraction expensive at the environment level.',
            check: 'Distractions removed rather than resisted.'
          },
          {
            name: 'Extend',
            work: 'Add five minutes a week until you reach ninety.',
            check: 'Ninety uninterrupted minutes, twenty times.'
          }
        ],
        drills: [
          {
            name: 'One protected block',
            dose: 'daily',
            protocol: 'One block a day: phone in another room, notifications off, one task, timer visible. Log the actual focused minutes, not the elapsed time.',
            mistake: 'Keeping the phone face down on the desk, which still costs attention even when it does not buzz.'
          },
          {
            name: 'Make it expensive',
            dose: 'once, then maintained',
            protocol: 'Log out, delete the app, use a blocker, leave the device in another room. Willpower is a poor substitute for a well-arranged environment.',
            mistake: 'Relying on discipline, which works for about four days and then quietly stops.'
          },
          {
            name: 'Add five minutes',
            dose: 'weekly',
            protocol: 'Increase your sustainable block by five minutes a week until you reach ninety. Attention extends like any other capacity, gradually.',
            mistake: 'Attempting three hours on day one, failing, and concluding you cannot concentrate.'
          },
          {
            name: 'Start faster',
            dose: 'daily',
            protocol: 'Decide the night before exactly what the first block will be. Aim to be working within five minutes of sitting down.',
            mistake: 'Beginning the block by deciding what to do, which is where twenty minutes goes.'
          }
        ],
        standard: 'You can sit down and be working within five minutes, for ninety minutes.',
        milestone: {
          name: 'Focus gate',
          criteria: [
            'Ninety uninterrupted minutes, logged, twenty times',
            'Distractions removed at the environment level',
            'You start deep work within five minutes of sitting down'
          ]
        }
      },
      {
        id: 'consistency',
        name: 'Consistency',
        weight: 0.2,
        specialization: 'Habits',
        objective: 'Make execution independent of how you feel.',
        competencies: [
          'Deciding when, where and what in advance',
          'Attaching new behaviour to something that already happens',
          'A rule for missed days that does not spiral',
          'Thinking of it as who you are rather than what you are motivated to do'
        ],
        stages: [
          {
            name: 'Specify',
            work: 'Write when, where and what for each habit.',
            check: 'If-then plans written for each habit.'
          },
          {
            name: 'Streak',
            work: 'Build the streak and never miss twice.',
            check: 'Sixty days with no double miss.'
          },
          {
            name: 'Review',
            work: 'A weekly review that adjusts the system rather than blaming yourself.',
            check: 'Twelve consecutive weekly reviews.'
          }
        ],
        drills: [
          {
            name: 'If-then plan',
            dose: 'per habit',
            protocol: 'Write "when X happens, I will do Y at Z". The specificity roughly doubles follow-through in the research, and it costs one sentence.',
            mistake: 'Writing an intention without a time and place, which is a wish with better grammar.'
          },
          {
            name: 'Never twice',
            dose: 'ongoing',
            protocol: 'One missed day is noise. Two is the start of a new pattern. The whole rule is: never miss twice, and treat the second day as the emergency rather than the first.',
            mistake: 'Trying to make up the missed session, which usually produces a bad session and more guilt.'
          },
          {
            name: 'Weekly review',
            dose: 'weekly, 20 minutes',
            protocol: 'Same time each week, one page: what held, what slipped, what changes next week. Adjust the system rather than resolving to try harder.',
            mistake: 'Reviewing only when things are going well, which removes the data you most need.'
          },
          {
            name: 'Shrink it',
            dose: 'when it keeps slipping',
            protocol: 'If a habit keeps failing, halve it. A ten-minute version that happens beats a sixty-minute version that does not.',
            mistake: 'Keeping the ambitious version out of pride while achieving nothing.'
          }
        ],
        standard: 'The work happens on the days you do not feel like it.',
        milestone: {
          name: 'Consistency gate',
          criteria: [
            'A 60-day streak on the main practice with no double misses',
            'Twelve consecutive weekly reviews',
            'You recovered from three disrupted weeks without abandoning the system'
          ]
        }
      },
      {
        id: 'stress',
        name: 'Load and Sustainability',
        weight: 0.14,
        specialization: 'Sustainable output',
        objective: 'Work hard for years rather than months.',
        competencies: [
          'Planning lighter periods before you need them',
          'Knowing your own early warning signs',
          'Recovery that actually restores rather than distracts',
          'Keeping the relationships that hold the rest of it up'
        ],
        stages: [
          {
            name: 'Plan the light week',
            work: 'Schedule a reduced week every couple of months.',
            check: 'One deload taken before exhaustion.'
          },
          {
            name: 'Know the signs',
            work: 'Write your warning signals and ask someone close to you to add the ones you cannot see.',
            check: 'A warning list, with additions from someone else.'
          },
          {
            name: 'Protect the rest',
            work: 'Keep commitments that have nothing to do with achievement.',
            check: 'Two non-negotiables protected for a quarter.'
          }
        ],
        drills: [
          {
            name: 'Scheduled light week',
            dose: 'every 8-12 weeks',
            protocol: 'Plan a reduced week before you need one. Recovery you schedule is much cheaper than the collapse you do not.',
            mistake: 'Waiting until you are exhausted, at which point a week is no longer enough.'
          },
          {
            name: 'Your warning signs',
            dose: 'once, reviewed monthly',
            protocol: 'Write your five early signals of overload: sleep, temper, appetite, cynicism, avoidance. Ask someone close to add two you cannot see yourself, because they can see them.',
            mistake: 'Listing only the late signals, by which point the useful window has closed.'
          },
          {
            name: 'Two non-negotiables',
            dose: 'weekly',
            protocol: 'Protect two weekly commitments unrelated to achievement: a person, a meal, a walk. These carry load, and they are the first things people cut.',
            mistake: 'Treating them as rewards for finishing, which means they never happen.'
          },
          {
            name: 'The honest check-in',
            dose: 'monthly',
            protocol: 'Ask yourself whether the current rate is one you could hold for another year. If the answer is no, change something now while the choice is still yours.',
            mistake: 'Answering yes because the current sprint is nearly over. It is never nearly over.'
          }
        ],
        standard: 'A year from now you are still going, at a rate you chose.',
        milestone: {
          name: 'Sustainability gate',
          criteria: [
            'A planned light week taken before exhaustion',
            'Warning signs written down, including ones someone else named',
            'Twelve months without an involuntary stop'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Deep work hours a week', method: 'Logged focused minutes, not hours at the desk.' },
      { name: 'Sleep consistency', method: 'How much your wake time varies.' },
      { name: 'Training adherence', method: 'Sessions done over sessions planned.' },
      { name: 'Double misses', method: 'Times you missed the main practice twice running. Target zero.' }
    ],
    failureModes: [
      { name: 'Optimising the plan instead of running it', fix: 'No changes to the programme for the first six weeks.' },
      { name: 'All-or-nothing collapse', fix: 'Define the minimum version in advance and use it.' },
      { name: 'Borrowing from sleep', fix: 'Treat sleep as the first line of the budget, not the buffer.' },
      { name: 'Not measuring anything', fix: 'Two numbers, tracked. Unmeasured consistency is a story you tell yourself.' }
    ],
    arena: [
      'A training partner or someone who notices when you do not turn up',
      'A public commitment with a visible scoreboard',
      'Periodic testing: a physical benchmark and an output benchmark',
      'A weekly review nobody else has to enforce'
    ],
    library: [
      { title: 'Deep Work', author: 'Cal Newport', note: 'The case for concentration, and how to arrange a life around it.' },
      { title: 'Atomic Habits', author: 'James Clear', note: 'Use the mechanics. The anecdotes are padding.' },
      { title: 'Why We Sleep', author: 'Matthew Walker', note: 'Read it for the mechanism. Some specific claims have been disputed since publication.' },
      { title: 'Endure', author: 'Alex Hutchinson', note: 'What actually limits sustained effort, physical and mental.' }
    ],
    disclaimer:
      'General educational guidance, not medical advice. Talk to a qualified professional before starting ' +
      'a training programme or making changes to sleep, diet or medication.'
  }
]);
