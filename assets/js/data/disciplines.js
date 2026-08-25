/*
 * disciplines.js — the curriculum library.
 *
 * Each discipline is a real training syllabus, not a topic list. The fields the
 * planner depends on:
 *
 *   hours{}      Honest time-to-level estimates, in practice hours. These are
 *                the numbers the feasibility engine argues with the user about.
 *   pillars[]    Ordered competence blocks. `weight` is the share of program
 *                time the pillar earns when the full arc is trained.
 *   drills[]     Repeatable practice units. `dose` is a per-session prescription.
 *   milestone{}  A pass/fail gate with externally checkable criteria.
 *   arena[]      Where real feedback lives. Practice without an arena is theatre.
 */

window.DISCIPLINES = [
  /* ---------------------------------------------------------------- WRITING */
  {
    id: 'persuasive-writing',
    name: 'Persuasive Writing',
    discipline: 'Communication',
    tagline: 'Move decisions, money and people with text alone.',
    thesis:
      'Writing is the only skill that scales your judgment while you sleep. A memo that changes one decision-maker’s mind is worth more than a year of meetings, and every other high-leverage skill — selling, raising, leading, teaching — is downstream of being able to think clearly on paper.',
    hours: { functional: 60, competent: 220, professional: 700, elite: 2400 },
    proofs: {
      functional: 'Clear, structured emails and one-page memos that get a decision on the first pass.',
      competent: 'Long-form arguments, proposals and landing pages that measurably convert.',
      professional: 'Paid work: copy, essays or strategy documents that move revenue or policy.',
      elite: 'A body of published work with a distinctive voice and a durable audience.'
    },
    entryCheck: ['Can write grammatical prose in the target language', 'Has a subject you actually know something about'],
    pillars: [
      {
        id: 'clarity',
        name: 'Sentence-Level Clarity',
        weight: 0.18,
        specialization: 'Clear operational writing',
        objective: 'Eliminate the friction that makes readers stop reading.',
        competencies: [
          'Subject-verb proximity and active construction',
          'Concrete nouns over abstraction; cutting nominalisations',
          'Rhythm: varying sentence length deliberately',
          'Ruthless deletion — the 20% cut without meaning loss'
        ],
        drills: [
          { name: 'The 20% Cut', dose: '1 page per session', protocol: 'Take any 500-word piece — yours or a stranger’s — and remove exactly 20% of the words without losing a single idea. Time-box to 15 minutes. Log which categories of word you cut most.' },
          { name: 'Imitation Transcription', dose: '250 words per session', protocol: 'Hand-copy a passage from a writer you admire. Then rewrite one of your own paragraphs in that structure. You are training the ear, not stealing the voice.' },
          { name: 'De-abstraction Pass', dose: '10 sentences', protocol: 'Find every abstract noun in a draft (“implementation”, “optimisation”, “solution”) and rewrite the sentence around a person doing a thing.' }
        ],
        milestone: {
          name: 'The Readability Gate',
          criteria: [
            'A 400-word piece read aloud without stumbling once',
            'Three readers can restate your main point in one sentence, correctly',
            'Zero sentences over 35 words unless deliberately chosen'
          ]
        }
      },
      {
        id: 'structure',
        name: 'Argument Architecture',
        weight: 0.22,
        specialization: 'Memos & decision documents',
        objective: 'Build arguments that survive a hostile reader.',
        competencies: [
          'Claim → reason → evidence → objection → answer',
          'Top-down (Minto) ordering: answer first, support after',
          'Steelmanning: stating the counter-case better than its advocates',
          'Load-bearing evidence vs decorative evidence'
        ],
        drills: [
          { name: 'One-Page Decision Memo', dose: '1 per session', protocol: 'Pick a real decision. Write: the recommendation, three reasons, the strongest objection, your answer, and the cost of being wrong. One page, hard limit.' },
          { name: 'Steelman Reversal', dose: '300 words', protocol: 'Argue the opposite of a position you hold, well enough that a believer would sign it. Then write the two sentences that actually defeat it.' },
          { name: 'Skeleton Extraction', dose: '2 pieces', protocol: 'Reduce a published argument to its bare claim tree. Mark every place the author substituted confidence for evidence.' }
        ],
        milestone: {
          name: 'The Hostile Reader Test',
          criteria: [
            'A memo survives review by someone who disagrees, without them finding an unanswered objection',
            'The argument holds when the supporting anecdotes are deleted',
            'Recommendation is legible in the first three lines'
          ]
        }
      },
      {
        id: 'audience',
        name: 'Reader Modelling',
        weight: 0.2,
        specialization: 'Conversion copy',
        objective: 'Write to a specific person’s incentives, not to the void.',
        competencies: [
          'Awareness stages: unaware → problem-aware → solution-aware → ready',
          'Voice-of-customer mining: using their words, not yours',
          'Objection ordering — answering in the sequence doubt arrives',
          'Status and risk: what your reader is afraid of losing'
        ],
        drills: [
          { name: 'Voice Mining', dose: '20 quotes', protocol: 'Harvest twenty verbatim lines from reviews, support tickets or forums where your reader describes the problem. Build your next piece only from their vocabulary.' },
          { name: 'Objection Ladder', dose: '1 ladder', protocol: 'List the eight reasons a reader says no, in the order they occur, and write the single line that dissolves each.' },
          { name: 'Two-Audience Rewrite', dose: '2 versions', protocol: 'Write the same 200-word pitch for a sceptical expert and for a busy generalist. Diff them and name what changed.' }
        ],
        milestone: {
          name: 'The Conversion Gate',
          criteria: [
            'A piece of writing produced a measurable action from at least 10 real readers (reply, signup, purchase, decision)',
            'You can name your reader’s top three objections without guessing',
            'A/B tested one headline or subject line against a live audience'
          ]
        }
      },
      {
        id: 'longform',
        name: 'Long-Form Control',
        weight: 0.22,
        specialization: 'Essays & thought leadership',
        objective: 'Hold a reader for 2,000 words and land the turn.',
        competencies: [
          'Openings that create an information gap',
          'Section design and narrative momentum across pages',
          'The turn: where the piece stops informing and starts changing the reader',
          'Endings that pay the opening promise'
        ],
        drills: [
          { name: 'Twelve Openings', dose: '12 leads', protocol: 'Write twelve different first paragraphs for the same piece. Question, scene, claim, statistic, confession, objection, dialogue — then choose and articulate why.' },
          { name: 'Structural Autopsy', dose: '1 essay', protocol: 'Take an essay that held you. Chart every section by function and word count. Reproduce the shape with your own material.' },
          { name: 'Ship Weekly', dose: '1 published piece', protocol: 'Publish where strangers can respond. Unpublished practice writing plateaus fast — the deadline and the audience are part of the drill.' }
        ],
        milestone: {
          name: 'The Attention Gate',
          criteria: [
            'A 2,000-word piece published with measured read-through above 40%',
            'At least three unsolicited responses from strangers',
            'You can defend every section’s existence in one sentence'
          ]
        }
      },
      {
        id: 'voice',
        name: 'Voice & Authority',
        weight: 0.18,
        specialization: 'Building a body of work',
        objective: 'Become the writer a specific audience returns to.',
        competencies: [
          'Positioning: the sentence only you can write',
          'Consistency of stance across a body of work',
          'Editing at the level of taste, not just correctness',
          'Distribution: where the work meets its readers'
        ],
        drills: [
          { name: 'Stance Statement', dose: '1 statement, revised', protocol: 'Write the twenty words describing what you believe that most of your field does not. Revise it every two weeks as the work teaches you.' },
          { name: 'Cold Reread', dose: '1 old piece', protocol: 'Reread something you wrote 30+ days ago and mark every line that now sounds borrowed. Borrowed lines are the boundary of your voice.' },
          { name: 'Distribution Rep', dose: '3 placements', protocol: 'Place one piece in front of an audience you do not own — newsletter, publication, community, podcast.' }
        ],
        milestone: {
          name: 'The Body of Work Gate',
          criteria: [
            'Twelve published pieces a stranger could read as one coherent position',
            'An audience that arrives without paid distribution',
            'One inbound opportunity (job, client, collaboration) traceable to the writing'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Ship rate', method: 'Pieces published per week. Below one, nothing else matters.' },
      { name: 'Read-through', method: 'Percentage reaching the end. Track per piece.' },
      { name: 'Response rate', method: 'Replies or actions per hundred readers.' },
      { name: 'Cut ratio', method: 'Words deleted / words drafted. Healthy drafts lose 25–40%.' }
    ],
    failureModes: [
      { name: 'Practising without publishing', fix: 'Set a fixed publish slot before you write. The deadline is the teacher.' },
      { name: 'Writing to impress peers', fix: 'Name one real reader before drafting. Write the email to them.' },
      { name: 'Editing while drafting', fix: 'Separate the sessions physically — draft fast, edit cold, minimum 12 hours apart.' },
      { name: 'Infinite research', fix: 'Cap input at 25% of session time. Writing is how you find out what you think.' }
    ],
    arena: [
      'Publish to a real list, however small, on a fixed schedule',
      'Write documents your organisation actually decides from',
      'Take one paid copy or ghostwriting engagement — payment changes the feedback quality'
    ],
    library: [
      { title: 'On Writing Well', author: 'William Zinsser', note: 'Non-fiction clarity; the deletion discipline.' },
      { title: 'The Pyramid Principle', author: 'Barbara Minto', note: 'The structural spine of every serious business document.' },
      { title: 'The Sense of Style', author: 'Steven Pinker', note: 'Why prose fails, explained by someone who studies cognition.' },
      { title: 'The Boron Letters', author: 'Gary Halbert', note: 'Direct response fundamentals — writing that has to earn money.' }
    ]
  },

  /* --------------------------------------------------------------- SPEAKING */
  {
    id: 'speaking-presence',
    name: 'Speaking & Executive Presence',
    discipline: 'Communication',
    tagline: 'Command a room, a camera, and a hostile Q&A.',
    thesis:
      'Careers turn on the twenty minutes you spend in front of people who can change your life. Presence is not charisma — it is a trainable stack of structure, delivery mechanics and composure under pressure, and almost nobody trains it deliberately.',
    hours: { functional: 40, competent: 160, professional: 500, elite: 1800 },
    proofs: {
      functional: 'Deliver a prepared ten-minute talk without notes or filler collapse.',
      competent: 'Hold a room of 50, handle unscripted Q&A, present to executives.',
      professional: 'Keynote or pitch at events; paid speaking or investor-facing presentation.',
      elite: 'A recognised speaking reputation that generates inbound opportunity.'
    },
    entryCheck: ['Access to any audience — team, meetup, camera', 'Willingness to be recorded'],
    pillars: [
      {
        id: 'mechanics',
        name: 'Delivery Mechanics',
        weight: 0.2,
        specialization: 'Physical delivery',
        objective: 'Make voice and body stop leaking credibility.',
        competencies: [
          'Breath support and pitch floor',
          'Pace control and the strategic pause',
          'Filler elimination (um, so, right, kind of)',
          'Stance, gesture range, and eye contact in units of thought'
        ],
        drills: [
          { name: 'Filler Audit', dose: '3 min recorded', protocol: 'Record three minutes on any topic. Count fillers. Re-record replacing each with a one-second silence. Repeat until fillers per minute is under two.' },
          { name: 'Pause Metronome', dose: '5 min', protocol: 'Deliver a passage inserting a full two-count pause at every period. It will feel absurd; on camera it reads as authority.' },
          { name: 'Cold Open', dose: '3 reps', protocol: 'Stand, start recording, speak for 90 seconds on a random noun with no preparation. Trains the transition from silence to speech under load.' }
        ],
        milestone: {
          name: 'The Tape Gate',
          criteria: [
            'Under two fillers per minute across a five-minute recording',
            'Watchable on video with sound off — stance and gesture do not undercut you',
            'Can hold a three-second pause without rushing to fill it'
          ]
        }
      },
      {
        id: 'talkdesign',
        name: 'Talk Architecture',
        weight: 0.22,
        specialization: 'Presentation design',
        objective: 'Design talks around one idea people can carry out of the room.',
        competencies: [
          'The single transferable idea and the through-line',
          'Opening in thirty seconds: stakes before context',
          'Three-act structure and signposting',
          'Slides as evidence, not as teleprompter'
        ],
        drills: [
          { name: 'One-Sentence Test', dose: 'every talk', protocol: 'Write the one sentence you want repeated at dinner that night. If the talk does not serve it, cut the section.' },
          { name: 'Slide Strip', dose: '1 deck', protocol: 'Take an existing deck and rebuild it with no more than six words per slide. Force the content into your mouth, not the screen.' },
          { name: 'Thirty-Second Open', dose: '5 versions', protocol: 'Write five different openings for the same talk. Deliver each to camera. Keep the one that makes you sit forward on playback.' }
        ],
        milestone: {
          name: 'The Retention Gate',
          criteria: [
            'Three audience members can state your core idea 24 hours later',
            'Talk delivered from a six-slide deck without reading',
            'The talk survives being cut to half length'
          ]
        }
      },
      {
        id: 'pressure',
        name: 'Composure Under Pressure',
        weight: 0.22,
        specialization: 'Q&A and hostile rooms',
        objective: 'Stay expensive-looking when the room turns.',
        competencies: [
          'Physiological control: exhale-weighted breathing, pre-talk routine',
          'Answering the question actually asked; bridging without evasion',
          'Handling hostility, interruption and the unanswerable question',
          '"I don’t know" delivered from strength'
        ],
        drills: [
          { name: 'Hostile Q&A', dose: '10 questions', protocol: 'Have someone fire ten aggressive questions. Answer each in under 45 seconds, first sentence being the answer. Record it.' },
          { name: 'Interrupt Reps', dose: '5 reps', protocol: 'Present while a partner interrupts every 30 seconds. Practise absorbing and returning to the through-line.' },
          { name: 'Stress Inoculation', dose: 'weekly', protocol: 'Deliberately speak to an audience one size larger or one degree more senior than comfortable. Log the physiological response and how fast it settled.' }
        ],
        milestone: {
          name: 'The Q&A Gate',
          criteria: [
            'Fifteen minutes of unscripted Q&A on tape without evasion or collapse',
            'One hostile question answered without defensiveness',
            'Said "I don’t know, here’s how I’d find out" and kept the room'
          ]
        }
      },
      {
        id: 'narrative',
        name: 'Story & Persuasion',
        weight: 0.18,
        specialization: 'Narrative persuasion',
        objective: 'Make the argument stick to a nervous system, not just a notepad.',
        competencies: [
          'Story spine: situation, complication, turn, consequence',
          'Concrete detail and the specificity that creates belief',
          'Emotional register control — knowing when to go quiet',
          'Ethical persuasion: pressure vs manipulation'
        ],
        drills: [
          { name: 'Story Bank', dose: '1 story/week', protocol: 'Build a bank of 12 personal stories, each under 90 seconds, each with a point. Rehearse until the timing is exact.' },
          { name: 'Detail Substitution', dose: '3 stories', protocol: 'Retell a story replacing every generality with a specific: a name, a number, a smell, a time of day.' },
          { name: 'Register Range', dose: '3 reps', protocol: 'Deliver the same 60-second passage three ways: urgent, intimate, matter-of-fact. Learn what each buys.' }
        ],
        milestone: {
          name: 'The Story Gate',
          criteria: [
            'Twelve rehearsed stories, each landing a distinct point in under 90 seconds',
            'One story visibly changed a room’s attention on video',
            'Can attach a story to an argument on ten seconds’ notice'
          ]
        }
      },
      {
        id: 'presence',
        name: 'Executive Presence',
        weight: 0.18,
        specialization: 'Senior-room credibility',
        objective: 'Be read as the person who should be deciding.',
        competencies: [
          'Economy: saying less with more consequence',
          'Status calibration — neither deferring nor performing',
          'Reading the room and adjusting live',
          'Owning the first and last sixty seconds of any meeting'
        ],
        drills: [
          { name: 'Half the Words', dose: '1 meeting/day', protocol: 'In one meeting per day, say half as much as you want to, and make the first sentence the conclusion.' },
          { name: 'Room Read', dose: 'after each meeting', protocol: 'Write three lines: who actually decided, what they were worried about, what you would change in your delivery.' },
          { name: 'Senior Exposure', dose: 'weekly', protocol: 'Put yourself in one room per week above your current level. Presence is trained by proximity to consequence.' }
        ],
        milestone: {
          name: 'The Room Gate',
          criteria: [
            'Ran a meeting with people more senior than you and got a decision',
            'Feedback from two peers that your presence read as calm and credible',
            'Opened and closed a high-stakes meeting deliberately'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Fillers per minute', method: 'Count from recordings. Target below 2.' },
      { name: 'Stage reps', method: 'Live audiences per month. Below two, progress stalls.' },
      { name: 'Recall test', method: 'Percentage of listeners who restate the core idea next day.' },
      { name: 'Tape hours', method: 'Minutes of your own delivery reviewed per week.' }
    ],
    failureModes: [
      { name: 'Rehearsing in your head', fix: 'Out loud, standing, on camera, or it did not happen.' },
      { name: 'Refusing to watch the tape', fix: 'Review with sound off first, then audio only. Splitting channels removes the cringe.' },
      { name: 'Over-slidings', fix: 'Cap slides at one per two minutes; no slide the audience must read while you talk.' },
      { name: 'Only low-stakes audiences', fix: 'Escalate stakes monthly. Comfortable rooms stop teaching.' }
    ],
    arena: [
      'Toastmasters or a local speaker meetup for volume',
      'Volunteer for every internal presentation nobody wants',
      'Conference CFPs — apply to five per quarter',
      'Publish talk recordings; the camera is a permanent honest audience'
    ],
    library: [
      { title: 'Talk Like TED', author: 'Carmine Gallo', note: 'Reverse-engineered structure of talks that travel.' },
      { title: 'Resonate', author: 'Nancy Duarte', note: 'Presentation as narrative form.' },
      { title: 'Impro', author: 'Keith Johnstone', note: 'The definitive text on status transactions.' },
      { title: 'The Charisma Myth', author: 'Olivia Fox Cabane', note: 'Presence broken into trainable components.' }
    ]
  },

  /* ------------------------------------------------------------ NEGOTIATION */
  {
    id: 'negotiation',
    name: 'Negotiation & Deal-Making',
    discipline: 'Influence',
    tagline: 'Capture the value you create instead of donating it.',
    thesis:
      'Negotiation is the highest hourly-rate activity in existence: a forty-minute conversation can be worth six figures. Most people never train it, which means the trained party in any room takes the surplus. It is also fully learnable — preparation beats charisma in nearly every documented study.',
    hours: { functional: 30, competent: 140, professional: 450, elite: 1500 },
    proofs: {
      functional: 'Negotiate a salary or contract improvement without damaging the relationship.',
      competent: 'Run multi-issue commercial deals; consistently improve terms by double digits.',
      professional: 'Lead complex or multi-party deals: partnerships, funding, acquisitions.',
      elite: 'Trusted to run the deals the organisation cannot afford to lose.'
    },
    entryCheck: ['Any live negotiation to practise on — vendors, salary, scope, rent'],
    pillars: [
      {
        id: 'prep',
        name: 'Preparation & Leverage',
        weight: 0.26,
        specialization: 'Deal preparation',
        objective: 'Win before the conversation starts.',
        competencies: [
          'BATNA construction — building alternatives, not just naming them',
          'Reservation price, target price and the aspiration gap',
          'Mapping their interests, constraints and internal politics',
          'Issue inventory: turning one variable into seven'
        ],
        drills: [
          { name: 'One-Page Prep Sheet', dose: 'every negotiation', protocol: 'Before any negotiation: your BATNA, their likely BATNA, reservation, target, seven tradeable issues ranked by cost-to-you vs value-to-them, and your opening.' },
          { name: 'BATNA Manufacturing', dose: '1 per deal', protocol: 'Spend the first block of prep time creating a genuine alternative — a second quote, a second offer, a second buyer. Leverage is built, not discovered.' },
          { name: 'Interest Excavation', dose: '10 questions', protocol: 'Write ten questions whose answers would reveal what they actually need. Rank by how hard they are to ask; ask the top three.' }
        ],
        milestone: {
          name: 'The Preparation Gate',
          criteria: [
            'Three live negotiations entered with a completed prep sheet',
            'A real, verified alternative constructed before at least one negotiation',
            'Correctly predicted the counterparty’s top two interests'
          ]
        }
      },
      {
        id: 'anchor',
        name: 'Anchoring & Value Claiming',
        weight: 0.2,
        specialization: 'Claiming value',
        objective: 'Set the frame and hold it under pressure.',
        competencies: [
          'First-offer strategy and when to let them go first',
          'Justified anchors — numbers with a story attached',
          'Concession patterns that signal a floor',
          'Silence as an instrument'
        ],
        drills: [
          { name: 'Anchor Rehearsal', dose: '5 reps', protocol: 'Say your number out loud, then stop talking, five times, until you can do it without a nervous qualifier or a downward drift.' },
          { name: 'Concession Ladder', dose: 'per deal', protocol: 'Pre-plan your concessions with decreasing sizes and a stated reason for each. Never concede without asking for something back.' },
          { name: 'Range Removal', dose: 'audit', protocol: 'Audit your last five asks for hedging language ("something like", "maybe around", "I was hoping"). Rewrite each as a flat number.' }
        ],
        milestone: {
          name: 'The Anchor Gate',
          criteria: [
            'Delivered a high, justified first offer and stayed silent afterwards',
            'Never made an unreciprocated concession across three deals',
            'One negotiation closed above your original target'
          ]
        }
      },
      {
        id: 'creating',
        name: 'Value Creation & Trades',
        weight: 0.2,
        specialization: 'Integrative deals',
        objective: 'Grow the pie before splitting it.',
        competencies: [
          'Logrolling: trading across differently-valued issues',
          'Contingent contracts for resolving disagreement about the future',
          'MESO — multiple equivalent simultaneous offers',
          'Post-settlement settlement'
        ],
        drills: [
          { name: 'MESO Construction', dose: '3 packages', protocol: 'Build three offers of equal value to you but different shapes. Their choice reveals their priorities for free.' },
          { name: 'Contingency Design', dose: '2 clauses', protocol: 'For each deadlock over a future unknown, write a clause that pays out differently depending on the outcome.' },
          { name: 'Trade Mapping', dose: 'per deal', protocol: 'Score every issue 1–10 for cost-to-you and value-to-them. Trade everything where their number exceeds yours.' }
        ],
        milestone: {
          name: 'The Integrative Gate',
          criteria: [
            'A deal closed with more value on the table than either side opened with',
            'MESO used in a live negotiation',
            'Counterparty described the outcome as fair — while you exceeded target'
          ]
        }
      },
      {
        id: 'tactics',
        name: 'Tactical Conversation',
        weight: 0.18,
        specialization: 'In-the-room technique',
        objective: 'Control the emotional temperature of the room.',
        competencies: [
          'Calibrated questions that make them solve your problem',
          'Labelling and tactical empathy',
          'Handling ultimatums, deadlines and hardball tactics',
          'Knowing and using the walk-away'
        ],
        drills: [
          { name: 'Calibrated Questions', dose: '10 questions', protocol: 'Convert ten demands into "how" and "what" questions. Deploy three in a live conversation this week.' },
          { name: 'Label Reps', dose: '5 per day', protocol: 'In ordinary conversation, name the other person’s state out loud ("it sounds like this timing is the real problem"). Note how often it opens information.' },
          { name: 'Walk-Away Rehearsal', dose: '3 reps', protocol: 'Practise the exact sentence you would use to end a negotiation warmly. Fluency here removes the fear that makes people concede.' }
        ],
        milestone: {
          name: 'The Composure Gate',
          criteria: [
            'Absorbed a hardball tactic without reciprocating or capitulating',
            'Used labelling to unlock a stated constraint',
            'Walked away from one deal that was below your reservation price'
          ]
        }
      },
      {
        id: 'complex',
        name: 'Complex & Multi-Party Deals',
        weight: 0.16,
        specialization: 'Multi-party & long-cycle deals',
        objective: 'Handle deals with committees, coalitions and long horizons.',
        competencies: [
          'Stakeholder mapping and coalition sequencing',
          'Agent problems: negotiating through intermediaries',
          'Term-sheet literacy — where value actually hides',
          'Relationship maintenance across repeated games'
        ],
        drills: [
          { name: 'Stakeholder Map', dose: 'per deal', protocol: 'Diagram every party, their decision power, their private incentive, and who they must justify the deal to.' },
          { name: 'Term Autopsy', dose: '3 contracts', protocol: 'Read three real contracts in your field and mark every clause that shifts risk or value quietly.' },
          { name: 'Sequencing Plan', dose: '1 per deal', protocol: 'Decide the order in which you win people, and what each conversation must produce before the next.' }
        ],
        milestone: {
          name: 'The Complex Deal Gate',
          criteria: [
            'Closed a deal involving three or more decision-makers',
            'Identified a value-shifting clause before signing',
            'A counterparty from a past deal came back voluntarily'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Prep ratio', method: 'Preparation minutes per negotiation minute. Target 3:1 or better.' },
      { name: 'Delta captured', method: 'Improvement over opening offer, per deal, tracked in a log.' },
      { name: 'Walk-away count', method: 'Deals declined below reservation. Zero over a year means your reservation is fake.' },
      { name: 'Relationship survival', method: 'Counterparties who deal with you again.' }
    ],
    failureModes: [
      { name: 'Negotiating to be liked', fix: 'Separate warmth from concession. Be warm in manner, immovable on the number.' },
      { name: 'Single-issue framing', fix: 'Never negotiate one variable. Bring seven issues to every table.' },
      { name: 'Fear of the number', fix: 'Rehearse saying it aloud until the physiology settles. This is pure exposure training.' },
      { name: 'No deal log', fix: 'Keep a written record: opening, target, outcome, what moved. Without it there is no feedback loop.' }
    ],
    arena: [
      'Every commercial conversation you already have — vendors, scope, salary, rent',
      'Volunteer to run procurement or contract renewals at work',
      'Negotiation clinics, case simulations, structured role-play with a peer'
    ],
    library: [
      { title: 'Getting to Yes', author: 'Fisher & Ury', note: 'The interest-based foundation.' },
      { title: 'Never Split the Difference', author: 'Chris Voss', note: 'Tactical conversation under emotional load.' },
      { title: 'Bargaining for Advantage', author: 'G. Richard Shell', note: 'The most rigorous practitioner text; strong on preparation.' },
      { title: '3-D Negotiation', author: 'Lax & Sebenius', note: 'Deal design and setup away from the table.' }
    ]
  },

  /* ------------------------------------------------------------------ SALES */
  {
    id: 'sales',
    name: 'Sales & Client Acquisition',
    discipline: 'Influence',
    tagline: 'Turn attention into revenue — predictably.',
    thesis:
      'Nothing else in business matters until something is sold. Selling is the single skill that converts every other skill into income, and it is the fastest route from zero to financial independence because it is measurable, teachable, and permanently in demand.',
    hours: { functional: 50, competent: 200, professional: 600, elite: 2000 },
    proofs: {
      functional: 'Book meetings from cold outreach and run a structured discovery call.',
      competent: 'Own a pipeline and close deals consistently against quota.',
      professional: 'Sell complex or high-value offerings; build repeatable acquisition systems.',
      elite: 'Build and lead a revenue organisation, or command premium fees on demand.'
    },
    entryCheck: ['Something real to sell — your own service, an employer’s product, or a freelance offer'],
    pillars: [
      {
        id: 'offer',
        name: 'Offer & Positioning',
        weight: 0.2,
        specialization: 'Offer design',
        objective: 'Make the thing easier to sell before improving how you sell it.',
        competencies: [
          'Problem definition in the buyer’s language',
          'Value quantification: naming the cost of inaction in currency',
          'Differentiation and category choice',
          'Pricing structure, guarantees and risk reversal'
        ],
        drills: [
          { name: 'Cost of Inaction', dose: '1 model', protocol: 'Build a simple model showing what the buyer loses per month by doing nothing. Every strong offer is priced against this number.' },
          { name: 'Ten Positionings', dose: '10 versions', protocol: 'Write ten one-sentence versions of what you sell, each for a different buyer. Test three in live conversations.' },
          { name: 'Guarantee Design', dose: '3 options', protocol: 'Design three risk reversals and cost each. Weak close rates are often a risk problem, not a persuasion problem.' }
        ],
        milestone: {
          name: 'The Offer Gate',
          criteria: [
            'A one-sentence offer that a stranger understands without follow-up questions',
            'Value quantified in the buyer’s own currency',
            'Three buyers confirmed the problem statement is the one keeping them up'
          ]
        }
      },
      {
        id: 'pipeline',
        name: 'Pipeline Generation',
        weight: 0.24,
        specialization: 'Outbound & lead generation',
        objective: 'Never be dependent on inbound luck.',
        competencies: [
          'ICP definition and list building',
          'Cold email, cold call and social outreach mechanics',
          'Sequencing, follow-up cadence and channel mix',
          'Referral and warm-intro engineering'
        ],
        drills: [
          { name: 'Daily Reps', dose: '20 contacts/day', protocol: 'Twenty new qualified contacts per working day during a build phase. Volume is the only teacher for messaging.' },
          { name: 'Subject Line Split', dose: '2 variants/week', protocol: 'Run two subject lines against 50 prospects each. Keep the winner, replace the loser. Compounding weekly.' },
          { name: 'Referral Ask Script', dose: '5 asks/week', protocol: 'A specific script asking each satisfied contact for one named introduction. Specificity converts; "anyone you know" does not.' }
        ],
        milestone: {
          name: 'The Pipeline Gate',
          criteria: [
            'A repeatable source producing five qualified conversations per week',
            'Reply rate above 8% on cold outreach',
            'Three deals sourced from referrals'
          ]
        }
      },
      {
        id: 'discovery',
        name: 'Discovery & Qualification',
        weight: 0.22,
        specialization: 'Consultative discovery',
        objective: 'Diagnose before prescribing; disqualify fast.',
        competencies: [
          'Question frameworks (SPIN, MEDDIC, pain-chain)',
          'Talk-time discipline — listening as technique',
          'Qualification: budget, authority, urgency, consequence',
          'Disqualifying without burning the relationship'
        ],
        drills: [
          { name: 'Talk-Time Audit', dose: 'every call', protocol: 'Record calls and measure your share of talking. Target under 40% in discovery. Most losses are audible in this number.' },
          { name: 'Pain Chain', dose: '3 levels deep', protocol: 'For every stated problem, ask three levels down: what does that cost, who feels it, what happens if it continues.' },
          { name: 'Disqualify Drill', dose: '1/week', protocol: 'Deliberately end one unqualified conversation early and cleanly. Protects the pipeline and sharpens judgement.' }
        ],
        milestone: {
          name: 'The Discovery Gate',
          criteria: [
            'Talk-time under 40% across five recorded calls',
            'Can state a prospect’s pain, its cost and its owner after one call',
            'Disqualified three deals that would previously have wasted a month'
          ]
        }
      },
      {
        id: 'closing',
        name: 'Objections & Closing',
        weight: 0.2,
        specialization: 'Closing',
        objective: 'Convert intent into signature without pressure theatre.',
        competencies: [
          'Objection taxonomy: price, timing, authority, trust, priority',
          'Pre-handling the top three objections inside the pitch',
          'Clear asks and mutual action plans',
          'Multi-threading and navigating buying committees'
        ],
        drills: [
          { name: 'Objection Bank', dose: '15 objections', protocol: 'Write the fifteen objections you actually hear and a two-sentence response for each. Rehearse aloud until instant.' },
          { name: 'Ask Rehearsal', dose: '10 reps', protocol: 'Practise the closing question flat, without a rising tone or an apology attached.' },
          { name: 'Mutual Action Plan', dose: 'per deal', protocol: 'Write the dated step list from here to signature with the buyer, in the call. Deals without one slip.' }
        ],
        milestone: {
          name: 'The Close Gate',
          criteria: [
            'Ten closed deals, or a close rate improvement you can evidence',
            'Every live deal has a written mutual action plan',
            'Handled a price objection without discounting'
          ]
        }
      },
      {
        id: 'systems',
        name: 'Systems & Compounding',
        weight: 0.14,
        specialization: 'Revenue systems',
        objective: 'Turn personal performance into a machine.',
        competencies: [
          'Pipeline metrics and conversion diagnostics by stage',
          'CRM hygiene and forecast discipline',
          'Playbooks, templates and enablement',
          'Account expansion and retention economics'
        ],
        drills: [
          { name: 'Funnel Diagnosis', dose: 'weekly', protocol: 'Compute conversion between every stage. Fix only the worst ratio. Repeat weekly.' },
          { name: 'Playbook Writing', dose: '1 section/week', protocol: 'Document what works as if handing it to a new hire. Writing it forces you to see the pattern.' },
          { name: 'Win/Loss Interviews', dose: '2/month', protocol: 'Ask two closed-lost buyers what actually decided it. The answer is almost never what you assumed.' }
        ],
        milestone: {
          name: 'The System Gate',
          criteria: [
            'Stage-by-stage conversion measured for a full quarter',
            'A written playbook another person could run',
            'Forecast accuracy within 20% for one period'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Qualified conversations/week', method: 'The leading indicator. Everything else lags it.' },
      { name: 'Stage conversion', method: 'Contact → meeting → proposal → close, tracked separately.' },
      { name: 'Talk-time share', method: 'From call recordings. Under 40% in discovery.' },
      { name: 'Average deal size and cycle', method: 'Two numbers you should be able to state from memory.' }
    ],
    failureModes: [
      { name: 'Pitching before diagnosing', fix: 'No solution talk until pain, cost and owner are on the table.' },
      { name: 'Happy ears', fix: 'Score every deal against written qualification criteria, not enthusiasm.' },
      { name: 'Prospecting only when desperate', fix: 'Fixed daily prospecting block, ring-fenced regardless of pipeline state.' },
      { name: 'Discounting to close', fix: 'Trade concessions for scope, terms or timing — never give price away free.' }
    ],
    arena: [
      'A real quota, or a freelance offer you must fill',
      'Recorded calls — the tape is the coach',
      'Weekly deal review with someone who will tell you the truth'
    ],
    library: [
      { title: 'SPIN Selling', author: 'Neil Rackham', note: 'The research-backed basis for consultative discovery.' },
      { title: 'The Challenger Sale', author: 'Dixon & Adamson', note: 'Teaching-led selling in complex B2B.' },
      { title: '$100M Offers', author: 'Alex Hormozi', note: 'Offer construction and value stacking.' },
      { title: 'Fanatical Prospecting', author: 'Jeb Blount', note: 'The unglamorous volume discipline nobody wants to hear.' }
    ]
  },

  /* ------------------------------------------------------------ ENGINEERING */
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    discipline: 'Building',
    tagline: 'Build things that run without you.',
    thesis:
      'Software is the cheapest leverage ever invented: near-zero marginal cost, global distribution, and the ability to encode your judgment into a system that works while you sleep. Even at moderate skill it converts directly into employment, freelance income, or your own product.',
    hours: { functional: 150, competent: 600, professional: 2000, elite: 6000 },
    proofs: {
      functional: 'Ship a working full-stack application other people can use.',
      competent: 'Employable: build, test, deploy and maintain production software.',
      professional: 'Own systems at scale; make architectural decisions others depend on.',
      elite: 'Design systems and set technical direction across an organisation.'
    },
    entryCheck: ['A computer and an internet connection', 'Tolerance for being stuck for hours'],
    pillars: [
      {
        id: 'fundamentals',
        name: 'Language & Fundamentals',
        weight: 0.2,
        specialization: 'Programming fundamentals',
        objective: 'Fluency in one language and the machine underneath.',
        competencies: [
          'One language to real depth — idioms, standard library, tooling',
          'Data structures and complexity as a practical instinct',
          'Debugging as a systematic method, not guessing',
          'Reading other people’s code without fear'
        ],
        drills: [
          { name: 'Blank Page Reps', dose: '1 problem/day', protocol: 'Solve one problem from scratch daily, then rewrite your solution twice: once shorter, once faster. The rewrites are where the learning lives.' },
          { name: 'Source Reading', dose: '30 min/session', protocol: 'Read a real open-source file end to end. Write three sentences on why it is built that way.' },
          { name: 'Bug Hunt', dose: '2 bugs', protocol: 'Reproduce, isolate by bisection, form a hypothesis, test it, fix, then write the regression test. Never fix a bug you cannot explain.' }
        ],
        milestone: {
          name: 'The Fluency Gate',
          criteria: [
            'Build a 500-line program without copying structure from a tutorial',
            'Debug an unfamiliar codebase’s failure using only tooling and reasoning',
            'Explain time and space cost of your own code'
          ]
        }
      },
      {
        id: 'shipping',
        name: 'Shipping End-to-End',
        weight: 0.24,
        specialization: 'Full-stack delivery',
        objective: 'Take an idea to a URL other humans use.',
        competencies: [
          'Full request lifecycle: client, server, data store',
          'Version control workflow and code review',
          'Deployment, environments, configuration and secrets',
          'Observability: logs, errors, and knowing when you are broken'
        ],
        drills: [
          { name: 'Weekend Ship', dose: '1 project/2 weeks', protocol: 'Scope something you can deploy in two weekends. Deploy it publicly. Unshipped projects teach a fraction as much.' },
          { name: 'Clone & Extend', dose: '1 clone', protocol: 'Rebuild a small product you use, then add one feature it lacks. Constraints of a known spec sharpen the work.' },
          { name: 'Break It Deliberately', dose: '3 failures', protocol: 'Kill the database, expire the token, fill the disk. Fix each. Production competence is mostly failure familiarity.' }
        ],
        milestone: {
          name: 'The Shipping Gate',
          criteria: [
            'A deployed application with real users other than you',
            'Continuous deployment from a git push',
            'You were paged by your own monitoring before a user complained'
          ]
        }
      },
      {
        id: 'quality',
        name: 'Correctness & Craft',
        weight: 0.2,
        specialization: 'Code quality & testing',
        objective: 'Write code that a stranger can change safely a year later.',
        competencies: [
          'Testing strategy: unit, integration, end-to-end and what each is for',
          'Refactoring under test; naming as design',
          'Code review, both giving and receiving',
          'Types, invariants and making illegal states unrepresentable'
        ],
        drills: [
          { name: 'Test-First Reps', dose: '3 features', protocol: 'Write the failing test before the implementation for three features. Notice what it does to your design.' },
          { name: 'Refactor Kata', dose: '1/week', protocol: 'Take an ugly function, cover it with tests, then improve it in small verified steps without changing behaviour.' },
          { name: 'Review Reps', dose: '3 reviews/week', protocol: 'Review other people’s pull requests. Reading critically is the fastest way to develop taste.' }
        ],
        milestone: {
          name: 'The Craft Gate',
          criteria: [
            'A codebase you can change confidently after 60 days away',
            'Test suite that catches a regression you deliberately introduce',
            'A code review of yours changed someone’s design for the better'
          ]
        }
      },
      {
        id: 'systems',
        name: 'Systems & Architecture',
        weight: 0.2,
        specialization: 'Systems design',
        objective: 'Design for scale, failure and change.',
        competencies: [
          'Data modelling and storage choice under real constraints',
          'Concurrency, queues, caching and idempotency',
          'Failure modes, retries, timeouts and backpressure',
          'Trade-off reasoning and written design documents'
        ],
        drills: [
          { name: 'Design Doc', dose: '1/month', protocol: 'Write a design for a system you would build: requirements, options, trade-offs, chosen approach, failure modes. Have an engineer tear it apart.' },
          { name: 'Load Reality Check', dose: '1 test', protocol: 'Load-test something you built until it breaks. Predict the break point first, then compare.' },
          { name: 'Incident Study', dose: '2/month', protocol: 'Read published post-mortems from large engineering organisations. Write what you would have instrumented differently.' }
        ],
        milestone: {
          name: 'The Architecture Gate',
          criteria: [
            'A written design document that survived senior review',
            'A system of yours that survived 10x its expected load, or degraded gracefully',
            'Can explain your storage choice with numbers, not preference'
          ]
        }
      },
      {
        id: 'leverage',
        name: 'Professional Leverage',
        weight: 0.16,
        specialization: 'Engineering impact',
        objective: 'Convert engineering into career and business outcomes.',
        competencies: [
          'Scoping and estimation you can defend',
          'Working with product and non-engineers',
          'Choosing high-impact work over interesting work',
          'Public artefacts: open source, writing, portfolio'
        ],
        drills: [
          { name: 'Impact Ledger', dose: 'weekly', protocol: 'Record each week’s work with its measurable outcome. Most engineers cannot answer "what did you make better" — this fixes that.' },
          { name: 'Estimate & Compare', dose: 'every task', protocol: 'Estimate before starting, record actual, compute your personal error factor. It converges with practice.' },
          { name: 'Public Artefact', dose: '1/month', protocol: 'Publish a library, a technical write-up or a contribution. Visible work compounds into opportunity.' }
        ],
        milestone: {
          name: 'The Impact Gate',
          criteria: [
            'A shipped change with a measured business or user metric attached',
            'Estimation error factor under 2x across ten tasks',
            'One inbound opportunity traceable to public work'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Ship count', method: 'Things deployed and used per month.' },
      { name: 'Estimation error', method: 'Actual / estimated, tracked per task.' },
      { name: 'Unassisted build ratio', method: 'Share of work done without copying a solution wholesale.' },
      { name: 'Review throughput', method: 'PRs reviewed per week — the taste-building metric.' }
    ],
    failureModes: [
      { name: 'Tutorial loop', fix: 'Cap tutorials at 25% of session time. Build from a blank file the rest.' },
      { name: 'Never deploying', fix: 'Deploy on day one, before features exist. Then deploy every session.' },
      { name: 'Framework churn', fix: 'One stack for the whole program. Novelty is procrastination in disguise.' },
      { name: 'No feedback from stronger engineers', fix: 'Get code reviewed weekly by someone better — open source, a mentor, a community.' }
    ],
    arena: [
      'Users who complain when it breaks',
      'Code review by engineers stronger than you',
      'Open-source contribution to a project with maintainers who push back',
      'Production on-call'
    ],
    library: [
      { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', note: 'Working habits of durable engineers.' },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', note: 'The systems text worth reading twice.' },
      { title: 'A Philosophy of Software Design', author: 'John Ousterhout', note: 'Complexity as the central problem.' },
      { title: 'Refactoring', author: 'Martin Fowler', note: 'Changing code safely, as a discipline.' }
    ]
  },

  /* ------------------------------------------------------------- APPLIED AI */
  {
    id: 'applied-ai',
    name: 'Applied AI Leverage',
    discipline: 'Building',
    tagline: 'Do the work of a team by building systems that think.',
    thesis:
      'The gap between people who can direct AI systems and people who cannot is becoming the widest productivity gap in the labour market. This is not prompt trivia — it is evaluation, orchestration, and knowing which problems are actually tractable.',
    hours: { functional: 40, competent: 180, professional: 600, elite: 2000 },
    proofs: {
      functional: 'Automate a recurring task end-to-end and trust the output.',
      competent: 'Build evaluated AI features or internal tools that hold up in daily use.',
      professional: 'Design production AI systems with measured quality and cost control.',
      elite: 'Set AI strategy and architecture others build against.'
    },
    entryCheck: ['Basic scripting ability helps but is not required for the first pillar', 'Access to a frontier model API or interface'],
    pillars: [
      {
        id: 'direction',
        name: 'Directing Models',
        weight: 0.2,
        specialization: 'Personal AI leverage',
        objective: 'Get reliably excellent output instead of plausible mush.',
        competencies: [
          'Specification: context, role, constraints, examples, output contract',
          'Decomposition of large tasks into verifiable steps',
          'Knowing model failure modes and where verification is mandatory',
          'Judging output quality in domains you know'
        ],
        drills: [
          { name: 'Spec Rewrite', dose: '5 tasks', protocol: 'Take five vague requests and rewrite each as a full specification with success criteria. Compare output quality against the vague version.' },
          { name: 'Adversarial Check', dose: 'every output', protocol: 'For any output you will act on, ask for the strongest case against it, then verify one factual claim independently.' },
          { name: 'Task Decomposition', dose: '3 workflows', protocol: 'Break a large task into steps where each step’s output can be checked before the next runs.' }
        ],
        milestone: {
          name: 'The Direction Gate',
          criteria: [
            'A recurring task where AI output is used unedited and holds up',
            'You can predict where a model will fail on your task before it does',
            'Documented specifications reused across sessions'
          ]
        }
      },
      {
        id: 'automation',
        name: 'Workflow Automation',
        weight: 0.22,
        specialization: 'Automation of real work',
        objective: 'Remove recurring work from your week permanently.',
        competencies: [
          'Identifying automatable work by frequency × duration × error tolerance',
          'Connecting tools: APIs, scripts, schedulers, webhooks',
          'Human-in-the-loop checkpoints and failure handling',
          'Measuring hours reclaimed'
        ],
        drills: [
          { name: 'Time Audit', dose: '1 week', protocol: 'Log every recurring task for a week with frequency and duration. Rank by annual hours. Automate from the top.' },
          { name: 'One Pipeline', dose: '1/week', protocol: 'Build one end-to-end automation per week during the build phase. Small and finished beats large and theoretical.' },
          { name: 'Failure Injection', dose: 'per pipeline', protocol: 'Feed each automation bad input deliberately. Decide what it should do: stop, retry, or escalate to a human.' }
        ],
        milestone: {
          name: 'The Automation Gate',
          criteria: [
            'Five or more hours per week reclaimed, measured against the audit',
            'At least one automation running unattended for 30 days',
            'Every pipeline has a defined behaviour on failure'
          ]
        }
      },
      {
        id: 'building',
        name: 'Building AI Systems',
        weight: 0.24,
        specialization: 'AI application engineering',
        objective: 'Ship applications where a model is a component, not a demo.',
        competencies: [
          'Retrieval and context construction over your own data',
          'Tool use and multi-step agent design',
          'Structured output, validation and schema enforcement',
          'Latency, cost and model selection trade-offs'
        ],
        drills: [
          { name: 'Retrieval Build', dose: '1 system', protocol: 'Build retrieval over a corpus you know well, so you can personally judge answer quality. Measure it against a hand-written answer key.' },
          { name: 'Structured Output', dose: '3 endpoints', protocol: 'Force schema-valid output and handle every violation explicitly. Reliability comes from the contract, not from asking nicely.' },
          { name: 'Cost/Latency Sweep', dose: '1 comparison', protocol: 'Run the same task across model sizes. Chart quality, cost and latency. Choose deliberately.' }
        ],
        milestone: {
          name: 'The Build Gate',
          criteria: [
            'A deployed AI feature used by people other than you',
            'Structured outputs validated with explicit failure handling',
            'Cost per task known and controlled'
          ]
        }
      },
      {
        id: 'evaluation',
        name: 'Evaluation & Reliability',
        weight: 0.2,
        specialization: 'Evaluation & quality',
        objective: 'Know whether your system is actually good — with evidence.',
        competencies: [
          'Building evaluation sets from real failures',
          'Automated grading and its limits',
          'Regression testing prompts and pipelines as they change',
          'Monitoring quality drift in production'
        ],
        drills: [
          { name: 'Failure Harvest', dose: '20 cases', protocol: 'Collect twenty real failures and turn each into a test case with an expected outcome. This set is your most valuable asset.' },
          { name: 'Blind Comparison', dose: '2 versions', protocol: 'Compare two versions blind on the same inputs and score them. Intuition about model quality is unreliable.' },
          { name: 'Drift Watch', dose: 'weekly', protocol: 'Re-run the eval set weekly. Note any change after model, prompt or data updates.' }
        ],
        milestone: {
          name: 'The Evaluation Gate',
          criteria: [
            'An eval set of 20+ real cases run automatically',
            'A change rejected because evaluation showed regression',
            'Quality tracked over time, not asserted'
          ]
        }
      },
      {
        id: 'judgment',
        name: 'Judgment & Boundaries',
        weight: 0.14,
        specialization: 'AI strategy & judgment',
        objective: 'Know what to build, what to refuse, and what to verify.',
        competencies: [
          'Problem selection: where models genuinely beat the alternative',
          'Risk, privacy and data handling',
          'Keeping human accountability for consequential decisions',
          'Communicating capability honestly to non-technical stakeholders'
        ],
        drills: [
          { name: 'Build/Buy/Skip', dose: '5 ideas', protocol: 'For five candidate projects, decide build, buy or skip with a written reason. Most should be skip.' },
          { name: 'Risk Pass', dose: 'per project', protocol: 'Write what happens when the system is confidently wrong, and who is accountable.' },
          { name: 'Honest Demo', dose: '1 demo', protocol: 'Demo a system while showing its failure cases. It builds far more trust than a curated demo.' }
        ],
        milestone: {
          name: 'The Judgment Gate',
          criteria: [
            'Declined a project with a written technical reason',
            'A documented risk assessment for a live system',
            'A stakeholder correctly understands what your system cannot do'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Hours reclaimed/week', method: 'Measured against your original time audit.' },
      { name: 'Eval pass rate', method: 'Score on your own test set, tracked per version.' },
      { name: 'Cost per task', method: 'Currency per completed unit of work.' },
      { name: 'Unattended uptime', method: 'Days an automation ran without intervention.' }
    ],
    failureModes: [
      { name: 'Demo-driven development', fix: 'Nothing counts until someone other than you depends on it daily.' },
      { name: 'No evaluation', fix: 'Build the eval set before the second iteration of any prompt or pipeline.' },
      { name: 'Trusting output in domains you cannot judge', fix: 'Verify independently, or do not act on it.' },
      { name: 'Chasing every new tool', fix: 'Fix your stack for the program duration; evaluate new tools in a scheduled monthly slot.' }
    ],
    arena: [
      'Your own recurring work — the honest first customer',
      'Internal users at work who will complain immediately when it is wrong',
      'Publishing tools others use and file issues against'
    ],
    library: [
      { title: 'Anthropic and OpenAI engineering documentation', author: 'Primary sources', note: 'Read the actual docs, not the summaries of them.' },
      { title: 'Designing Machine Learning Systems', author: 'Chip Huyen', note: 'Production ML system thinking that transfers directly.' },
      { title: 'AI Engineering', author: 'Chip Huyen', note: 'Practical scaffolding for foundation-model applications.' },
      { title: 'The Mythical Man-Month', author: 'Frederick Brooks', note: 'Why software estimates fail — unchanged by automation.' }
    ]
  },

  /* --------------------------------------------------- PRODUCT/DISTRIBUTION */
  {
    id: 'product-distribution',
    name: 'Product & Distribution',
    discipline: 'Building',
    tagline: 'Build something people want, and get it in front of them.',
    thesis:
      'Ownership is what separates high income from wealth. Building a product is half the game; distribution is the half that kills most attempts. Trained together, they are the most direct route to income that does not stop when you do.',
    hours: { functional: 80, competent: 350, professional: 1200, elite: 4000 },
    proofs: {
      functional: 'Ship a product and get the first ten users or paying customers.',
      competent: 'A product with real retention and a repeatable acquisition channel.',
      professional: 'Meaningful recurring revenue from a system you own.',
      elite: 'A durable business with a defensible position.'
    },
    entryCheck: ['Ability to build or assemble something, or budget to have it built', 'Access to a group of people with a shared problem'],
    pillars: [
      {
        id: 'problem',
        name: 'Problem Selection',
        weight: 0.22,
        specialization: 'Customer discovery',
        objective: 'Choose a problem worth years of your life.',
        competencies: [
          'Customer interviews without leading the witness',
          'Distinguishing stated preference from revealed behaviour',
          'Market sizing and willingness to pay',
          'Founder-market fit: unfair advantages you actually hold'
        ],
        drills: [
          { name: 'Twenty Interviews', dose: '20 conversations', protocol: 'Interview twenty people about their existing behaviour, never about your idea. Ask what they did last time, not what they would do.' },
          { name: 'Pre-Sale Test', dose: '5 asks', protocol: 'Ask five people to pay before it exists. Money is the only reliable signal; enthusiasm is not.' },
          { name: 'Existing Spend Audit', dose: '1 map', protocol: 'Map what your market already pays for to solve this badly. Budget that already exists is easier to redirect than to create.' }
        ],
        milestone: {
          name: 'The Problem Gate',
          criteria: [
            'Twenty interviews completed with notes on behaviour, not opinions',
            'At least three people attempted to pay before launch',
            'You can state who has this problem, how often, and what it costs them'
          ]
        }
      },
      {
        id: 'build',
        name: 'Building the Minimum Thing',
        weight: 0.2,
        specialization: 'MVP delivery',
        objective: 'Get to the smallest thing that delivers the outcome.',
        competencies: [
          'Scope discipline: the one job the product must do',
          'Manual-first delivery before automation',
          'Fast iteration cycles and instrumented usage',
          'Knowing when to build vs assemble vs do it by hand'
        ],
        drills: [
          { name: 'Two-Week Cap', dose: 'per version', protocol: 'Nothing gets more than two weeks before real users touch it. Extend only against evidence.' },
          { name: 'Concierge Version', dose: '1 round', protocol: 'Deliver the outcome manually for the first five customers. You learn the real workflow before encoding the wrong one.' },
          { name: 'Instrument First', dose: 'every feature', protocol: 'Add the measurement before the feature. Unmeasured features cannot teach you anything.' }
        ],
        milestone: {
          name: 'The Launch Gate',
          criteria: [
            'A live product delivering the core outcome',
            'Usage instrumented end-to-end',
            'Ten users who came from outside your friend group'
          ]
        }
      },
      {
        id: 'distribution',
        name: 'Distribution',
        weight: 0.26,
        specialization: 'Growth channels',
        objective: 'Own one channel that reliably produces customers.',
        competencies: [
          'Channel selection matched to buyer behaviour',
          'Content, community, outbound, paid, partnership — mechanics of each',
          'Landing page and conversion fundamentals',
          'Unit economics: CAC, payback and margin'
        ],
        drills: [
          { name: 'One Channel, Ninety Days', dose: 'daily', protocol: 'Pick one channel and work it daily for ninety days before judging. Channel-hopping is why most products die unheard of.' },
          { name: 'Landing Page Iteration', dose: 'weekly', protocol: 'Change one element per week — headline, proof, call to action — and measure conversion.' },
          { name: 'CAC Math', dose: 'monthly', protocol: 'Compute what a customer costs and what they are worth. If you cannot, you are not running a business yet.' }
        ],
        milestone: {
          name: 'The Distribution Gate',
          criteria: [
            'A channel producing customers repeatably for eight consecutive weeks',
            'Known CAC and payback period',
            'Landing page conversion measured and improved from baseline'
          ]
        }
      },
      {
        id: 'retention',
        name: 'Retention & Economics',
        weight: 0.18,
        specialization: 'Retention & monetisation',
        objective: 'Keep the customers you win and make them worth more.',
        competencies: [
          'Cohort retention analysis and the flattening curve',
          'Activation: the first-session experience that predicts survival',
          'Pricing, packaging and expansion revenue',
          'Churn diagnosis by conversation, not speculation'
        ],
        drills: [
          { name: 'Cohort Chart', dose: 'monthly', protocol: 'Chart retention by signup cohort. A curve that never flattens means no product-market fit yet, whatever revenue says.' },
          { name: 'Churn Interviews', dose: '5/month', protocol: 'Talk to five churned customers. The pattern is usually visible within five conversations.' },
          { name: 'Price Test', dose: '1/quarter', protocol: 'Raise price for new customers by 20% and watch conversion. Most founders are underpriced and afraid to test it.' }
        ],
        milestone: {
          name: 'The Retention Gate',
          criteria: [
            'A retention curve that flattens above zero',
            'Activation moment identified with data',
            'One successful price increase'
          ]
        }
      },
      {
        id: 'ownership',
        name: 'Ownership & Compounding',
        weight: 0.14,
        specialization: 'Business systems',
        objective: 'Turn a project into an asset.',
        competencies: [
          'Operating cadence: weekly metrics, monthly review',
          'Delegation and standard operating procedures',
          'Moats: brand, data, switching costs, distribution',
          'Cash management and runway discipline'
        ],
        drills: [
          { name: 'One Metric Weekly', dose: 'weekly', protocol: 'Choose the single number that best represents progress. Review it every week without exception.' },
          { name: 'SOP Writing', dose: '1/month', protocol: 'Document one recurring task well enough to hand off. This is how a job becomes a business.' },
          { name: 'Moat Audit', dose: 'quarterly', protocol: 'Write what stops a competent competitor copying you in ninety days. If nothing, that is the roadmap.' }
        ],
        milestone: {
          name: 'The Asset Gate',
          criteria: [
            'Revenue that continues through a week you are absent',
            'Three documented processes someone else could run',
            'A written, evidenced answer to why customers stay'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Customer conversations/week', method: 'The founder metric that predicts everything else.' },
      { name: 'Weekly active users / paying customers', method: 'One number, reviewed weekly.' },
      { name: 'Cohort retention', method: 'Percentage still active at 30, 60, 90 days.' },
      { name: 'CAC payback', method: 'Months to recover acquisition cost.' }
    ],
    failureModes: [
      { name: 'Building before talking', fix: 'Twenty interviews before a line of code. No exceptions.' },
      { name: 'Channel hopping', fix: 'Ninety days per channel, minimum, with a written decision at the end.' },
      { name: 'Vanity metrics', fix: 'Track only numbers that would change a decision.' },
      { name: 'Avoiding the ask', fix: 'Charge from the first customer. Free users teach you the wrong lessons.' }
    ],
    arena: [
      'Paying customers — the only honest judge',
      'A public launch with a date you announced',
      'A peer group of founders who ask about numbers, not vibes'
    ],
    library: [
      { title: 'The Mom Test', author: 'Rob Fitzpatrick', note: 'How to interview customers without fooling yourself.' },
      { title: 'Traction', author: 'Weinberg & Mares', note: 'A systematic method for choosing a channel.' },
      { title: 'Obviously Awesome', author: 'April Dunford', note: 'Positioning as a deliberate act.' },
      { title: 'The Lean Startup', author: 'Eric Ries', note: 'Iteration discipline; read critically, not religiously.' }
    ]
  },

  /* --------------------------------------------------------------- CAPITAL */
  {
    id: 'capital-allocation',
    name: 'Capital Allocation & Investing',
    discipline: 'Capital',
    tagline: 'Make money work harder than you do.',
    thesis:
      'Income buys your present; allocation buys your future. The difference between two people with identical earnings over thirty years is almost entirely explained by allocation decisions and behaviour during drawdowns. This is a skill of temperament as much as analysis.',
    hours: { functional: 30, competent: 150, professional: 600, elite: 2500 },
    proofs: {
      functional: 'A written policy, automated contributions, and a portfolio you understand.',
      competent: 'Analyse a security or asset independently; hold a plan through a drawdown.',
      professional: 'Manage capital to a mandate with documented process and risk control.',
      elite: 'A durable, evidenced edge across market cycles.'
    },
    entryCheck: ['Positive cash flow, however small', 'Emergency buffer before market risk'],
    pillars: [
      {
        id: 'foundation',
        name: 'Personal Financial Base',
        weight: 0.18,
        specialization: 'Personal finance',
        objective: 'Build the base that makes investing survivable.',
        competencies: [
          'Cash-flow control and savings rate as the dominant variable',
          'Emergency reserve, insurance and tail-risk cover',
          'Debt hierarchy and cost of capital',
          'Tax-advantaged accounts and jurisdictional basics'
        ],
        drills: [
          { name: 'Savings Rate Calculation', dose: 'monthly', protocol: 'Compute savings as a share of net income each month. It predicts long-run outcome better than returns.' },
          { name: 'Net Worth Statement', dose: 'monthly', protocol: 'One page: assets, liabilities, net change, and why it changed. Twelve months of these is a genuine education.' },
          { name: 'Cost Audit', dose: 'quarterly', protocol: 'List every fee you pay on capital — fund fees, spreads, advice, tax drag. Fees compound against you exactly as returns compound for you.' }
        ],
        milestone: {
          name: 'The Base Gate',
          criteria: [
            'Emergency reserve funded to a defined number of months',
            'Savings rate measured for three consecutive months',
            'All investment costs known as an annual percentage'
          ]
        }
      },
      {
        id: 'theory',
        name: 'Market Fundamentals',
        weight: 0.22,
        specialization: 'Market literacy',
        objective: 'Understand what you are actually buying.',
        competencies: [
          'Asset classes, risk premia and the sources of return',
          'Compounding, volatility drag and sequence risk',
          'Diversification and correlation under stress',
          'Market efficiency: where edge can and cannot exist'
        ],
        drills: [
          { name: 'Return Decomposition', dose: '3 assets', protocol: 'For three holdings, write where the return comes from: earnings growth, multiple change, yield, or speculation. If it is only the last, say so.' },
          { name: 'Drawdown History', dose: '5 events', protocol: 'Study five historical drawdowns. Write what you would have done, then what the evidence says most people did.' },
          { name: 'Compounding Maths', dose: 'by hand', protocol: 'Compute outcomes at varying rates, fees and durations manually. Feeling the fee difference in your own arithmetic changes behaviour.' }
        ],
        milestone: {
          name: 'The Literacy Gate',
          criteria: [
            'Can explain every holding’s source of return in one sentence',
            'Understands the arithmetic of drawdown recovery',
            'Can state your portfolio’s behaviour in a 40% market decline'
          ]
        }
      },
      {
        id: 'policy',
        name: 'Policy & Portfolio Construction',
        weight: 0.24,
        specialization: 'Portfolio policy',
        objective: 'Decide once, in writing, while calm.',
        competencies: [
          'Investment policy statement: objectives, constraints, rules',
          'Allocation, rebalancing bands and contribution automation',
          'Position sizing and risk budgeting',
          'Pre-commitment against your own behaviour'
        ],
        drills: [
          { name: 'Write the IPS', dose: '1 document', protocol: 'Two pages: goals, horizon, allocation, rebalancing rule, what you will do in a 30% decline, and what would make you change the plan.' },
          { name: 'Automation Setup', dose: 'once', protocol: 'Automate contributions so the decision is made once rather than monthly under emotional load.' },
          { name: 'Pre-Mortem', dose: 'annually', protocol: 'Write how this portfolio fails. Then write the rule that protects against each path.' }
        ],
        milestone: {
          name: 'The Policy Gate',
          criteria: [
            'A written policy statement, dated and signed by you',
            'Contributions automated',
            'A rebalancing rule executed at least once mechanically'
          ]
        }
      },
      {
        id: 'analysis',
        name: 'Analysis & Selection',
        weight: 0.2,
        specialization: 'Security analysis',
        objective: 'Judge an individual opportunity on evidence.',
        competencies: [
          'Reading financial statements and cash-flow quality',
          'Valuation methods and their assumptions',
          'Business quality: moat, capital intensity, management incentives',
          'Written thesis with falsifiable conditions'
        ],
        drills: [
          { name: 'One-Page Thesis', dose: '1/month', protocol: 'For any position: what it is, why mispriced, what must be true, what would prove you wrong, and the price at which you would sell.' },
          { name: 'Statement Reading', dose: '1 report/week', protocol: 'Read one annual report properly. Start with the cash-flow statement and the footnotes, not the narrative.' },
          { name: 'Paper Position', dose: 'ongoing', protocol: 'Record hypothetical positions with a dated thesis before committing capital. Review at six months against what you wrote.' }
        ],
        milestone: {
          name: 'The Analysis Gate',
          criteria: [
            'Five written theses with falsification conditions',
            'One thesis proven wrong and closed by your own rule',
            'Can read a cash-flow statement without assistance'
          ]
        }
      },
      {
        id: 'behaviour',
        name: 'Behaviour & Risk',
        weight: 0.16,
        specialization: 'Investor behaviour',
        objective: 'Survive yourself — the actual job.',
        competencies: [
          'Decision journalling and calibration',
          'Recognising your own bias signatures under stress',
          'Position and portfolio risk limits',
          'Ruin avoidance: leverage, concentration, illiquidity'
        ],
        drills: [
          { name: 'Decision Journal', dose: 'every decision', protocol: 'Before acting: what you expect, why, and your confidence. Review quarterly. This is the only reliable way to know if you have skill or luck.' },
          { name: 'Drawdown Rehearsal', dose: 'quarterly', protocol: 'Write what you will do at −20%, −30%, −40%. Read it during the next decline instead of improvising.' },
          { name: 'Ruin Check', dose: 'quarterly', protocol: 'List every path to permanent capital loss. Remove or bound each.' }
        ],
        milestone: {
          name: 'The Temperament Gate',
          criteria: [
            'A decision journal with twelve entries reviewed for calibration',
            'Held the written plan through one real decline',
            'No position capable of causing permanent ruin'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Savings rate', method: 'Saved / net income, monthly.' },
      { name: 'Total cost drag', method: 'All-in annual percentage cost of your portfolio.' },
      { name: 'Calibration', method: 'From the decision journal: how often were you right at each confidence level.' },
      { name: 'Plan adherence', method: 'Actions taken outside written policy. Target zero.' }
    ],
    failureModes: [
      { name: 'Learning by losing money fast', fix: 'Paper theses with dated reviews before size. Slow the capital, not the learning.' },
      { name: 'Confusing a bull market with skill', fix: 'Benchmark honestly and journal every decision.' },
      { name: 'Complexity worship', fix: 'A boring diversified portfolio beats most sophistication. Justify every added complication in writing.' },
      { name: 'No written plan', fix: 'The IPS is the first deliverable, not the last.' }
    ],
    arena: [
      'Real capital at a size where mistakes teach but do not maim',
      'A written journal reviewed quarterly',
      'A peer or mentor who will challenge a thesis rather than admire it'
    ],
    library: [
      { title: 'The Psychology of Money', author: 'Morgan Housel', note: 'Behaviour as the dominant variable.' },
      { title: 'A Random Walk Down Wall Street', author: 'Burton Malkiel', note: 'The efficiency baseline every claim of edge must beat.' },
      { title: 'The Intelligent Investor', author: 'Benjamin Graham', note: 'Chapters 8 and 20 in particular.' },
      { title: 'Thinking in Bets', author: 'Annie Duke', note: 'Decision quality separated from outcome quality.' }
    ],
    disclaimer: 'Educational training only. Nothing here is financial advice, and no allocation is suitable for everyone. Consider a licensed adviser for decisions specific to your circumstances.'
  },

  /* ------------------------------------------------------------- LEADERSHIP */
  {
    id: 'leadership',
    name: 'Leadership & Management',
    discipline: 'People',
    tagline: 'Multiply your output through other people.',
    thesis:
      'There is a hard ceiling on what one person can produce. Leadership is the only skill that removes it. It is also the most common career bottleneck: excellent individual performers stall because managing people is a distinct discipline nobody trained them in.',
    hours: { functional: 60, competent: 250, professional: 900, elite: 3000 },
    proofs: {
      functional: 'Run effective one-to-ones and give feedback that changes behaviour.',
      competent: 'Lead a team that hits its commitments with low regretted attrition.',
      professional: 'Build teams, hire well, and set direction others execute against.',
      elite: 'Develop leaders; run an organisation through change.'
    },
    entryCheck: ['Responsibility for at least one other person’s work, formally or informally'],
    pillars: [
      {
        id: 'oneonone',
        name: 'Individual Effectiveness',
        weight: 0.22,
        specialization: 'Managing individuals',
        objective: 'Make each person measurably better for having worked with you.',
        competencies: [
          'One-to-ones that surface truth, not status updates',
          'Feedback: specific, timely, behavioural, and actually delivered',
          'Motivation: understanding each person’s actual drivers',
          'Coaching versus directing — and when each is right'
        ],
        drills: [
          { name: 'Their Agenda', dose: 'every 1:1', protocol: 'The direct report owns the agenda. You ask questions and take notes. Status belongs in writing, not in this meeting.' },
          { name: 'Feedback Within 48 Hours', dose: '2/week', protocol: 'Deliver two pieces of specific feedback per week within 48 hours of the behaviour. Late feedback is decoration.' },
          { name: 'Driver Mapping', dose: 'per person', protocol: 'Write what each person actually wants — growth, security, autonomy, recognition, money — then verify it with them directly.' }
        ],
        milestone: {
          name: 'The Trust Gate',
          criteria: [
            'Team members raise problems before you discover them',
            'A piece of your feedback produced a visible behaviour change',
            'Each person can state their own growth priority'
          ]
        }
      },
      {
        id: 'performance',
        name: 'Standards & Performance',
        weight: 0.22,
        specialization: 'Performance management',
        objective: 'Set a bar and hold it without cruelty or avoidance.',
        competencies: [
          'Explicit expectations and definition of good work',
          'Handling underperformance early and humanely',
          'Recognition that reinforces the right behaviour',
          'Managing out when it is the correct call'
        ],
        drills: [
          { name: 'Write the Bar', dose: 'per role', protocol: 'Document what excellent, adequate and unacceptable look like for each role. Most performance problems are undocumented expectation problems.' },
          { name: 'The Hard Conversation', dose: 'as needed, never delayed', protocol: 'Script the first two sentences, deliver within a week of noticing, follow with written confirmation.' },
          { name: 'Recognition Specificity', dose: '3/week', protocol: 'Praise the specific behaviour and its effect, not the person’s character. Specific praise is instructional.' }
        ],
        milestone: {
          name: 'The Standards Gate',
          criteria: [
            'Written expectations for every role you manage',
            'One underperformance conversation handled early and directly',
            'No surprises in any formal review'
          ]
        }
      },
      {
        id: 'team',
        name: 'Team Design & Hiring',
        weight: 0.2,
        specialization: 'Hiring & team building',
        objective: 'Build the team rather than inherit the outcome.',
        competencies: [
          'Role definition before recruiting',
          'Structured interviews and evidence-based hiring',
          'Onboarding that produces contribution in 30 days',
          'Team composition, load and dependency design'
        ],
        drills: [
          { name: 'Scorecard First', dose: 'per hire', protocol: 'Write the outcomes the hire must produce in twelve months before writing the job advert.' },
          { name: 'Structured Interview', dose: 'per hire', protocol: 'Same questions, same order, independent scoring before discussion. Unstructured interviews mostly measure similarity to yourself.' },
          { name: 'Thirty-Day Plan', dose: 'per hire', protocol: 'Write what the new person will have shipped in thirty days, before day one.' }
        ],
        milestone: {
          name: 'The Hiring Gate',
          criteria: [
            'Three hires made against written scorecards',
            'Structured, independently scored interviews',
            'A new hire contributing meaningfully within 30 days'
          ]
        }
      },
      {
        id: 'direction',
        name: 'Direction & Alignment',
        weight: 0.2,
        specialization: 'Strategy execution',
        objective: 'Make sure effort points the same way.',
        competencies: [
          'Translating strategy into team-level priorities',
          'Goal setting with real trade-offs, not wish lists',
          'Operating cadence: planning, review, retrospective',
          'Communicating context so people can decide without you'
        ],
        drills: [
          { name: 'Three Priorities', dose: 'quarterly', protocol: 'Name the three things that matter this quarter and what you are explicitly not doing. Publish both lists.' },
          { name: 'Context Broadcast', dose: 'weekly', protocol: 'Write what you know that the team does not — constraints, reasons, upstream changes. Alignment failures are usually context failures.' },
          { name: 'Decision Log', dose: 'per decision', protocol: 'Record the decision, the reasoning and the alternatives rejected. It teaches the team how to decide.' }
        ],
        milestone: {
          name: 'The Alignment Gate',
          criteria: [
            'Every team member can state the quarter’s top three priorities',
            'A decision made correctly in your absence using published context',
            'A published not-doing list'
          ]
        }
      },
      {
        id: 'self',
        name: 'Leading Yourself',
        weight: 0.16,
        specialization: 'Leadership presence',
        objective: 'Be the stable point others calibrate against.',
        competencies: [
          'Emotional regulation under organisational pressure',
          'Delegation with genuine transfer of authority',
          'Calendar as strategy — where your time actually goes',
          'Seeking upward feedback and acting on it'
        ],
        drills: [
          { name: 'Calendar Audit', dose: 'monthly', protocol: 'Categorise last month’s hours against your stated priorities. The gap is your real strategy.' },
          { name: 'Delegate One Thing', dose: 'weekly', protocol: 'Hand over one task fully — outcome, authority, and the right to do it differently.' },
          { name: 'Upward Feedback', dose: 'quarterly', protocol: 'Ask each report for one thing you should stop doing. Then visibly stop one.' }
        ],
        milestone: {
          name: 'The Self-Leadership Gate',
          criteria: [
            'Calendar matches stated priorities within reason',
            'Three responsibilities fully delegated and running',
            'Acted visibly on upward feedback'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Regretted attrition', method: 'People you wanted to keep who left.' },
      { name: 'Commitment hit rate', method: 'Team commitments delivered as promised.' },
      { name: 'Feedback cadence', method: 'Specific feedback instances per week.' },
      { name: 'Bus factor', method: 'How much still works when you are away for two weeks.' }
    ],
    failureModes: [
      { name: 'Staying the best individual contributor', fix: 'Track output through others, not your own commits or decks.' },
      { name: 'Avoiding hard conversations', fix: 'A 48-hour rule, scripted openers, and written follow-up.' },
      { name: 'Delegating tasks but not authority', fix: 'Transfer the decision, not just the labour.' },
      { name: 'Managing by meeting', fix: 'Move status to writing; keep meetings for decisions and people.' }
    ],
    arena: [
      'A real team with real consequences',
      'Anonymous or structured upward feedback',
      'A peer manager group where you discuss cases honestly',
      'A mentor two levels above you'
    ],
    library: [
      { title: 'High Output Management', author: 'Andrew Grove', note: 'Still the most useful management book written.' },
      { title: 'The Making of a Manager', author: 'Julie Zhuo', note: 'Practical first-time management.' },
      { title: 'Radical Candor', author: 'Kim Scott', note: 'Care personally, challenge directly.' },
      { title: 'Who', author: 'Smart & Street', note: 'Structured hiring that beats intuition.' }
    ]
  },

  /* --------------------------------------------------------------- STRATEGY */
  {
    id: 'strategic-judgment',
    name: 'Strategic Judgment',
    discipline: 'Judgment',
    tagline: 'Make the small number of decisions that determine everything.',
    thesis:
      'Most of life’s outcome variance sits in a handful of decisions: what to work on, who to work with, what to say no to. Judgment is trainable through calibration, base rates and written reasoning — and it is the skill that makes every other skill point in the right direction.',
    hours: { functional: 40, competent: 180, professional: 600, elite: 2500 },
    proofs: {
      functional: 'Structure a hard decision and defend it in writing.',
      competent: 'Consistently well-calibrated forecasts; better decisions under uncertainty.',
      professional: 'Trusted with consequential decisions; can set direction under ambiguity.',
      elite: 'A track record of non-obvious calls that proved right.'
    },
    entryCheck: ['Decisions you actually own', 'Willingness to be scored wrong in writing'],
    pillars: [
      {
        id: 'framing',
        name: 'Problem Framing',
        weight: 0.22,
        specialization: 'Decision framing',
        objective: 'Solve the right problem before solving it well.',
        competencies: [
          'Separating decision from outcome',
          'Widening the option set beyond the offered two',
          'Identifying the actual constraint',
          'First-principles decomposition'
        ],
        drills: [
          { name: 'Option Widening', dose: 'every decision', protocol: 'For every either/or, generate three additional options, including "do nothing" and "do it later at lower cost".' },
          { name: 'Constraint Hunt', dose: 'per problem', protocol: 'Write what would have to change for this problem to disappear. That is the real target.' },
          { name: 'Reframe Reps', dose: '3 framings', protocol: 'State the same problem three different ways. The framing usually determines the answer.' }
        ],
        milestone: {
          name: 'The Framing Gate',
          criteria: [
            'Ten decisions documented with more than two options considered',
            'One decision materially improved by a reframe',
            'Can name the binding constraint in your current work'
          ]
        }
      },
      {
        id: 'evidence',
        name: 'Evidence & Base Rates',
        weight: 0.22,
        specialization: 'Probabilistic reasoning',
        objective: 'Reason from what usually happens, not what feels vivid.',
        competencies: [
          'Base-rate reasoning and reference classes',
          'Bayesian updating in practical terms',
          'Source quality and evidence hierarchies',
          'Quantifying uncertainty instead of hedging in words'
        ],
        drills: [
          { name: 'Reference Class', dose: 'per forecast', protocol: 'Before predicting, ask: what happened the last hundred times something like this was attempted?' },
          { name: 'Numbers Not Words', dose: 'daily', protocol: 'Replace "probably" and "unlikely" with explicit percentages in your notes and messages.' },
          { name: 'Update Log', dose: 'weekly', protocol: 'Record one belief that changed and the specific evidence that moved it. Beliefs that never update are not beliefs.' }
        ],
        milestone: {
          name: 'The Calibration Gate',
          criteria: [
            'Fifty forecasts with explicit probabilities, scored',
            'Calibration curve within 10% at each confidence band',
            'A documented significant belief change with its trigger'
          ]
        }
      },
      {
        id: 'strategy',
        name: 'Strategy & Positioning',
        weight: 0.22,
        specialization: 'Competitive strategy',
        objective: 'Choose where to compete and what to refuse.',
        competencies: [
          'Diagnosis, guiding policy, coherent action',
          'Competitive dynamics and asymmetric advantage',
          'Second-order effects and reflexivity',
          'Saying no as the core strategic act'
        ],
        drills: [
          { name: 'Strategy Kernel', dose: '1/month', protocol: 'Write your diagnosis in one paragraph, guiding policy in one sentence, and the three actions that follow. Most strategies fail at the diagnosis.' },
          { name: 'Second-Order Pass', dose: 'per decision', protocol: 'And then what? Three times. Most bad decisions are fine at the first order.' },
          { name: 'Not-Doing List', dose: 'monthly', protocol: 'Write what you are explicitly declining this month and what it buys you.' }
        ],
        milestone: {
          name: 'The Strategy Gate',
          criteria: [
            'A written strategy with a real diagnosis, not a goal list',
            'A significant opportunity declined for a stated strategic reason',
            'Second-order analysis that changed a decision'
          ]
        }
      },
      {
        id: 'risk',
        name: 'Risk & Asymmetry',
        weight: 0.18,
        specialization: 'Risk management',
        objective: 'Avoid ruin; take the bets worth taking.',
        competencies: [
          'Expected value versus survival — knowing which applies',
          'Convexity: capped downside, open upside',
          'Pre-mortems and failure imagination',
          'Reversibility as a decision criterion'
        ],
        drills: [
          { name: 'Pre-Mortem', dose: 'per major decision', protocol: 'Assume it failed badly. Write the story of how. Then remove the top two causes.' },
          { name: 'Reversibility Sort', dose: 'weekly', protocol: 'Sort decisions into reversible and irreversible. Make the reversible ones fast; slow down for the rest.' },
          { name: 'Asymmetry Hunt', dose: 'monthly', protocol: 'Find one bet with bounded downside and large upside. Take a small version of it.' }
        ],
        milestone: {
          name: 'The Risk Gate',
          criteria: [
            'Pre-mortems on the last three significant decisions',
            'No exposure that could end the game',
            'One asymmetric bet placed deliberately'
          ]
        }
      },
      {
        id: 'execution',
        name: 'Deciding & Committing',
        weight: 0.16,
        specialization: 'Decision execution',
        objective: 'Convert analysis into committed action.',
        competencies: [
          'Deadlines on decisions; avoiding analysis paralysis',
          'Deciding at 70% information',
          'Communicating decisions and their reasoning',
          'Reviewing decisions on process, not outcome'
        ],
        drills: [
          { name: 'Decision Deadline', dose: 'per decision', protocol: 'Every open decision gets a date. On that date you decide with what you have.' },
          { name: 'Decision Memo', dose: 'per significant call', protocol: 'One page: decision, reasoning, alternatives, what would change your mind, review date.' },
          { name: 'Process Review', dose: 'quarterly', protocol: 'Review past decisions on whether the reasoning was sound given what was knowable — not on how they turned out.' }
        ],
        milestone: {
          name: 'The Commitment Gate',
          criteria: [
            'No decision open past its deadline',
            'Ten decision memos with review dates',
            'A quarterly review judging process rather than outcome'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Calibration score', method: 'Forecast accuracy at each stated confidence band.' },
      { name: 'Decision latency', method: 'Days from problem recognition to decision.' },
      { name: 'Reversal rate', method: 'Decisions reversed within 90 days.' },
      { name: 'Declined opportunities', method: 'Deliberate strategic noes per quarter.' }
    ],
    failureModes: [
      { name: 'Outcome bias', fix: 'Review the reasoning against what was knowable at the time. Good decisions can lose.' },
      { name: 'Analysis paralysis', fix: 'Decision deadlines and a 70% information rule.' },
      { name: 'Never writing it down', fix: 'Unwritten reasoning cannot be reviewed, so it cannot improve.' },
      { name: 'Confusing goals with strategy', fix: 'No strategy without a written diagnosis of the actual obstacle.' }
    ],
    arena: [
      'Public forecasting with scoring',
      'Decisions with real consequences you own',
      'A thinking partner who argues rather than agrees',
      'A written decision journal reviewed quarterly'
    ],
    library: [
      { title: 'Good Strategy / Bad Strategy', author: 'Richard Rumelt', note: 'The diagnosis-policy-action kernel.' },
      { title: 'Superforecasting', author: 'Tetlock & Gardner', note: 'Calibration as a trainable skill.' },
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', note: 'The bias catalogue; read as a checklist.' },
      { title: 'Seeking Wisdom', author: 'Peter Bevelin', note: 'Multidisciplinary mental models, densely assembled.' }
    ]
  },

  /* -------------------------------------------------------------- LEARNING */
  {
    id: 'learning-velocity',
    name: 'Learning Velocity',
    discipline: 'Meta',
    tagline: 'The skill that shortens every future skill.',
    thesis:
      'In a world where the useful skill set turns over every few years, the rate at which you acquire competence matters more than any individual competence. Trained properly this is a multiplier on everything else you will ever attempt.',
    hours: { functional: 25, competent: 100, professional: 300, elite: 1000 },
    proofs: {
      functional: 'Take a new skill to useful competence on a deliberate plan.',
      competent: 'Reliably reach working competence in a new domain within weeks.',
      professional: 'Teach and design training for others; compress others’ learning curves.',
      elite: 'Build institutional learning systems.'
    },
    entryCheck: ['A real skill you need to acquire now — this discipline is trained on live material'],
    pillars: [
      {
        id: 'deconstruct',
        name: 'Deconstruction',
        weight: 0.22,
        specialization: 'Skill deconstruction',
        objective: 'Find the 20% of the skill that carries the outcome.',
        competencies: [
          'Breaking a skill into sub-skills with dependencies',
          'Identifying the minimum effective repertoire',
          'Finding the true prerequisite chain',
          'Interviewing practitioners for the hidden curriculum'
        ],
        drills: [
          { name: 'Skill Tree', dose: 'per new skill', protocol: 'Map sub-skills and their dependencies. Mark the three that produce most of the visible competence.' },
          { name: 'Practitioner Interview', dose: '3 people', protocol: 'Ask three competent practitioners what they wish they had trained first and what they wasted time on.' },
          { name: 'Curriculum Autopsy', dose: '2 courses', protocol: 'Compare two syllabi for the same skill. What is in both is likely core; what is in one is likely optional.' }
        ],
        milestone: {
          name: 'The Map Gate',
          criteria: [
            'A written skill tree with dependencies for your target skill',
            'Three practitioner interviews completed',
            'The critical 20% identified and defended'
          ]
        }
      },
      {
        id: 'practice',
        name: 'Deliberate Practice Design',
        weight: 0.24,
        specialization: 'Practice design',
        objective: 'Practise at the edge, not in the comfortable middle.',
        competencies: [
          'Designing drills that isolate one weakness',
          'Difficulty calibration — the productive failure rate',
          'Massed versus spaced and interleaved practice',
          'Immediate, specific feedback loops'
        ],
        drills: [
          { name: 'Isolate the Weakness', dose: 'weekly', protocol: 'Name your single biggest weakness this week and build a drill that hits only that. General practice reinforces what you already do.' },
          { name: 'Failure Rate Check', dose: 'per session', protocol: 'If you are succeeding above 85% of the time, increase difficulty. If below 50%, decrease it.' },
          { name: 'Feedback Shortening', dose: 'per skill', protocol: 'Find the fastest available signal of quality and move it earlier. Learning rate is roughly proportional to feedback speed.' }
        ],
        milestone: {
          name: 'The Practice Gate',
          criteria: [
            'Three custom drills built for your own specific weaknesses',
            'Success rate held in the 50–85% band',
            'Feedback loop under 24 hours'
          ]
        }
      },
      {
        id: 'retention',
        name: 'Encoding & Retention',
        weight: 0.2,
        specialization: 'Memory & retention',
        objective: 'Keep what you learn without re-learning it.',
        competencies: [
          'Active recall over review',
          'Spaced repetition for genuine facts',
          'Elaboration, generation and the testing effect',
          'Note systems built for retrieval, not collection'
        ],
        drills: [
          { name: 'Closed-Book Recall', dose: 'end of session', protocol: 'Write everything you remember with the material closed. Then check. This single habit outperforms rereading substantially.' },
          { name: 'Teach It Back', dose: 'weekly', protocol: 'Explain the week’s material to someone who does not know it, without notes. Confusion in their face marks your gaps.' },
          { name: 'Question Cards', dose: '5/session', protocol: 'Convert new material into questions, not summaries. Scheduled retrieval beats scheduled review.' }
        ],
        milestone: {
          name: 'The Retention Gate',
          criteria: [
            'Can reconstruct core material 30 days later, closed-book',
            'A working retrieval schedule',
            'Taught the material to another person successfully'
          ]
        }
      },
      {
        id: 'transfer',
        name: 'Transfer & Application',
        weight: 0.18,
        specialization: 'Applied transfer',
        objective: 'Convert knowledge into performance in real conditions.',
        competencies: [
          'Projects as the vehicle for consolidation',
          'Varying context to build flexible skill',
          'Working at the edge of your competence under real stakes',
          'Recognising the difference between knowing and doing'
        ],
        drills: [
          { name: 'Immediate Application', dose: 'every session', protocol: 'Apply new material to a real problem within 24 hours or it will decay unused.' },
          { name: 'Context Variation', dose: 'weekly', protocol: 'Use the skill in a different setting, tool or constraint from where you learned it.' },
          { name: 'Stakes Escalation', dose: 'monthly', protocol: 'Do it once where being wrong has a real cost. This is where knowledge converts to skill.' }
        ],
        milestone: {
          name: 'The Transfer Gate',
          criteria: [
            'A real deliverable produced using the new skill',
            'Performed successfully in a context different from where you trained',
            'One real-stakes application completed'
          ]
        }
      },
      {
        id: 'metacognition',
        name: 'Metacognition & Energy',
        weight: 0.16,
        specialization: 'Learning systems',
        objective: 'Manage the machine doing the learning.',
        competencies: [
          'Attention management and deep work blocks',
          'Sleep, exercise and their measured effect on consolidation',
          'Progress tracking and plateau diagnosis',
          'Knowing when to push, rest or change approach'
        ],
        drills: [
          { name: 'Session Log', dose: 'every session', protocol: 'Three lines: what you practised, what was hard, what you will change next session. This log is the training program improving itself.' },
          { name: 'Plateau Protocol', dose: 'when stuck 2 weeks', protocol: 'Change one variable: difficulty, feedback source, drill design or rest. Do not simply add hours.' },
          { name: 'Consolidation Guard', dose: 'nightly', protocol: 'Protect sleep on training days and track the correlation with next-day performance in your log.' }
        ],
        milestone: {
          name: 'The Self-Regulation Gate',
          criteria: [
            'Thirty session logs',
            'A plateau diagnosed and broken by changing a variable',
            'Can predict your own good and bad training days'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Time to first competence', method: 'Hours from zero to a working deliverable.' },
      { name: 'Retention at 30 days', method: 'Closed-book recall percentage.' },
      { name: 'Feedback latency', method: 'Hours between attempt and quality signal.' },
      { name: 'Session log streak', method: 'Consecutive logged sessions.' }
    ],
    failureModes: [
      { name: 'Consuming instead of practising', fix: 'Hard cap input at 25% of session time.' },
      { name: 'Rereading as revision', fix: 'Replace all rereading with closed-book recall.' },
      { name: 'Comfortable practice', fix: 'Track your success rate; keep it between 50 and 85%.' },
      { name: 'No log', fix: 'Three lines per session. The log is the difference between practice and repetition.' }
    ],
    arena: [
      'Real projects with deadlines',
      'Teaching someone else the same material',
      'Assessment by a practitioner better than you',
      'Public commitment to a demonstration date'
    ],
    library: [
      { title: 'Make It Stick', author: 'Brown, Roediger & McDaniel', note: 'The evidence base for retrieval practice.' },
      { title: 'Peak', author: 'Anders Ericsson', note: 'Deliberate practice from the researcher who defined it.' },
      { title: 'Ultralearning', author: 'Scott Young', note: 'Aggressive self-directed project design.' },
      { title: 'The Talent Code', author: 'Daniel Coyle', note: 'Practice at the edge, told through case studies.' }
    ]
  },

  /* ------------------------------------------------------------ PERFORMANCE */
  {
    id: 'performance-systems',
    name: 'Performance & Discipline',
    discipline: 'Foundation',
    tagline: 'The physical and behavioural base every other skill runs on.',
    thesis:
      'Every skill on this site is executed by a body with finite energy and an attention system that can be trained or wrecked. People rarely fail from lack of information — they fail from inconsistent execution. This discipline builds the substrate.',
    hours: { functional: 40, competent: 150, professional: 400, elite: 1200 },
    proofs: {
      functional: 'Consistent sleep, training and a deep work block held for a month.',
      competent: 'Sustained output through a demanding period without collapse.',
      professional: 'A resilient system that survives travel, stress and disruption.',
      elite: 'Long-horizon consistency others build their plans around.'
    },
    entryCheck: ['No medical contraindication to exercise — check with a physician if unsure'],
    pillars: [
      {
        id: 'sleep',
        name: 'Sleep & Recovery',
        weight: 0.22,
        specialization: 'Recovery',
        objective: 'Protect the process that consolidates everything you learn.',
        competencies: [
          'Consistent sleep and wake timing',
          'Light exposure, caffeine timing and evening protocol',
          'Recovery tracking and its link to performance',
          'Managing sleep debt during demanding periods'
        ],
        drills: [
          { name: 'Fixed Wake Time', dose: 'daily', protocol: 'Same wake time seven days a week for four weeks. Anchoring wake time stabilises everything downstream.' },
          { name: 'Caffeine Curfew', dose: 'daily', protocol: 'No caffeine within eight hours of your intended sleep. Track sleep quality before and after this change.' },
          { name: 'Wind-Down Block', dose: 'nightly', protocol: 'Thirty screen-free minutes before bed with the same sequence each night.' }
        ],
        milestone: {
          name: 'The Recovery Gate',
          criteria: [
            'Sleep timing within a 45-minute window for 21 consecutive days',
            'Documented link between sleep and next-day output in your log',
            'A protocol that survived one week of disruption'
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
          'Strength training with progressive overload',
          'Aerobic base for sustained cognitive endurance',
          'Movement quality and injury avoidance',
          'Programming that survives a real schedule'
        ],
        drills: [
          { name: 'Three Sessions Weekly', dose: '3×45–60 min', protocol: 'Two strength, one aerobic, non-negotiable slots in the calendar. Consistency beats programme optimisation by a wide margin.' },
          { name: 'Progressive Log', dose: 'every session', protocol: 'Record every set. Progression requires evidence, not memory.' },
          { name: 'Minimum Dose Fallback', dose: 'on bad days', protocol: 'Define the twelve-minute version you do when the day collapses. It protects the streak, which protects the identity.' }
        ],
        milestone: {
          name: 'The Capacity Gate',
          criteria: [
            'Twelve weeks of logged training with measurable progression',
            'Aerobic base sufficient for 30 minutes continuous work',
            'Kept the minimum dose through one disrupted week'
          ]
        }
      },
      {
        id: 'attention',
        name: 'Attention & Deep Work',
        weight: 0.24,
        specialization: 'Focus',
        objective: 'Reclaim the ability to concentrate for hours.',
        competencies: [
          'Deep work blocks with hard environmental protection',
          'Distraction architecture: removing rather than resisting',
          'Task batching and context-switch cost management',
          'Attention as a trainable capacity, extended gradually'
        ],
        drills: [
          { name: 'Ninety-Minute Block', dose: 'daily', protocol: 'One block daily: phone in another room, notifications off, single task, timer visible. Log actual focused minutes.' },
          { name: 'Friction Engineering', dose: 'once, then maintained', protocol: 'Make distractions expensive: log out, delete apps, use blockers. Willpower is a poor substitute for environment.' },
          { name: 'Attention Extension', dose: 'weekly', protocol: 'Add five minutes to your sustainable block each week until you reach 90 minutes clean.' }
        ],
        milestone: {
          name: 'The Focus Gate',
          criteria: [
            'Ninety uninterrupted minutes, logged, twenty times',
            'Distraction sources removed at the environment level',
            'Can start deep work within five minutes of sitting down'
          ]
        }
      },
      {
        id: 'consistency',
        name: 'Consistency Systems',
        weight: 0.2,
        specialization: 'Habit systems',
        objective: 'Make execution independent of how you feel.',
        competencies: [
          'Implementation intentions: when, where, what',
          'Habit stacking and environmental cues',
          'Streak tracking and honest missed-day protocol',
          'Identity-level framing over motivation'
        ],
        drills: [
          { name: 'If-Then Plans', dose: 'per habit', protocol: 'Write "when X happens, I will do Y at Z". Specificity roughly doubles follow-through in the research.' },
          { name: 'Never Twice', dose: 'ongoing', protocol: 'One missed day is noise; two is a new pattern. The rule is simply never miss twice.' },
          { name: 'Weekly Review', dose: 'weekly, 20 min', protocol: 'Same time weekly: what held, what slipped, what changes next week. One page.' }
        ],
        milestone: {
          name: 'The Consistency Gate',
          criteria: [
            'A 60-day streak on the primary practice with no double misses',
            'Twelve consecutive weekly reviews',
            'Recovered from at least three disrupted weeks without abandoning the system'
          ]
        }
      },
      {
        id: 'stress',
        name: 'Stress & Sustainability',
        weight: 0.14,
        specialization: 'Sustainable output',
        objective: 'Push hard for years rather than months.',
        competencies: [
          'Load management and planned deload periods',
          'Early warning signs of burnout in your own data',
          'Recovery practices that actually restore',
          'Relationships and meaning as performance infrastructure'
        ],
        drills: [
          { name: 'Deload Week', dose: 'every 8–12 weeks', protocol: 'A planned reduced week before you need it. Scheduled recovery prevents unscheduled collapse.' },
          { name: 'Warning Signs List', dose: 'once, reviewed monthly', protocol: 'Write your personal five early signals of overload. Ask someone close to you to add two you cannot see.' },
          { name: 'Non-Negotiables', dose: 'weekly', protocol: 'Protect two commitments unrelated to achievement. They are load-bearing, not optional.' }
        ],
        milestone: {
          name: 'The Sustainability Gate',
          criteria: [
            'A planned deload taken before exhaustion',
            'Personal warning signs documented and reviewed',
            'Twelve months without an involuntary stop'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Deep work hours/week', method: 'Logged focused minutes, not hours at a desk.' },
      { name: 'Sleep consistency', method: 'Standard deviation of wake time.' },
      { name: 'Training adherence', method: 'Sessions completed / planned.' },
      { name: 'Double-miss count', method: 'Times you missed the primary practice twice running. Target zero.' }
    ],
    failureModes: [
      { name: 'Optimising the plan instead of executing it', fix: 'Ban programme changes for the first six weeks.' },
      { name: 'All-or-nothing collapse', fix: 'Define the minimum dose in advance and use it.' },
      { name: 'Borrowing from sleep', fix: 'Treat sleep as the first budget line, not the buffer.' },
      { name: 'No measurement', fix: 'Track the two numbers that matter. Unmeasured consistency is a story you tell yourself.' }
    ],
    arena: [
      'A training partner or accountability pair',
      'Public commitment with a scoreboard',
      'Periodic testing: a physical benchmark, a work output benchmark',
      'A weekly review nobody else has to enforce'
    ],
    library: [
      { title: 'Deep Work', author: 'Cal Newport', note: 'The case for concentration as a competitive advantage.' },
      { title: 'Atomic Habits', author: 'James Clear', note: 'Habit mechanics; use the systems, skip the anecdotes.' },
      { title: 'Why We Sleep', author: 'Matthew Walker', note: 'Sleep as the base of cognitive performance; read for the mechanism.' },
      { title: 'Can’t Hurt Me', author: 'David Goggins', note: 'For the weeks when the system is fine and you are the problem.' }
    ],
    disclaimer: 'General educational guidance, not medical advice. Consult a qualified professional before beginning any training programme or changing sleep, diet or medication.'
  },

  /* ------------------------------------------------------------------ DESIGN */
  {
    id: 'design-communication',
    name: 'Design & Visual Communication',
    discipline: 'Craft',
    tagline: 'Make work that is taken seriously on sight.',
    thesis:
      'People judge competence visually before they read a word. Design is a force multiplier on every other skill — the same argument, the same product, the same pitch, valued differently because of how it looks. And unlike talent myths suggest, the fundamentals are mechanical.',
    hours: { functional: 50, competent: 200, professional: 700, elite: 2500 },
    proofs: {
      functional: 'Produce clean documents, decks and interfaces that look professionally made.',
      competent: 'Design products or brand material that holds up next to funded competitors.',
      professional: 'Paid design work; systems others build against.',
      elite: 'Recognised craft and a distinctive visual point of view.'
    },
    entryCheck: ['Access to any design tool', 'Work of your own that needs to look credible'],
    pillars: [
      {
        id: 'fundamentals',
        name: 'Visual Fundamentals',
        weight: 0.24,
        specialization: 'Visual fundamentals',
        objective: 'Fix the four things that make amateur work look amateur.',
        competencies: [
          'Spacing and alignment on a consistent scale',
          'Typographic hierarchy: size, weight, measure, leading',
          'Restrained colour with deliberate contrast',
          'Visual hierarchy — what the eye hits first, second, third'
        ],
        drills: [
          { name: 'Spacing Discipline', dose: 'every artefact', protocol: 'Use one spacing scale (4/8/16/24/48). Inconsistent spacing is the single biggest amateur signal.' },
          { name: 'Type Only', dose: '3 layouts', protocol: 'Design three layouts using only typography, black, white and space. Colour hides weak hierarchy.' },
          { name: 'Redesign Audit', dose: '1/week', protocol: 'Take something you made, list five specific flaws, fix them, and compare side by side.' }
        ],
        milestone: {
          name: 'The Fundamentals Gate',
          criteria: [
            'A document or interface that follows one spacing and type scale throughout',
            'Hierarchy legible from a squint test at three metres',
            'Colour palette of three or fewer, used with intent'
          ]
        }
      },
      {
        id: 'interface',
        name: 'Interface & Product Design',
        weight: 0.24,
        specialization: 'Product & UI design',
        objective: 'Design things people can use without instruction.',
        competencies: [
          'Layout systems, grids and responsive behaviour',
          'Component thinking and consistency',
          'States: empty, loading, error, success',
          'Usability testing on real humans'
        ],
        drills: [
          { name: 'All States', dose: 'every screen', protocol: 'Design every state, not just the happy path. Amateur work is identifiable by its missing empty state.' },
          { name: 'Five-User Test', dose: 'per project', protocol: 'Watch five people use it without help. Say nothing. Write down every hesitation.' },
          { name: 'Component Extraction', dose: '1 system', protocol: 'Turn a finished design into reusable components with defined variants.' }
        ],
        milestone: {
          name: 'The Usability Gate',
          criteria: [
            'Five users completed the core task unaided',
            'All interface states designed',
            'A small component system in use across screens'
          ]
        }
      },
      {
        id: 'brand',
        name: 'Brand & Identity',
        weight: 0.2,
        specialization: 'Brand identity',
        objective: 'Make a thing look like it came from somewhere specific.',
        competencies: [
          'Positioning translated into visual decisions',
          'Type pairing, colour systems and visual voice',
          'Consistency across surfaces',
          'Knowing the conventions of your category — and when to break them'
        ],
        drills: [
          { name: 'Reference Board', dose: 'per project', protocol: 'Collect thirty references and annotate what specifically works in each. Vague inspiration produces vague work.' },
          { name: 'Three Directions', dose: 'per identity', protocol: 'Produce three genuinely different visual directions before choosing. First ideas are usually category defaults.' },
          { name: 'Surface Consistency', dose: 'audit', protocol: 'Put every surface side by side. Anything that looks like a different company gets fixed.' }
        ],
        milestone: {
          name: 'The Identity Gate',
          criteria: [
            'A documented visual system: type, colour, spacing, tone',
            'Three surfaces that clearly belong together',
            'Can justify each choice against the positioning'
          ]
        }
      },
      {
        id: 'information',
        name: 'Information Design',
        weight: 0.18,
        specialization: 'Data & information design',
        objective: 'Make complex material understandable at a glance.',
        competencies: [
          'Chart selection and honest scales',
          'Data-ink discipline; removing decoration',
          'Diagramming systems and processes',
          'Document and deck structure as visual argument'
        ],
        drills: [
          { name: 'Chart Rebuild', dose: '2/week', protocol: 'Find a bad chart and rebuild it honestly. Write what the original obscured.' },
          { name: 'One Message Per View', dose: 'every chart', protocol: 'Write the sentence the chart proves. If there are two, split it into two charts.' },
          { name: 'Diagram the System', dose: '1/week', protocol: 'Draw something you understand well as a diagram. Give it to someone who does not and watch where they get lost.' }
        ],
        milestone: {
          name: 'The Clarity Gate',
          criteria: [
            'A chart that changed someone’s understanding of the data',
            'A diagram a newcomer read correctly without narration',
            'Every visual carries exactly one message'
          ]
        }
      },
      {
        id: 'taste',
        name: 'Taste & Critique',
        weight: 0.14,
        specialization: 'Craft & critique',
        objective: 'Develop and defend a point of view.',
        competencies: [
          'Structured critique: observation before judgement',
          'Studying work in your field with technical vocabulary',
          'Receiving critique without collapse or defensiveness',
          'Knowing when a thing is finished'
        ],
        drills: [
          { name: 'Daily Study', dose: '10 min', protocol: 'Study one piece of excellent work and write three specific technical observations. Not "nice" — what and why.' },
          { name: 'Critique Exchange', dose: 'weekly', protocol: 'Trade work with a peer weekly. Give observation, then question, then suggestion — in that order.' },
          { name: 'Version Compare', dose: 'per project', protocol: 'Keep versions one, five and final side by side. Seeing your own improvement is what sustains the practice.' }
        ],
        milestone: {
          name: 'The Taste Gate',
          criteria: [
            'A portfolio a stranger would call professionally made',
            'Can critique work with specific technical language',
            'Ran a critique session and improved someone else’s work'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Artefacts shipped', method: 'Finished, published pieces per month.' },
      { name: 'Usability pass rate', method: 'Users completing the core task unaided.' },
      { name: 'Critique cycles', method: 'Rounds of external critique per project.' },
      { name: 'Study streak', method: 'Consecutive days of deliberate visual study.' }
    ],
    failureModes: [
      { name: 'Decorating instead of structuring', fix: 'Solve hierarchy in black and white before adding anything.' },
      { name: 'Copying trends without understanding', fix: 'For every borrowed element, write why it works there.' },
      { name: 'Never testing with users', fix: 'Five users per project. Silent observation only.' },
      { name: 'Perfectionist non-shipping', fix: 'Fixed ship dates; critique after publication, not instead of it.' }
    ],
    arena: [
      'Real projects with real users or clients',
      'Weekly peer critique',
      'A public portfolio you keep current',
      'Design communities that give technical, not social, feedback'
    ],
    library: [
      { title: 'The Non-Designer’s Design Book', author: 'Robin Williams', note: 'The four principles that fix most amateur work.' },
      { title: 'Refactoring UI', author: 'Wathan & Schoger', note: 'Practical interface decisions, immediately usable.' },
      { title: 'The Visual Display of Quantitative Information', author: 'Edward Tufte', note: 'The standard for honest information design.' },
      { title: 'Thinking with Type', author: 'Ellen Lupton', note: 'Typography fundamentals with working examples.' }
    ]
  }
];
