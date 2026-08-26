/* Influence disciplines: negotiation, selling, and getting a product to people. */

window.DISCIPLINES = (window.DISCIPLINES || []).concat([

  /* ------------------------------------------------------------ NEGOTIATION */
  {
    id: 'negotiation',
    name: 'Negotiation',
    discipline: 'Influence',
    tagline: 'Stop leaving money and terms on the table out of discomfort.',
    thesis:
      'A forty-minute conversation can be worth more than a quarter of work, and most people go into it ' +
      'with no preparation at all. The research is fairly consistent that preparation beats charisma, which ' +
      'is good news, because preparation is learnable and being naturally persuasive is not. The hard part ' +
      'is not technique. It is being willing to say a number and then stop talking.',
    hours: { functional: 30, competent: 140, professional: 450, elite: 1500 },
    proofs: {
      functional: 'You can improve a salary or a contract without damaging the relationship.',
      competent: 'You run multi-issue commercial deals and can show what you moved.',
      professional: 'You lead complex deals: partnerships, funding, acquisitions.',
      elite: 'You get handed the deals the organisation cannot afford to lose.'
    },
    entryCheck: ['You have something live to practise on: a vendor, a salary, a scope, a rent renewal'],
    pillars: [
      {
        id: 'prep',
        name: 'Preparation and Leverage',
        weight: 0.26,
        specialization: 'Preparation',
        objective: 'Do the work before the conversation, where it is cheap.',
        competencies: [
          'Building a real alternative rather than naming a hypothetical one',
          'Knowing your walk-away number and your target before you sit down',
          'Working out their constraints and who they have to justify the deal to',
          'Turning one variable into seven tradeable ones'
        ],
        stages: [
          {
            name: 'Paper',
            work: 'Prepare on paper for negotiations you are already in. One page per negotiation, before it happens.',
            check: 'Three prep sheets completed before the conversation, not after.'
          },
          {
            name: 'Alternatives',
            work: 'Spend prep time creating a genuine second option rather than researching the first one further.',
            check: 'A real, verified alternative in hand before one negotiation.'
          },
          {
            name: 'Their side',
            work: 'Work on their constraints and internal politics, which is where most of the movement actually is.',
            check: 'You predicted their top two interests correctly.'
          }
        ],
        drills: [
          {
            name: 'One-page prep sheet',
            dose: 'every negotiation',
            protocol: 'Before any negotiation write: your walk-away, your target, their likely walk-away, seven issues ranked by what they cost you against what they are worth to them, and your opening number. One page. Do it even for small things, because the habit is what you are building.',
            mistake: 'Writing down your target and nothing else, which leaves you improvising the moment they push back.'
          },
          {
            name: 'Build the alternative',
            dose: '1 per deal',
            protocol: 'Spend the first hour of preparation getting a second quote, a second offer, or a second buyer. Leverage is manufactured, not discovered, and an hour of this is worth more than a day of tactics.',
            mistake: 'Treating a hypothetical alternative as real. You can hear the difference in someone\'s voice when they actually have one.'
          },
          {
            name: 'Interest excavation',
            dose: '10 questions',
            protocol: 'Write ten questions whose answers would tell you what they actually need. Rank them by how uncomfortable they are to ask, then ask the top three.',
            mistake: 'Asking questions you already know the answer to, which is comfortable and tells you nothing.'
          },
          {
            name: 'Who signs',
            dose: 'per deal',
            protocol: 'Write down who has to approve this internally, what they care about, and what your counterpart has to tell them to get it through. Deals die in the approval you never saw.',
            mistake: 'Negotiating hard with someone who never had authority in the first place.'
          }
        ],
        standard: 'You walk in knowing your number, their likely number, and what you will trade.',
        milestone: {
          name: 'Preparation gate',
          criteria: [
            'Three live negotiations entered with a completed prep sheet',
            'A real alternative built and verified before at least one of them',
            'You predicted the other side\'s top two interests correctly'
          ]
        }
      },
      {
        id: 'anchor',
        name: 'Numbers and Nerve',
        weight: 0.2,
        specialization: 'Claiming value',
        objective: 'Say the number, then stop talking.',
        competencies: [
          'Deciding whether to open, and opening high with a reason attached',
          'Concession patterns that get smaller and always ask for something back',
          'Using silence instead of filling it',
          'Removing hedges from your own language'
        ],
        stages: [
          {
            name: 'Fluency',
            work: 'Get comfortable saying numbers out loud. This is exposure work and it is not intellectual.',
            check: 'You can say your number flat, with no qualifier attached.'
          },
          {
            name: 'Structure',
            work: 'Plan concessions in advance so you are not inventing them under pressure.',
            check: 'A planned concession ladder used in a live deal.'
          },
          {
            name: 'Hold',
            work: 'Practise staying at your number through the first three pushes, which is where most people fold.',
            check: 'One deal closed at or above your original target.'
          }
        ],
        drills: [
          {
            name: 'Say it and stop',
            dose: '5 reps',
            protocol: 'Say your number out loud, then stay silent for a full ten seconds. Five times. Record it if you can. Most people cannot do this the first day and can do it easily by the end of the week.',
            mistake: 'Adding "or something around there" to the end. That sentence has cost people more money than any other.'
          },
          {
            name: 'Concession ladder',
            dose: 'per deal',
            protocol: 'Before the conversation, plan your concessions with each one smaller than the last and each attached to something you get back. Write the reason for each one.',
            mistake: 'Conceding to reward good behaviour. If they get movement for being pleasant, they will be pleasant again.'
          },
          {
            name: 'Hedge audit',
            dose: '5 past asks',
            protocol: 'Look back at your last five written asks and circle every hedge: "I was hoping", "maybe around", "would it be possible". Rewrite each as a flat statement.',
            mistake: 'Softening the ask to protect the relationship. It rarely protects the relationship and it always costs you the number.'
          },
          {
            name: 'Three pushes',
            dose: '3 role-plays',
            protocol: 'Have someone push back on your number three times in a row without new information. Practise holding, restating the reason, and asking a question back.',
            mistake: 'Treating repeated pushback as new information. Repetition is a tactic, not an argument.'
          }
        ],
        standard: 'You can name a number, justify it in one line, and sit through the silence.',
        milestone: {
          name: 'Nerve gate',
          criteria: [
            'You made a high, justified first offer and stayed quiet afterwards',
            'No unreciprocated concessions across three deals',
            'One deal closed above your original target'
          ]
        }
      },
      {
        id: 'creating',
        name: 'Making the Deal Bigger',
        weight: 0.2,
        specialization: 'Trades and deal design',
        objective: 'Find the trades before you fight over the split.',
        competencies: [
          'Trading across issues you and they value differently',
          'Writing contingent terms when you disagree about the future',
          'Offering several equivalent packages and reading which they pick',
          'Reopening a closed deal to make it better for both sides'
        ],
        stages: [
          {
            name: 'Inventory',
            work: 'Score every issue for what it costs you and what it is worth to them.',
            check: 'A scored issue list for a live deal.'
          },
          {
            name: 'Packages',
            work: 'Build several offers of equal value to you and let their choice tell you what they care about.',
            check: 'Three equivalent packages offered in a real negotiation.'
          },
          {
            name: 'Contingency',
            work: 'Resolve future disagreements with terms that pay out differently rather than by arguing.',
            check: 'One contingent clause agreed and signed.'
          }
        ],
        drills: [
          {
            name: 'Cost-to-me, worth-to-them',
            dose: 'per deal',
            protocol: 'Score every issue one to ten on both axes. Trade away everything where their number is higher than yours. This one table finds money in almost every deal.',
            mistake: 'Scoring their column by guessing instead of asking. Ask directly; most people will tell you.'
          },
          {
            name: 'Three packages',
            dose: '3 offers',
            protocol: 'Build three offers that are worth the same to you but shaped differently: more money and less time, more time and less scope, more scope and later payment. Their choice hands you their priorities for free.',
            mistake: 'Making the packages obviously unequal so one is clearly meant to be chosen.'
          },
          {
            name: 'Contingency design',
            dose: '2 clauses',
            protocol: 'For each deadlock about something in the future, write a clause that pays differently depending on how it turns out. Disagreements about forecasts are often just both sides betting, so write the bet down.',
            mistake: 'Building a contingency so complicated that neither side can administer it.'
          },
          {
            name: 'One more round',
            dose: 'after agreement',
            protocol: 'Once you have a deal, ask whether there is a version that is better for both of you. Surprisingly often there is, and asking costs nothing at that point.',
            mistake: 'Reopening price under the cover of "improving the deal", which burns the trust you just built.'
          }
        ],
        standard: 'The final deal is worth more to both sides than either opening position.',
        milestone: {
          name: 'Trade gate',
          criteria: [
            'A deal closed with more total value than either side opened with',
            'Multiple equivalent offers used in a live negotiation',
            'The other side called it fair while you beat your target'
          ]
        }
      },
      {
        id: 'tactics',
        name: 'In the Room',
        weight: 0.18,
        specialization: 'Live technique',
        objective: 'Keep the temperature down and the information flowing.',
        competencies: [
          'Questions that make them solve your problem for you',
          'Naming what you think they are feeling, out loud',
          'Handling deadlines, ultimatums and other pressure tactics',
          'Being able to walk away warmly'
        ],
        stages: [
          {
            name: 'Questions',
            work: 'Replace demands with questions and watch how much more you learn.',
            check: 'Three calibrated questions used in a live conversation.'
          },
          {
            name: 'Temperature',
            work: 'Practise absorbing pressure without either matching it or folding.',
            check: 'A hardball tactic absorbed without reciprocating.'
          },
          {
            name: 'Exit',
            work: 'Get fluent at ending a negotiation without ending the relationship.',
            check: 'You walked away from one deal below your walk-away number.'
          }
        ],
        drills: [
          {
            name: 'Turn demands into questions',
            dose: '10 conversions',
            protocol: 'Take ten things you want to demand and rewrite each as a "how" or "what" question. "I need it by Friday" becomes "how do we make Friday work?". Use three of them this week.',
            mistake: 'Asking a question that is obviously a demand wearing a costume. People can tell.'
          },
          {
            name: 'Name the feeling',
            dose: '5 per day',
            protocol: 'In ordinary conversation, say out loud what you think the other person is feeling: "it sounds like the timing is the real problem here". Note how often it opens up information you would not have got.',
            mistake: 'Guessing wrong and defending the guess. If you are wrong they will correct you, which is also useful.'
          },
          {
            name: 'Walk-away rehearsal',
            dose: '3 reps',
            protocol: 'Practise the exact sentence you would use to end a negotiation warmly: "I do not think we can get there on this one, and I would like to work together on something else". Fluency here removes the fear that makes you concede.',
            mistake: 'Using the walk-away as a threat. If it is a bluff and it gets called, you have lost more than the deal.'
          },
          {
            name: 'Deadline test',
            dose: 'when one appears',
            protocol: 'When someone imposes a deadline, ask what happens after it. Roughly half of all deadlines in negotiation are decoration and dissolve when questioned.',
            mistake: 'Accepting the deadline silently and then rushing your own decision to meet it.'
          }
        ],
        standard: 'You can be pushed hard and stay both warm and immovable.',
        milestone: {
          name: 'Composure gate',
          criteria: [
            'You absorbed a hardball tactic without matching it or capitulating',
            'Naming a feeling unlocked a constraint they had not stated',
            'You walked away from one deal that was below your number'
          ]
        }
      },
      {
        id: 'complex',
        name: 'Complex Deals',
        weight: 0.16,
        specialization: 'Multi-party deals',
        objective: 'Handle committees, coalitions and long timelines.',
        competencies: [
          'Mapping everyone involved and what each needs',
          'Sequencing who you win over, and in what order',
          'Reading terms for where value and risk actually sit',
          'Keeping relationships intact across repeated deals'
        ],
        stages: [
          {
            name: 'Map',
            work: 'Diagram every party, their power, and their private incentive.',
            check: 'A stakeholder map for a live deal.'
          },
          {
            name: 'Sequence',
            work: 'Decide the order of conversations and what each has to produce.',
            check: 'A written sequencing plan you followed.'
          },
          {
            name: 'Terms',
            work: 'Read real contracts closely enough to spot where risk is being moved quietly.',
            check: 'You found a value-shifting clause before signing.'
          }
        ],
        drills: [
          {
            name: 'Stakeholder map',
            dose: 'per deal',
            protocol: 'Draw every party, how much power they have, what they personally want, and who they must justify the deal to. Deals die in the box you did not draw.',
            mistake: 'Mapping job titles rather than incentives. The person with the title is often not the person with the objection.'
          },
          {
            name: 'Term autopsy',
            dose: '3 contracts',
            protocol: 'Read three real contracts in your field and mark every clause that moves risk or value quietly: indexation, renewal, termination, liability caps, payment timing.',
            mistake: 'Skimming to the price and treating the rest as boilerplate. The boilerplate is where the money went.'
          },
          {
            name: 'Sequencing plan',
            dose: '1 per deal',
            protocol: 'Write the order in which you will win people over and what each conversation has to produce before the next one happens.',
            mistake: 'Going to the decision-maker first, before anyone internally is prepared to support it.'
          },
          {
            name: 'Deal log',
            dose: 'after every deal',
            protocol: 'Record the opening, your target, the outcome, and the one thing that moved it. Twenty of these and you will see your own pattern, which is the only way to fix it.',
            mistake: 'Keeping the log only for deals that went well.'
          }
        ],
        standard: 'People you have negotiated against come back and deal with you again.',
        milestone: {
          name: 'Complex deal gate',
          criteria: [
            'A deal closed involving three or more decision-makers',
            'You spotted a value-shifting clause before signing',
            'Someone from a past deal came back voluntarily'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Preparation ratio', method: 'Minutes preparing per minute negotiating. Three to one is a reasonable floor.' },
      { name: 'Movement captured', method: 'Improvement from opening to close, recorded per deal.' },
      { name: 'Walk-aways', method: 'Deals declined below your number. Zero in a year means your number is not real.' },
      { name: 'Repeat counterparties', method: 'People who deal with you more than once.' }
    ],
    failureModes: [
      { name: 'Negotiating to be liked', fix: 'Be warm in manner and immovable on the number. These are separate dials.' },
      { name: 'Arguing over one variable', fix: 'Bring seven issues to every table so there is something to trade.' },
      { name: 'Fear of saying the number', fix: 'Pure exposure. Say it out loud daily until your voice stops changing.' },
      { name: 'No record', fix: 'Keep a deal log. Without it you cannot tell skill from luck.' }
    ],
    arena: [
      'Every commercial conversation you already have: vendors, scope, salary, rent',
      'Volunteering for contract renewals and procurement at work',
      'Structured role-play with someone willing to play it hard',
      'A mentor who has done deals bigger than yours'
    ],
    library: [
      { title: 'Getting to Yes', author: 'Roger Fisher and William Ury', note: 'The interest-based foundation. Short.' },
      { title: 'Bargaining for Advantage', author: 'G. Richard Shell', note: 'The most rigorous of the practitioner books, especially on preparation.' },
      { title: 'Never Split the Difference', author: 'Chris Voss', note: 'Good on the emotional mechanics. Discount the hostage-negotiation framing.' },
      { title: '3-D Negotiation', author: 'David Lax and James Sebenius', note: 'Deal design away from the table, which is where most value is created.' }
    ]
  },

  /* ------------------------------------------------------------------ SALES */
  {
    id: 'sales',
    name: 'Selling',
    discipline: 'Influence',
    tagline: 'Find people with the problem and give them a reason to move.',
    thesis:
      'Nothing in a business happens until something is sold, and selling is the skill that turns every ' +
      'other skill you have into income. It is also measurable in a way most work is not, which makes it ' +
      'unusually trainable. The main obstacle is that it feels undignified until you have done it well ' +
      'enough to see that good selling is mostly diagnosis.',
    hours: { functional: 50, competent: 200, professional: 600, elite: 2000 },
    proofs: {
      functional: 'You can get meetings from cold outreach and run a structured first call.',
      competent: 'You carry a pipeline and hit a number consistently.',
      professional: 'You sell complex or expensive things and build systems other people sell with.',
      elite: 'You build revenue organisations, or you can charge what you like.'
    },
    entryCheck: ['Something real to sell: your own service, an employer\'s product, a freelance offer'],
    pillars: [
      {
        id: 'offer',
        name: 'The Offer',
        weight: 0.2,
        specialization: 'Offer design',
        objective: 'Make the thing easier to sell before you get better at selling it.',
        competencies: [
          'Stating the problem in the buyer\'s words, not your category\'s',
          'Putting a number on what the problem costs them each month',
          'Being different in a way the buyer can repeat to a colleague',
          'Pricing, and taking risk off the buyer\'s side of the table'
        ],
        stages: [
          {
            name: 'The problem',
            work: 'Get the problem statement right by testing it on real buyers.',
            check: 'Three buyers confirmed this is the problem keeping them up.'
          },
          {
            name: 'The number',
            work: 'Build the cost-of-inaction model. Every strong offer is priced against it.',
            check: 'You can state what the problem costs them per month.'
          },
          {
            name: 'The risk',
            work: 'Design guarantees or pilots so the buyer risks less than you do.',
            check: 'A risk reversal tested with real buyers.'
          }
        ],
        drills: [
          {
            name: 'Cost of doing nothing',
            dose: '1 model',
            protocol: 'Build a simple model of what the buyer loses each month by leaving this alone. Use their numbers, not industry averages. Show it to a buyer and watch which line they argue with.',
            mistake: 'Inflating the model. One number they do not believe kills the whole thing.'
          },
          {
            name: 'Ten positionings',
            dose: '10 versions',
            protocol: 'Write ten one-sentence versions of what you sell, each aimed at a different buyer. Test three in live conversations and keep whichever gets asked a follow-up question.',
            mistake: 'Testing them on colleagues, who are not buyers and will be polite.'
          },
          {
            name: 'Risk reversal',
            dose: '3 options',
            protocol: 'Design three ways to take risk off the buyer: a pilot, a milestone payment, a guarantee. Cost each one honestly. A low close rate is often a risk problem rather than a persuasion problem.',
            mistake: 'Offering a guarantee you have not costed, which is fine until people claim it.'
          },
          {
            name: 'Explain it to a stranger',
            dose: '5 people',
            protocol: 'Explain what you sell in one sentence to five people outside your industry. If they ask what you mean, the sentence is not finished.',
            mistake: 'Using a category word ("platform", "solution") that carries no information.'
          }
        ],
        standard: 'A buyer can repeat your offer accurately to a colleague who was not in the room.',
        milestone: {
          name: 'Offer gate',
          criteria: [
            'A one-sentence offer a stranger understands without follow-up',
            'The value stated in the buyer\'s own numbers',
            'Three buyers confirmed the problem statement is right'
          ]
        }
      },
      {
        id: 'pipeline',
        name: 'Finding People',
        weight: 0.24,
        specialization: 'Outbound and lead generation',
        objective: 'Never depend on luck for your next conversation.',
        competencies: [
          'Defining who exactly has this problem and how to find them',
          'Cold email, cold calls and direct messages that get replies',
          'Follow-up sequences, because almost nothing closes on the first touch',
          'Asking for introductions specifically enough to get them'
        ],
        stages: [
          {
            name: 'Volume',
            work: 'Do enough outreach to have data. Messaging cannot be tuned on ten sends.',
            check: 'A hundred contacts reached with a consistent message.'
          },
          {
            name: 'Tuning',
            work: 'Test one variable a week against real prospects and keep the winner.',
            check: 'Reply rate improved from your own baseline.'
          },
          {
            name: 'Compounding',
            work: 'Build referral and introduction flow so volume stops being the only lever.',
            check: 'Three deals sourced from introductions.'
          }
        ],
        drills: [
          {
            name: 'Daily reps',
            dose: '20 contacts a day',
            protocol: 'Twenty new qualified contacts every working day during a build phase, in a fixed block, before anything else. Volume is what teaches you which messages work.',
            mistake: 'Prospecting only when the pipeline is empty, which guarantees a permanent feast and famine cycle.'
          },
          {
            name: 'One variable a week',
            dose: '2 variants, 50 each',
            protocol: 'Run two subject lines or two opening sentences against fifty prospects each. Keep the winner, replace the loser, repeat next week. Small weekly gains compound quickly here.',
            mistake: 'Changing the whole message at once so you learn nothing about which part worked.'
          },
          {
            name: 'The specific ask',
            dose: '5 per week',
            protocol: 'Ask each satisfied contact for one named introduction: "would you introduce me to Sam at Northwind?". Naming the person is the whole trick. "Anyone you can think of" produces nothing.',
            mistake: 'Asking too early, before you have delivered anything worth referring.'
          },
          {
            name: 'Follow-up sequence',
            dose: 'per campaign',
            protocol: 'Write a five-touch sequence where each message adds something new rather than asking again. Most replies come after the third touch, which is exactly where most people stop.',
            mistake: 'Sending "just bumping this to the top of your inbox", which adds nothing and reads as pestering.'
          }
        ],
        standard: 'You can produce five qualified conversations a week whenever you need them.',
        milestone: {
          name: 'Pipeline gate',
          criteria: [
            'A repeatable source producing five qualified conversations a week',
            'Reply rate above 8% on cold outreach',
            'Three deals sourced from introductions'
          ]
        }
      },
      {
        id: 'discovery',
        name: 'Diagnosis',
        weight: 0.22,
        specialization: 'Discovery calls',
        objective: 'Understand the problem before you say a word about what you sell.',
        competencies: [
          'Question sequences that get past the first stated problem',
          'Talking much less than you think you should',
          'Working out whether there is budget, urgency and authority',
          'Ending unqualified conversations without damage'
        ],
        stages: [
          {
            name: 'Listen',
            work: 'Get your share of talking down. Record calls and measure it, because your estimate will be wrong.',
            check: 'Under 40% talk time across five recorded calls.'
          },
          {
            name: 'Dig',
            work: 'Practise going three levels past the first answer.',
            check: 'You can state a prospect\'s real problem, its cost and its owner after one call.'
          },
          {
            name: 'Qualify out',
            work: 'Get comfortable ending conversations that are not going anywhere.',
            check: 'Three deals disqualified early and cleanly.'
          }
        ],
        drills: [
          {
            name: 'Talk-time audit',
            dose: 'every call',
            protocol: 'Record your calls and measure the percentage of time you were talking. Target under 40% on a first call. Most lost deals are audible in this number alone.',
            mistake: 'Counting only your monologues and not the interruptions and the finishing of their sentences.'
          },
          {
            name: 'Three levels down',
            dose: 'per call',
            protocol: 'For every problem they state, ask three more questions: what does that cost, who feels it, what happens if it carries on for another year. The third answer is usually the real one.',
            mistake: 'Hearing a problem you can solve and jumping straight to solving it, which ends the diagnosis early.'
          },
          {
            name: 'Disqualify on purpose',
            dose: '1 a week',
            protocol: 'Deliberately end one unqualified conversation early and warmly. It protects the pipeline and sharpens your judgement about who is real.',
            mistake: 'Keeping a dead deal in the pipeline because it makes the numbers look better this month.'
          },
          {
            name: 'Write it back',
            dose: 'after every call',
            protocol: 'Send a short email summarising their problem, its cost and who it affects, and ask if you got it right. Being corrected is valuable, and being right builds more trust than any pitch.',
            mistake: 'Summarising your solution instead of their problem.'
          }
        ],
        standard: 'The buyer says "yes, that is exactly it" before you have pitched anything.',
        milestone: {
          name: 'Diagnosis gate',
          criteria: [
            'Talk time under 40% across five recorded calls',
            'You can state the problem, its cost and its owner after one call',
            'Three deals disqualified that would previously have wasted a month'
          ]
        }
      },
      {
        id: 'closing',
        name: 'Objections and Closing',
        weight: 0.2,
        specialization: 'Closing',
        objective: 'Turn intent into a signature without pressure theatre.',
        competencies: [
          'Knowing which of the five objections you are actually hearing',
          'Handling the top three inside the pitch before they are raised',
          'Asking clearly, and agreeing the steps to signature',
          'Working with more than one person inside the buyer'
        ],
        stages: [
          {
            name: 'Catalogue',
            work: 'Write down the objections you actually hear and a real answer to each.',
            check: 'Fifteen objections with two-sentence answers, rehearsed.'
          },
          {
            name: 'Ask cleanly',
            work: 'Practise the closing question until it is flat and unapologetic.',
            check: 'You asked for the business without softening it.'
          },
          {
            name: 'Steps',
            work: 'Agree a dated plan to signature with every live deal.',
            check: 'Every live deal has a written mutual plan.'
          }
        ],
        drills: [
          {
            name: 'Objection bank',
            dose: '15 objections',
            protocol: 'Write the fifteen objections you genuinely hear and a two-sentence answer to each. Rehearse aloud until they arrive without thinking. Then work out which three you can pre-handle in the pitch.',
            mistake: 'Writing clever answers you would never actually say out loud.'
          },
          {
            name: 'Flat ask',
            dose: '10 reps',
            protocol: 'Practise the closing question with no rising tone and no apology attached. Record it. Listen for whether it sounds like a question or like a plea.',
            mistake: 'Following the ask with more talking, which gives them somewhere to go other than answering.'
          },
          {
            name: 'Mutual plan',
            dose: 'per deal',
            protocol: 'On the call, write the dated list of steps from here to signature, with names against each, and send it. Deals without one slip and nobody can tell you why.',
            mistake: 'Writing the plan yourself afterwards instead of building it with them on the call.'
          },
          {
            name: 'Second thread',
            dose: 'per deal',
            protocol: 'Get a relationship with a second person inside the buyer. Single-threaded deals die when your one contact goes on holiday or leaves.',
            mistake: 'Going around your contact instead of asking them who else should be involved.'
          }
        ],
        standard: 'You know what happens next in every live deal, with a date on it.',
        milestone: {
          name: 'Closing gate',
          criteria: [
            'Ten closed deals, or a close rate improvement you can evidence',
            'Every live deal has a written, dated plan to signature',
            'A price objection handled without discounting'
          ]
        }
      },
      {
        id: 'systems',
        name: 'Making it a System',
        weight: 0.14,
        specialization: 'Revenue systems',
        objective: 'Turn your own performance into something repeatable.',
        competencies: [
          'Measuring conversion at each stage rather than in aggregate',
          'Keeping a pipeline honest enough to forecast from',
          'Writing down what works so someone else could run it',
          'Retention and expansion, which is cheaper than new business'
        ],
        stages: [
          {
            name: 'Measure',
            work: 'Get stage-by-stage conversion visible.',
            check: 'A full quarter of stage conversion data.'
          },
          {
            name: 'Fix the worst',
            work: 'Work only on the worst ratio, weekly, until it is no longer the worst.',
            check: 'One stage conversion measurably improved.'
          },
          {
            name: 'Write it down',
            work: 'Document the playbook well enough to hand over.',
            check: 'A playbook someone else could run.'
          }
        ],
        drills: [
          {
            name: 'Funnel diagnosis',
            dose: 'weekly',
            protocol: 'Compute conversion between every stage. Work on the single worst ratio and ignore the others until it moves. Repeat weekly.',
            mistake: 'Working on the stage you enjoy most, which for most people is the demo.'
          },
          {
            name: 'Win/loss interviews',
            dose: '2 a month',
            protocol: 'Ask two buyers who said no what actually decided it. Ask "what would have had to be true?" rather than "why did we lose?". The answer is almost never the reason you assumed.',
            mistake: 'Asking your own colleagues why you lost, which produces a story rather than a reason.'
          },
          {
            name: 'Playbook section',
            dose: '1 a week',
            protocol: 'Document one part of what works as if handing it to a new hire on Monday. Writing it forces you to notice the pattern you have been running on instinct.',
            mistake: 'Writing an aspirational process rather than the one you actually use.'
          },
          {
            name: 'Forecast and check',
            dose: 'monthly',
            protocol: 'Predict what will close this month and by how much, then check yourself at month end. Track your error the same way you would track anyone else\'s.',
            mistake: 'Adjusting the forecast at the end of the month to match reality and calling it accurate.'
          }
        ],
        standard: 'You can predict the month within twenty per cent and explain any miss.',
        milestone: {
          name: 'System gate',
          criteria: [
            'Stage-by-stage conversion measured for a full quarter',
            'A written playbook someone else could run',
            'Forecast accurate within twenty per cent for one period'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Qualified conversations a week', method: 'The leading indicator. Everything else follows it.' },
      { name: 'Stage conversion', method: 'Contact to meeting, meeting to proposal, proposal to close. Separately.' },
      { name: 'Talk time', method: 'Your share of a first call. Under 40%.' },
      { name: 'Deal size and cycle length', method: 'Two numbers you should know without looking them up.' }
    ],
    failureModes: [
      { name: 'Pitching before diagnosing', fix: 'No solution talk until the problem, its cost and its owner are on the table.' },
      { name: 'Believing enthusiasm', fix: 'Score every deal against written criteria. Excitement is not a buying signal.' },
      { name: 'Prospecting only when desperate', fix: 'A fixed daily block that happens regardless of pipeline.' },
      { name: 'Discounting to close', fix: 'Trade price against scope, terms or timing. Never give it away for nothing.' }
    ],
    arena: [
      'A real number you have to hit',
      'Recorded calls, which coach you for free',
      'A weekly deal review with someone who will tell you the truth',
      'Buyers who said no, if you are willing to ask them why'
    ],
    library: [
      { title: 'SPIN Selling', author: 'Neil Rackham', note: 'The research behind consultative questioning. Dry and worth it.' },
      { title: 'Fanatical Prospecting', author: 'Jeb Blount', note: 'The unglamorous volume discipline nobody wants to hear about.' },
      { title: 'The Challenger Sale', author: 'Matthew Dixon and Brent Adamson', note: 'Teaching-led selling in complex deals.' },
      { title: '$100M Offers', author: 'Alex Hormozi', note: 'Offer construction. Skip the tone, use the frameworks.' }
    ]
  },

  /* --------------------------------------------------- PRODUCT/DISTRIBUTION */
  {
    id: 'product-distribution',
    name: 'Product and Distribution',
    discipline: 'Influence',
    tagline: 'Build something people want and get it in front of them.',
    thesis:
      'Owning something is what separates a high income from wealth. Building the thing is the half that ' +
      'people enjoy and the half that gets discussed; distribution is the half that kills most attempts. ' +
      'Trained together they are the most direct route to income that does not stop when you do, which is ' +
      'why this is worth years rather than months.',
    hours: { functional: 80, competent: 350, professional: 1200, elite: 4000 },
    proofs: {
      functional: 'You shipped something and got your first ten users or customers.',
      competent: 'You have real retention and one channel that reliably produces customers.',
      professional: 'Meaningful recurring revenue from something you own.',
      elite: 'A business that keeps working and is hard to copy.'
    },
    entryCheck: [
      'You can build or assemble something, or pay someone who can',
      'You have access to a group of people who share a problem'
    ],
    pillars: [
      {
        id: 'problem',
        name: 'Choosing the Problem',
        weight: 0.22,
        specialization: 'Customer discovery',
        objective: 'Pick something worth years of your life.',
        competencies: [
          'Interviewing people about what they did, not what they would do',
          'Telling stated preference apart from actual behaviour',
          'Finding budget that already exists rather than creating it',
          'Being honest about what you specifically bring'
        ],
        stages: [
          {
            name: 'Listen',
            work: 'Twenty conversations about their existing behaviour, with your idea never mentioned.',
            check: 'Twenty interviews with notes on behaviour rather than opinions.'
          },
          {
            name: 'Test the wallet',
            work: 'Ask people to pay before the thing exists.',
            check: 'Three people tried to pay you.'
          },
          {
            name: 'Size it',
            work: 'Work out whether enough people have this problem to be worth the years.',
            check: 'You can state who has it, how often, and what it costs them.'
          }
        ],
        drills: [
          {
            name: 'Twenty interviews',
            dose: '20 conversations',
            protocol: 'Interview twenty people about how they handle this problem now. Ask what they did last time, what it cost, what they tried before. Never describe your idea, because the moment you do they start being polite.',
            mistake: 'Asking "would you use this?". Everyone says yes and the answer is worth nothing.'
          },
          {
            name: 'Pre-sale test',
            dose: '5 asks',
            protocol: 'Ask five people to pay now for something that does not exist yet. Take the money or take a deposit. Enthusiasm is free and money is not.',
            mistake: 'Accepting "definitely, once it is ready" as a signal. It is the polite version of no.'
          },
          {
            name: 'Existing spend audit',
            dose: '1 map',
            protocol: 'Map what your market already pays for to solve this badly: staff time, spreadsheets, agencies, another tool. Redirecting existing budget is far easier than creating new budget.',
            mistake: 'Concluding there is no budget because there is no competitor. Usually the budget is being spent on people\'s time.'
          },
          {
            name: 'Why you',
            dose: '1 page',
            protocol: 'Write what you specifically have that most people attempting this do not: access, expertise, distribution, a reputation. If the honest answer is nothing, that is worth knowing on day one.',
            mistake: 'Listing enthusiasm and work ethic, which everyone attempting it also has.'
          }
        ],
        standard: 'You can describe the problem better than the people who have it.',
        milestone: {
          name: 'Problem gate',
          criteria: [
            'Twenty interviews with notes on behaviour, not opinions',
            'Three people attempted to pay before launch',
            'You can state who has this, how often, and what it costs them'
          ]
        }
      },
      {
        id: 'build',
        name: 'Building the Small Version',
        weight: 0.2,
        specialization: 'Getting to a first version',
        objective: 'Get to the smallest thing that delivers the actual outcome.',
        competencies: [
          'Deciding the one job it must do',
          'Delivering by hand before automating anything',
          'Short cycles with usage instrumented from the start',
          'Knowing when to build, when to assemble, and when to do it manually'
        ],
        stages: [
          {
            name: 'By hand',
            work: 'Deliver the outcome manually for the first few customers.',
            check: 'Five customers served manually, with notes on the real workflow.'
          },
          {
            name: 'Automate the middle',
            work: 'Automate only the parts you have now done enough times to understand.',
            check: 'The most repetitive step automated.'
          },
          {
            name: 'Ship publicly',
            work: 'Put it in front of people who are not your friends.',
            check: 'Ten users from outside your own network.'
          }
        ],
        drills: [
          {
            name: 'Two-week cap',
            dose: 'per version',
            protocol: 'Nothing gets more than two weeks before real users touch it. Extending the deadline requires evidence, not a feeling that it is nearly ready.',
            mistake: 'Adding "just one more thing" that turns out to be a fortnight.'
          },
          {
            name: 'Do it manually first',
            dose: '5 customers',
            protocol: 'Deliver the outcome by hand for your first five customers, even if it takes hours each. You will learn the real workflow, which is almost never the one you would have built.',
            mistake: 'Automating the workflow you imagined, then discovering customers work differently.'
          },
          {
            name: 'Instrument first',
            dose: 'every feature',
            protocol: 'Add the measurement before the feature ships. An unmeasured feature cannot teach you anything and you will argue about it for months.',
            mistake: 'Adding analytics later, which means the first and most informative weeks are invisible.'
          },
          {
            name: 'Cut one feature',
            dose: 'per release',
            protocol: 'Before shipping, remove one planned feature and see if anyone notices. Most of the time nobody does, and you have bought yourself a week.',
            mistake: 'Cutting the boring necessary thing instead of the exciting optional one.'
          }
        ],
        standard: 'People outside your network use it without you helping them.',
        milestone: {
          name: 'Launch gate',
          criteria: [
            'A live product delivering the core outcome',
            'Usage instrumented end to end',
            'Ten users from outside your own network'
          ]
        }
      },
      {
        id: 'distribution',
        name: 'Distribution',
        weight: 0.26,
        specialization: 'Getting customers',
        objective: 'Own one channel that reliably produces customers.',
        competencies: [
          'Choosing a channel that matches how your buyer already behaves',
          'The mechanics of whichever one you pick, properly',
          'Landing pages and conversion basics',
          'Knowing what a customer costs and what they are worth'
        ],
        stages: [
          {
            name: 'Pick one',
            work: 'Choose one channel with a written reason and commit to ninety days.',
            check: 'One channel chosen, with the reasoning written down.'
          },
          {
            name: 'Work it',
            work: 'Daily effort in that channel, tuning one variable a week.',
            check: 'Eight consecutive weeks of consistent effort.'
          },
          {
            name: 'Do the arithmetic',
            work: 'Work out acquisition cost and payback, and decide whether it can scale.',
            check: 'Known cost per customer and payback period.'
          }
        ],
        drills: [
          {
            name: 'Ninety days, one channel',
            dose: 'daily',
            protocol: 'Pick one channel and work it every day for ninety days before judging it. Channel-hopping is the most common reason good products stay unheard of.',
            mistake: 'Declaring a channel dead after three weeks, which is roughly when most channels are still warming up.'
          },
          {
            name: 'One element a week',
            dose: 'weekly',
            protocol: 'Change one thing on the landing page each week: the headline, the proof, the call to action. Measure. Keep or revert. Do not change two things.',
            mistake: 'Redesigning the whole page, which tells you nothing about what moved the number.'
          },
          {
            name: 'Cost per customer',
            dose: 'monthly',
            protocol: 'Work out what a customer costs you, including your own time at a real rate, and what they are worth over their lifetime. If you cannot, you are not running a business yet.',
            mistake: 'Excluding your own time, which makes every channel look profitable.'
          },
          {
            name: 'Go where they already are',
            dose: '1 map',
            protocol: 'List the five places your buyers already gather: a forum, a newsletter, a conference, a subreddit, a WhatsApp group. Show up in one properly rather than broadcasting into five.',
            mistake: 'Choosing the channel you personally enjoy rather than the one your buyers use.'
          }
        ],
        standard: 'You can turn the channel up and more customers arrive.',
        milestone: {
          name: 'Distribution gate',
          criteria: [
            'A channel producing customers for eight consecutive weeks',
            'Known acquisition cost and payback period',
            'Landing page conversion measured and improved from baseline'
          ]
        }
      },
      {
        id: 'retention',
        name: 'Keeping Customers',
        weight: 0.18,
        specialization: 'Retention and pricing',
        objective: 'Keep the customers you win and make them worth more.',
        competencies: [
          'Reading a cohort retention curve honestly',
          'Finding the first-session moment that predicts survival',
          'Pricing and packaging, including raising prices',
          'Finding out why people leave by asking them'
        ],
        stages: [
          {
            name: 'Measure',
            work: 'Chart retention by cohort and look at whether the curve flattens.',
            check: 'A cohort chart you have actually looked at.'
          },
          {
            name: 'Diagnose',
            work: 'Talk to people who left and find the pattern.',
            check: 'Five churn conversations and a named pattern.'
          },
          {
            name: 'Price',
            work: 'Test a higher price on new customers.',
            check: 'One successful price increase.'
          }
        ],
        drills: [
          {
            name: 'Cohort chart',
            dose: 'monthly',
            protocol: 'Chart retention by signup month. A curve that keeps falling toward zero means you do not have product-market fit yet, whatever the revenue line is doing.',
            mistake: 'Looking at total users, which goes up even when retention is terrible.'
          },
          {
            name: 'Churn interviews',
            dose: '5 a month',
            protocol: 'Talk to five customers who left. Ask what they are doing now instead. The pattern is usually obvious within five conversations and invisible from the data alone.',
            mistake: 'Sending a survey. The people who answer surveys are not the people who quietly left.'
          },
          {
            name: 'Price test',
            dose: 'quarterly',
            protocol: 'Raise the price twenty per cent for new customers only and watch conversion. Most founders are underpriced and afraid to find out.',
            mistake: 'Raising it for existing customers at the same time, which turns a pricing test into a retention problem.'
          },
          {
            name: 'Find the moment',
            dose: '1 analysis',
            protocol: 'Compare what customers who stayed did in their first week against those who left. There is usually one action that separates them, and getting people to it becomes your onboarding.',
            mistake: 'Assuming the moment rather than measuring it. It is rarely what the team guesses.'
          }
        ],
        standard: 'The retention curve flattens somewhere above zero.',
        milestone: {
          name: 'Retention gate',
          criteria: [
            'A retention curve that flattens above zero',
            'The activation moment identified from data',
            'One successful price increase'
          ]
        }
      },
      {
        id: 'ownership',
        name: 'Turning it into an Asset',
        weight: 0.14,
        specialization: 'Operating the business',
        objective: 'Make it work when you are not there.',
        competencies: [
          'A weekly number and a monthly review you actually hold',
          'Writing down processes so they can be handed over',
          'Knowing what stops a competent competitor copying you',
          'Managing cash and knowing your runway'
        ],
        stages: [
          {
            name: 'Cadence',
            work: 'Establish the weekly and monthly rhythm and keep it for a quarter.',
            check: 'Twelve consecutive weekly reviews.'
          },
          {
            name: 'Hand over',
            work: 'Document and delegate the most repetitive work.',
            check: 'Three processes someone else runs.'
          },
          {
            name: 'Defend',
            work: 'Work out what makes you hard to copy and build more of it.',
            check: 'A written answer to why customers stay.'
          }
        ],
        drills: [
          {
            name: 'Pick the number',
            dose: 'weekly',
            protocol: 'Choose the single number that best represents progress and review it at the same time every week, written down, even in bad weeks. Especially in bad weeks.',
            mistake: 'Choosing a number that always goes up, like cumulative signups, which cannot tell you anything.'
          },
          {
            name: 'Write one process',
            dose: 'monthly',
            protocol: 'Document one recurring task well enough that someone else could do it on Monday without asking you a question. This is how a job turns into a business.',
            mistake: 'Documenting the interesting work rather than the repetitive work that is eating your week.'
          },
          {
            name: 'Copy audit',
            dose: 'quarterly',
            protocol: 'Write down what would stop a competent, funded competitor copying you in ninety days. If the honest answer is nothing, that answer is your roadmap.',
            mistake: 'Listing features, which are the easiest thing in the world to copy.'
          },
          {
            name: 'Two weeks away',
            dose: 'annually',
            protocol: 'Take two weeks off and see what breaks. The list of what broke is your delegation plan for the next quarter.',
            mistake: 'Checking in every day, which tells you nothing and defeats the exercise.'
          }
        ],
        standard: 'Revenue continues through a week you were not there.',
        milestone: {
          name: 'Asset gate',
          criteria: [
            'Revenue continued through a week you were away',
            'Three documented processes someone else could run',
            'A written, evidenced answer to why customers stay'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Customer conversations a week', method: 'The founder metric that predicts most of the others.' },
      { name: 'Active users or paying customers', method: 'One number, reviewed weekly, written down.' },
      { name: 'Cohort retention', method: 'Still active at 30, 60 and 90 days.' },
      { name: 'Payback period', method: 'Months to recover what a customer cost to acquire.' }
    ],
    failureModes: [
      { name: 'Building before talking', fix: 'Twenty interviews before you write a line of code.' },
      { name: 'Channel hopping', fix: 'Ninety days per channel, then a written decision.' },
      { name: 'Vanity metrics', fix: 'Track only numbers that would change a decision.' },
      { name: 'Avoiding the ask', fix: 'Charge from the first customer. Free users teach you the wrong things.' }
    ],
    arena: [
      'Paying customers, who are the only honest judge',
      'A public launch on a date you announced',
      'A peer group who ask about numbers rather than plans',
      'Customers who left, if you will call them'
    ],
    library: [
      { title: 'The Mom Test', author: 'Rob Fitzpatrick', note: 'How to interview customers without fooling yourself. Read this one first.' },
      { title: 'Traction', author: 'Gabriel Weinberg and Justin Mares', note: 'A systematic way to choose a channel instead of guessing.' },
      { title: 'Obviously Awesome', author: 'April Dunford', note: 'Positioning treated as a decision rather than a vibe.' },
      { title: 'The Lean Startup', author: 'Eric Ries', note: 'Useful on iteration. Read it critically; not everything generalises.' }
    ]
  }
]);
