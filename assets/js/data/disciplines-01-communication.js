/*
 * Communication disciplines.
 *
 * Pillar schema:
 *   competencies[]  what you need to be able to do
 *   stages[]        how the work escalates across the weeks of the phase
 *   drills[]        repeatable practice, each with the mistake people make
 *   standard        what "done" looks like in one sentence
 *   milestone       the gate, with criteria someone else could check
 */

window.DISCIPLINES = (window.DISCIPLINES || []).concat([

  /* ---------------------------------------------------------------- WRITING */
  {
    id: 'persuasive-writing',
    name: 'Persuasive Writing',
    discipline: 'Communication',
    tagline: 'Get a decision out of someone who was not going to give you one.',
    thesis:
      'Most decisions that affect your work get made in rooms you are not in, out of documents you wrote. ' +
      'Writing is also the cheapest way to find out whether you understand something. In conversation you ' +
      'can hide a muddled idea, because the person listening quietly fills in your gaps. On the page nobody ' +
      'does that for you.',
    hours: { functional: 60, competent: 220, professional: 700, elite: 2400 },
    proofs: {
      functional: 'You can write an email or a one-page memo that gets a straight answer on the first try.',
      competent: 'You can write a proposal, essay or landing page and point at what it changed.',
      professional: 'People pay for the writing itself, or your documents set direction for other people.',
      elite: 'You have a body of published work and readers who turn up for it.'
    },
    entryCheck: [
      'You can write grammatical prose in the language you will work in',
      'You have a subject you know something real about'
    ],
    pillars: [
      {
        id: 'clarity',
        name: 'Sentence-Level Clarity',
        weight: 0.18,
        specialization: 'Clear operational writing',
        objective: 'Stop making the reader work.',
        competencies: [
          'Keeping the subject next to its verb',
          'Choosing concrete nouns over abstractions like "implementation" and "alignment"',
          'Cutting words that carry no information',
          'Reading aloud to catch what your eye skips'
        ],
        stages: [
          {
            name: 'Diagnosis',
            work: 'Find out what your prose actually does wrong. Nearly everyone has three or four habits that account for most of it, and you probably cannot name yours yet.',
            check: 'You can state your two worst habits without looking them up.'
          },
          {
            name: 'Repair',
            work: 'Rewrite old material one habit at a time. One pass per habit is much faster than trying to fix everything at once.',
            check: 'A 400-word piece survives being read aloud without a stumble.'
          },
          {
            name: 'First-pass clean',
            work: 'Write clean to begin with instead of fixing it afterwards. This is slower for about two weeks and then it is faster forever.',
            check: 'Your first drafts need less than 20% cutting.'
          }
        ],
        drills: [
          {
            name: 'The 20% cut',
            dose: '1 page, 15 minutes',
            protocol: 'Take 500 words, yours or a stranger\'s, and remove exactly a hundred of them without losing an idea. Keep a tally of what you cut: adverbs, hedges, throat-clearing openers, repeated points. After ten sessions the tally is your habit list.',
            mistake: 'Cutting evenly across the piece. The waste is usually concentrated in the first paragraph and in any sentence that begins with "It is important to note".'
          },
          {
            name: 'Read it aloud',
            dose: 'every draft, no exceptions',
            protocol: 'Read the finished draft out loud, standing up. Mark every place you stumble, run out of breath, or have to go back. Those marks are almost always sentence-structure problems, not word choice.',
            mistake: 'Reading it in your head and believing that counts. Your eye repairs broken sentences silently; your mouth will not.'
          },
          {
            name: 'Imitation transcription',
            dose: '250 words',
            protocol: 'Hand-copy a passage by a writer you admire, then immediately rewrite one of your own paragraphs using the same shape. You are training your ear for rhythm, which does not transfer from reading alone.',
            mistake: 'Copying the vocabulary instead of the structure. The thing worth stealing is where they put the verb and how long they let a sentence run.'
          },
          {
            name: 'De-abstraction pass',
            dose: '10 sentences',
            protocol: 'Find every abstract noun in a draft and rewrite the sentence so a specific person does a specific thing. "The implementation of the policy caused delays" becomes "Two teams stopped shipping for a month after we changed the policy".',
            mistake: 'Swapping one abstraction for a shorter abstraction. If you cannot picture someone doing it, you have not finished.'
          }
        ],
        standard: 'A stranger reads it once, at speed, and comes away with your point intact.',
        milestone: {
          name: 'Readability gate',
          criteria: [
            'Three readers restate your main point in one sentence, correctly',
            'A 400-word piece read aloud with no stumbles',
            'No sentence over 35 words unless you meant it'
          ]
        }
      },
      {
        id: 'structure',
        name: 'Argument Architecture',
        weight: 0.22,
        specialization: 'Memos and decision documents',
        objective: 'Build an argument that holds up when someone is looking for holes in it.',
        competencies: [
          'Claim, reason, evidence, objection, answer',
          'Putting the recommendation first and the reasoning after',
          'Stating the counter-case well enough that its believers would sign it',
          'Telling load-bearing evidence apart from decoration'
        ],
        stages: [
          {
            name: 'Skeletons',
            work: 'Take other people\'s arguments apart before building your own. Reduce published pieces to their claim trees and mark where the author swapped confidence for evidence.',
            check: 'You can outline any article you read in five bullets.'
          },
          {
            name: 'One page',
            work: 'Write decision memos on real decisions. The page limit is the whole exercise, since it forces you to decide what is actually carrying the argument.',
            check: 'Someone made a decision from a memo you wrote.'
          },
          {
            name: 'Under fire',
            work: 'Put memos in front of people who disagree with you and rebuild them around what breaks.',
            check: 'A hostile reader found no unanswered objection.'
          }
        ],
        drills: [
          {
            name: 'One-page decision memo',
            dose: '1 per session',
            protocol: 'Pick a real decision. Write the recommendation, three reasons, the strongest objection, your answer to it, and what it costs if you are wrong. One page, hard limit, no appendix.',
            mistake: 'Saving the recommendation for the end so the reader has to earn it. They will stop before they get there.'
          },
          {
            name: 'Steelman reversal',
            dose: '300 words',
            protocol: 'Argue against a position you hold, well enough that someone who believes it would put their name to it. Then write the two sentences that actually defeat it. If you cannot find two, you may be on the wrong side.',
            mistake: 'Writing a version that is easy to knock down and calling it a steelman.'
          },
          {
            name: 'Evidence audit',
            dose: '1 draft',
            protocol: 'Go through a finished draft and delete every anecdote, statistic and quote. Read what is left. Anything that still stands was doing the work; anything that collapsed was being propped up by decoration.',
            mistake: 'Confusing a vivid example with an argument. Vivid examples make people remember a claim, they do not make it true.'
          },
          {
            name: 'Objection ordering',
            dose: '8 objections',
            protocol: 'List the objections a reader will have in the order they will occur, not in the order that suits you. Answer each in the place the doubt arrives. Answering too early reads as defensive, too late and they have stopped reading.',
            mistake: 'Answering the objection you have a good answer for and quietly skipping the real one.'
          }
        ],
        standard: 'The argument survives having its supporting stories deleted.',
        milestone: {
          name: 'Hostile reader gate',
          criteria: [
            'Someone who disagrees read it and found no unanswered objection',
            'The recommendation is legible in the first three lines',
            'A real decision was made off a document you wrote'
          ]
        }
      },
      {
        id: 'audience',
        name: 'Reader Modelling',
        weight: 0.2,
        specialization: 'Conversion and pitch copy',
        objective: 'Write to one specific person with something at stake.',
        competencies: [
          'Working out how much your reader already knows and wants',
          'Using their vocabulary rather than your own',
          'Knowing what your reader is afraid of losing',
          'Writing the same argument two ways for two audiences'
        ],
        stages: [
          {
            name: 'Listening',
            work: 'Collect how your readers describe the problem in their own words. You are looking for the phrases they repeat, not a summary of what they mean.',
            check: 'You have 20 verbatim quotes from real readers.'
          },
          {
            name: 'Targeting',
            work: 'Rewrite existing material for one named person and watch what changes. Usually about half the piece turns out to have been written for yourself.',
            check: 'A piece rewritten for one reader outperformed the general version.'
          },
          {
            name: 'Testing',
            work: 'Put two versions in front of real readers and count what happens. Opinions about copy are close to worthless, including yours.',
            check: 'You have run one honest A/B test.'
          }
        ],
        drills: [
          {
            name: 'Voice mining',
            dose: '20 quotes',
            protocol: 'Harvest twenty verbatim lines from reviews, support tickets, forums or call recordings where your reader describes the problem. Write your next piece using only that vocabulary.',
            mistake: 'Tidying up their phrasing. The awkward phrase is the one they will recognise.'
          },
          {
            name: 'Objection ladder',
            dose: '1 ladder',
            protocol: 'Write the eight reasons this reader says no, in the order the doubts arrive, and the single line that dissolves each. Keep the ladder next to you while drafting.',
            mistake: 'Guessing the objections instead of asking. The real top objection is often boring and logistical, like "we already bought something for this".'
          },
          {
            name: 'Two-audience rewrite',
            dose: '2 versions, 200 words each',
            protocol: 'Write the same pitch for a sceptical expert and for a busy generalist. Put them side by side and name every difference. That list is your model of both readers.',
            mistake: 'Producing one piece and a slightly shorter version of it.'
          },
          {
            name: 'The one-reader letter',
            dose: '1 per week',
            protocol: 'Before drafting anything, write it as an email to one real named person who has the problem. Then adapt the email into the piece. The email is nearly always better than what you would have written directly.',
            mistake: 'Choosing a flattering imaginary reader who already agrees with you.'
          }
        ],
        standard: 'You can name your reader\'s top three objections without guessing.',
        milestone: {
          name: 'Response gate',
          criteria: [
            'Ten or more real readers took an action: replied, signed up, bought, decided',
            'You ran one A/B test on a headline or subject line against a live audience',
            'Your objection list came from readers, not from your own head'
          ]
        }
      },
      {
        id: 'longform',
        name: 'Long-Form Control',
        weight: 0.22,
        specialization: 'Essays and long documents',
        objective: 'Hold a reader for 2,000 words and land the turn.',
        competencies: [
          'Openings that create a question the reader wants answered',
          'Section design and momentum across pages',
          'The turn, where the piece stops informing and starts changing them',
          'Endings that pay off the opening promise'
        ],
        stages: [
          {
            name: 'Shape',
            work: 'Study how long pieces are built. Chart a few by section and word count until the shape is visible to you.',
            check: 'You have charted three pieces and can describe their shapes.'
          },
          {
            name: 'Draft and ship',
            work: 'Publish on a fixed schedule where strangers can respond. Unpublished practice writing plateaus quickly, mostly because nothing forces you to finish.',
            check: 'Three pieces published on schedule.'
          },
          {
            name: 'Hold attention',
            work: 'Work on read-through specifically: openings, transitions, and the places readers leave.',
            check: 'Measured read-through above 40%.'
          }
        ],
        drills: [
          {
            name: 'Twelve openings',
            dose: '12 leads, 45 minutes',
            protocol: 'Write twelve first paragraphs for the same piece: a question, a scene, a flat claim, a number, a confession, an objection, a line of dialogue, and five more. Pick one and write down why.',
            mistake: 'Writing three and taking the third because you are tired. The good one is usually somewhere after eight.'
          },
          {
            name: 'Structural autopsy',
            dose: '1 piece',
            protocol: 'Take an essay that held you all the way through. Chart every section by what it does and how long it is. Then write something of your own into that shape.',
            mistake: 'Admiring the sentences and ignoring the architecture, which is what actually kept you reading.'
          },
          {
            name: 'Ship weekly',
            dose: '1 published piece',
            protocol: 'Publish somewhere strangers can respond, on the same day each week. Announce the schedule to somebody so missing it costs you something.',
            mistake: 'Waiting until a piece is ready. Nothing is ready; the deadline is what makes it finished.'
          },
          {
            name: 'Cut the first three paragraphs',
            dose: '1 draft per week',
            protocol: 'Delete the opening three paragraphs of a finished draft and see whether the piece is worse. Roughly half the time it is better, because the first three paragraphs were you warming up.',
            mistake: 'Keeping the warm-up because it took effort to write.'
          }
        ],
        standard: 'People finish it and at least a few of them write to you.',
        milestone: {
          name: 'Attention gate',
          criteria: [
            'A 2,000-word piece published with read-through above 40%',
            'Three unsolicited responses from strangers',
            'You can justify every section in one sentence'
          ]
        }
      },
      {
        id: 'voice',
        name: 'Voice and Authority',
        weight: 0.18,
        specialization: 'Building a body of work',
        objective: 'Become the writer a particular group of people come back to.',
        competencies: [
          'Finding the sentence only you would write',
          'Holding a consistent position across many pieces',
          'Editing for taste rather than correctness',
          'Getting the work in front of people who do not know you'
        ],
        stages: [
          {
            name: 'Position',
            work: 'Work out what you believe that most of your field does not, and whether you can defend it.',
            check: 'You have a stance you have written down and revised at least twice.'
          },
          {
            name: 'Consistency',
            work: 'Write enough on that stance that a stranger could read your last ten pieces as one argument.',
            check: 'Ten pieces that hang together.'
          },
          {
            name: 'Distribution',
            work: 'Place work in front of audiences you do not own. This is a separate skill from writing and most writers avoid it.',
            check: 'Three placements outside your own channels.'
          }
        ],
        drills: [
          {
            name: 'Stance statement',
            dose: '20 words, revised fortnightly',
            protocol: 'Write the twenty words describing what you believe that your field mostly does not. Revise it every two weeks as the writing teaches you what you actually think.',
            mistake: 'Picking a contrarian position for its own sake. It has to be something you would still hold if it were unpopular in the other direction.'
          },
          {
            name: 'Cold reread',
            dose: '1 old piece',
            protocol: 'Reread something you wrote 30 or more days ago and mark every line that now sounds borrowed from someone else. The borrowed lines mark the edge of your own voice.',
            mistake: 'Rereading it the same week, while you still remember what you meant.'
          },
          {
            name: 'Distribution rep',
            dose: '1 pitch per week',
            protocol: 'Pitch one piece to a newsletter, publication, community or podcast that already has the audience you want. Keep a log of what got taken and what did not.',
            mistake: 'Pitching the piece you want to write instead of the one that audience already wants.'
          },
          {
            name: 'Kill your best line',
            dose: '1 per piece',
            protocol: 'Find the line you are proudest of and delete it. If the piece is worse, put it back. Often it was a line you wrote for other writers rather than for the reader.',
            mistake: 'Building the whole piece around a line you liked before you knew what you were arguing.'
          }
        ],
        standard: 'Someone can pick your writing out of a stack without seeing your name on it.',
        milestone: {
          name: 'Body of work gate',
          criteria: [
            'Twelve published pieces that read as one coherent position',
            'Readers arriving without paid promotion',
            'One inbound opportunity you can trace to the writing'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Ship rate', method: 'Pieces published per week. Below one a week, the rest of this barely matters.' },
      { name: 'Read-through', method: 'How many readers reach the end, per piece.' },
      { name: 'Response rate', method: 'Replies or actions per hundred readers.' },
      { name: 'Cut ratio', method: 'Words deleted over words drafted. A healthy draft loses a quarter to a third.' }
    ],
    failureModes: [
      { name: 'Practising without publishing', fix: 'Fix the publish slot before you write anything. The deadline does most of the teaching.' },
      { name: 'Writing to impress other writers', fix: 'Name one real reader and write the email to them first.' },
      { name: 'Editing while drafting', fix: 'Put twelve hours between drafting and editing. Draft fast, edit cold.' },
      { name: 'Researching forever', fix: 'Cap research at a quarter of the session. You find out what you think by writing, not before.' }
    ],
    arena: [
      'A real list of readers, however small, on a fixed schedule',
      'Documents your organisation actually decides from',
      'One paid copy or ghostwriting job, because payment changes the quality of the feedback',
      'An editor who marks up your work rather than praising it'
    ],
    library: [
      { title: 'On Writing Well', author: 'William Zinsser', note: 'Clarity in non-fiction, and the discipline of deletion.' },
      { title: 'The Pyramid Principle', author: 'Barbara Minto', note: 'The structure underneath every serious business document.' },
      { title: 'The Sense of Style', author: 'Steven Pinker', note: 'Why prose fails, from someone who studies how reading works.' },
      { title: 'The Boron Letters', author: 'Gary Halbert', note: 'Direct response, written by someone whose copy had to earn money that week.' }
    ]
  },

  /* --------------------------------------------------------------- SPEAKING */
  {
    id: 'speaking-presence',
    name: 'Speaking and Presence',
    discipline: 'Communication',
    tagline: 'Be worth listening to in the twenty minutes that matter.',
    thesis:
      'A lot of careers turn on short stretches of time in front of people who can change them. Presence is ' +
      'mostly mechanical: structure, delivery habits, and staying steady when the room turns. Almost nobody ' +
      'trains it on purpose, which is why the small number of people who do stand out so sharply.',
    hours: { functional: 40, competent: 160, professional: 500, elite: 1800 },
    proofs: {
      functional: 'You can give a prepared ten-minute talk without notes and without falling apart.',
      competent: 'You can hold a room of fifty, take unscripted questions, and present to senior people.',
      professional: 'You get asked to speak, and sometimes paid for it.',
      elite: 'Your speaking brings you work you did not go looking for.'
    },
    entryCheck: [
      'You have access to some audience: a team, a meetup, a camera',
      'You are willing to watch yourself on video, which most people are not'
    ],
    pillars: [
      {
        id: 'mechanics',
        name: 'Delivery Mechanics',
        weight: 0.2,
        specialization: 'Voice and body',
        objective: 'Stop the habits that make you sound unsure.',
        competencies: [
          'Breathing from low enough that your voice sits at its natural pitch',
          'Pace, and the pause you are currently too uncomfortable to take',
          'Cutting fillers: um, so, right, kind of, basically',
          'Standing still, and gesturing in units of thought rather than constantly'
        ],
        stages: [
          {
            name: 'See it',
            work: 'Record yourself and count what you do. This week is unpleasant and it is the fastest week of the whole phase.',
            check: 'You have counted your fillers per minute and know your two worst tics.'
          },
          {
            name: 'Replace it',
            work: 'Substitute silence for the filler, one recording at a time. It feels enormously long to you and normal to everyone else.',
            check: 'Fillers under three per minute on tape.'
          },
          {
            name: 'Hold it under load',
            work: 'Keep the mechanics while doing something hard: unfamiliar material, no preparation, a live audience.',
            check: 'Mechanics hold up in an unrehearsed 90-second answer.'
          }
        ],
        drills: [
          {
            name: 'Filler count',
            dose: '3 minutes recorded',
            protocol: 'Record three minutes on any topic. Play it back and count every filler on paper. Re-record replacing each one with a full second of silence. Repeat until you are under two per minute.',
            mistake: 'Trying to stop mid-sentence. The filler happens at the join between thoughts, so the fix is to pause at the join, not to speak faster.'
          },
          {
            name: 'Pause metronome',
            dose: '5 minutes',
            protocol: 'Read a passage aloud and hold a two-count pause at every full stop. It will feel absurd. Watch it back and notice that it sounds deliberate rather than slow.',
            mistake: 'Shortening the pause because the silence is uncomfortable for you. It is not uncomfortable for the audience.'
          },
          {
            name: 'Cold open',
            dose: '3 reps',
            protocol: 'Stand up, start the recording, and speak for 90 seconds about a random object in the room with no preparation. This trains the transition from silence into speech, which is where most nerves live.',
            mistake: 'Preparing a little bit first, which defeats the entire point of the drill.'
          },
          {
            name: 'Sound off',
            dose: '1 recording per week',
            protocol: 'Watch a recording of yourself with the sound muted. You are looking only at stance, hands and face. Then listen with the screen off and judge only the voice. Splitting the channels makes the review usable instead of just embarrassing.',
            mistake: 'Watching normally, cringing, and learning nothing.'
          }
        ],
        standard: 'You can be watched with the sound off and still look like you know what you are doing.',
        milestone: {
          name: 'Tape gate',
          criteria: [
            'Under two fillers per minute across five minutes of recording',
            'You can hold a three-second pause without rushing to fill it',
            'Watchable on mute without the stance undercutting you'
          ]
        }
      },
      {
        id: 'talkdesign',
        name: 'Talk Design',
        weight: 0.22,
        specialization: 'Presentations',
        objective: 'Build talks around one idea people can carry out of the room.',
        competencies: [
          'Choosing the single thing you want repeated afterwards',
          'Opening in thirty seconds, stakes before background',
          'Signposting so people know where they are',
          'Using slides as evidence rather than as your notes'
        ],
        stages: [
          {
            name: 'One idea',
            work: 'Practise reducing material to a single transferable point, then cutting everything that does not serve it.',
            check: 'You can state the point of any talk you give in one sentence.'
          },
          {
            name: 'Build',
            work: 'Construct full talks: opening, three movements, close. Rehearse standing, out loud, timed.',
            check: 'A full talk delivered from six slides without reading them.'
          },
          {
            name: 'Compress',
            work: 'Cut each talk to half its length and see what survives. What survives is the talk.',
            check: 'A talk that works at half its original length.'
          }
        ],
        drills: [
          {
            name: 'The dinner test',
            dose: 'every talk',
            protocol: 'Write the one sentence you want someone repeating at dinner that night. Put it at the top of your outline. Any section that does not serve it comes out, however good it is.',
            mistake: 'Writing a topic instead of a claim. "The future of logistics" is not something anyone can repeat.'
          },
          {
            name: 'Slide strip',
            dose: '1 deck',
            protocol: 'Rebuild an existing deck with no more than six words on any slide. The content has to move into your mouth, which is where it belonged.',
            mistake: 'Moving the text into the speaker notes and reading those instead.'
          },
          {
            name: 'Thirty-second open',
            dose: '5 versions',
            protocol: 'Write five openings for the same talk and deliver each to camera. Keep the one that makes you sit forward when you watch it back.',
            mistake: 'Opening with your name, your job title and a thank you. Nobody has ever leaned in for that.'
          },
          {
            name: 'Half-length cut',
            dose: '1 per talk',
            protocol: 'Take a finished twenty-minute talk and deliver it in ten without dropping the core idea. Record both. The ten-minute version is usually better and you should consider keeping it.',
            mistake: 'Speaking faster instead of removing material.'
          }
        ],
        standard: 'People can tell someone else what your talk was about, a day later, accurately.',
        milestone: {
          name: 'Retention gate',
          criteria: [
            'Three audience members state your core idea correctly 24 hours later',
            'Talk delivered from six slides or fewer without reading',
            'The talk still works cut to half length'
          ]
        }
      },
      {
        id: 'pressure',
        name: 'Questions and Pressure',
        weight: 0.22,
        specialization: 'Q&A and difficult rooms',
        objective: 'Stay steady when the room stops being friendly.',
        competencies: [
          'Settling your own physiology before and during',
          'Answering the question that was asked, first sentence',
          'Handling interruption, hostility and the question you cannot answer',
          'Saying "I do not know" in a way that costs you nothing'
        ],
        stages: [
          {
            name: 'Friendly fire',
            work: 'Take questions from people who like you, on material you know well. Get used to the shape of it.',
            check: 'You answer in under 45 seconds with the answer in the first sentence.'
          },
          {
            name: 'Hostile',
            work: 'Have someone attack the material deliberately. Practise absorbing it without either collapsing or getting sharp.',
            check: 'A hostile question answered on tape without defensiveness.'
          },
          {
            name: 'Real stakes',
            work: 'Do it where being wrong costs you something. This is the only part that builds the actual composure.',
            check: 'Fifteen minutes of unscripted Q&A in a room that mattered.'
          }
        ],
        drills: [
          {
            name: 'Hostile Q&A',
            dose: '10 questions',
            protocol: 'Have someone fire ten aggressive questions at you. Answer each in under 45 seconds, with the answer in the first sentence and the reasoning after. Record it and watch where you started padding.',
            mistake: 'Restating the question while you think. Everyone can hear you doing it.'
          },
          {
            name: 'Interrupt reps',
            dose: '5 reps',
            protocol: 'Present while a partner interrupts every thirty seconds. Practise taking the interruption, answering it, and getting back to your line without visible irritation.',
            mistake: 'Talking over them, which reads as panic even when you are right.'
          },
          {
            name: 'The honest gap',
            dose: '5 reps',
            protocol: 'Practise saying "I do not know, here is how I would find out, I will come back to you by Thursday" until it sounds like strength instead of an apology.',
            mistake: 'Guessing. Rooms forgive not knowing; they do not forgive being confidently wrong twice.'
          },
          {
            name: 'One size up',
            dose: 'weekly',
            protocol: 'Every week, speak to an audience slightly larger or slightly more senior than is comfortable. Note in your log how fast the nerves settled compared with last time.',
            mistake: 'Staying in rooms where you are already the most experienced person. Those rooms stop teaching you anything.'
          }
        ],
        standard: 'The room cannot tell the difference between your prepared material and your unprepared answers.',
        milestone: {
          name: 'Q&A gate',
          criteria: [
            'Fifteen minutes of unscripted questions on tape, without evasion',
            'One hostile question handled without defensiveness',
            'You said "I do not know" and kept the room'
          ]
        }
      },
      {
        id: 'narrative',
        name: 'Story',
        weight: 0.18,
        specialization: 'Persuasion through narrative',
        objective: 'Make the argument stick to a person, not just to a notepad.',
        competencies: [
          'Situation, complication, turn, consequence',
          'The specific detail that makes a story believable',
          'Changing register on purpose, including going quiet',
          'Knowing where persuasion turns into manipulation'
        ],
        stages: [
          {
            name: 'Collect',
            work: 'Build a bank of stories from your own experience. Most people have far more than they think and have never written any of them down.',
            check: 'Twelve stories written out, each with a point.'
          },
          {
            name: 'Time them',
            work: 'Cut each story to ninety seconds and rehearse until the timing is exact.',
            check: 'Any story delivered in 90 seconds, on demand.'
          },
          {
            name: 'Attach',
            work: 'Practise pulling the right story out to support an argument with almost no notice.',
            check: 'You attached a story to an argument on ten seconds\' notice.'
          }
        ],
        drills: [
          {
            name: 'Story bank',
            dose: '1 story per week',
            protocol: 'Write out one story from your own life or work, under 200 words, with the point stated at the bottom. Twelve of these is a working bank you will use for years.',
            mistake: 'Collecting stories with no point. A good anecdote that proves nothing wastes the room\'s goodwill.'
          },
          {
            name: 'Detail substitution',
            dose: '3 stories',
            protocol: 'Retell a story replacing every generality with something specific: a name, a number, a time of day, what the room smelled like. Compare the two versions on tape.',
            mistake: 'Adding detail everywhere. Two or three specifics do the work; more turns it into a shaggy dog story.'
          },
          {
            name: 'Register range',
            dose: '3 reps',
            protocol: 'Deliver the same sixty seconds three ways: urgent, quiet and intimate, then flat and matter-of-fact. Learn what each one buys you.',
            mistake: 'Having one register, usually enthusiastic, and using it for everything including bad news.'
          },
          {
            name: 'Ninety seconds, cold',
            dose: '5 reps',
            protocol: 'Have someone name an argument. You have ten seconds to choose a story from your bank and ninety seconds to tell it so that it lands the point.',
            mistake: 'Telling the story you like best rather than the one that fits the argument.'
          }
        ],
        standard: 'People remember your example a week later, and the point along with it.',
        milestone: {
          name: 'Story gate',
          criteria: [
            'Twelve rehearsed stories, each landing a distinct point inside 90 seconds',
            'One story visibly changed the room, on video',
            'You attached a story to an argument with almost no notice'
          ]
        }
      },
      {
        id: 'presence',
        name: 'Presence in the Room',
        weight: 0.18,
        specialization: 'Senior rooms',
        objective: 'Be read as someone who should be in the decision.',
        competencies: [
          'Saying less, with the conclusion first',
          'Neither deferring nor performing when outranked',
          'Reading the room and changing course while you are talking',
          'Owning the first and last minute of a meeting'
        ],
        stages: [
          {
            name: 'Economy',
            work: 'Cut your own airtime deliberately and see what happens to how you are treated.',
            check: 'One meeting a day where you said half of what you wanted to.'
          },
          {
            name: 'Reading',
            work: 'Practise noticing who actually decides and what they are worried about, and write it down afterwards.',
            check: 'Ten meetings logged with who decided and why.'
          },
          {
            name: 'Leading',
            work: 'Run meetings with people more senior than you and get an actual decision out of them.',
            check: 'You ran a senior meeting to a decision.'
          }
        ],
        drills: [
          {
            name: 'Half the words',
            dose: '1 meeting per day',
            protocol: 'In one meeting each day, say half as much as you want to, and make your first sentence the conclusion. Note whether anyone noticed you spoke less.',
            mistake: 'Going silent instead of going concise. The goal is fewer words, not fewer contributions.'
          },
          {
            name: 'Room read',
            dose: 'after each meeting',
            protocol: 'Three lines afterwards: who actually decided, what they were worried about, what you would change about your own delivery. Ten of these will teach you more than any course.',
            mistake: 'Recording what was decided instead of who decided it and what moved them.'
          },
          {
            name: 'First and last minute',
            dose: '2 meetings per week',
            protocol: 'Plan the opening sentence and the closing sentence of a meeting in advance. Openings set what the meeting is for; closings decide what people remember.',
            mistake: 'Letting the meeting end by running out of time, so the last thing said is a logistics question.'
          },
          {
            name: 'Sit in on power',
            dose: 'weekly',
            protocol: 'Get into one room per week above your level, even as a note-taker. Watch how the senior people handle disagreement and silence, and write down one thing you will copy.',
            mistake: 'Copying their confidence without their preparation, which is how people get caught out.'
          }
        ],
        standard: 'People check what you think before they decide.',
        milestone: {
          name: 'Room gate',
          criteria: [
            'You ran a meeting with people more senior than you and got a decision',
            'Two peers describe your presence as calm and credible, unprompted',
            'You opened and closed a high-stakes meeting on purpose'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Fillers per minute', method: 'Counted from recordings. Target under two.' },
      { name: 'Stage reps', method: 'Live audiences per month. Under two and progress stalls.' },
      { name: 'Next-day recall', method: 'How many listeners can state your point 24 hours later.' },
      { name: 'Tape reviewed', method: 'Minutes of your own delivery you actually watched this week.' }
    ],
    failureModes: [
      { name: 'Rehearsing in your head', fix: 'Out loud, standing, recorded, or it did not happen.' },
      { name: 'Refusing to watch the tape', fix: 'Watch on mute first, then listen with the screen off. Splitting the channels removes most of the cringe.' },
      { name: 'Hiding behind slides', fix: 'One slide per two minutes, and never a slide people must read while you talk.' },
      { name: 'Only easy audiences', fix: 'Go one size up every month. Comfortable rooms stop teaching.' }
    ],
    arena: [
      'Toastmasters or any local speaker meetup, for volume',
      'Every internal presentation nobody else wants',
      'Conference calls for papers: five applications a quarter',
      'Your own recordings, which are the most honest audience you have'
    ],
    library: [
      { title: 'Impro', author: 'Keith Johnstone', note: 'Status, and how people read it in a room. Odd book, unusually useful.' },
      { title: 'Resonate', author: 'Nancy Duarte', note: 'Presentation built as a narrative shape.' },
      { title: 'Talk Like TED', author: 'Carmine Gallo', note: 'Reverse-engineered structure of talks that travel.' },
      { title: 'The Charisma Myth', author: 'Olivia Fox Cabane', note: 'Presence broken into parts you can actually practise.' }
    ]
  },

  /* ----------------------------------------------------------------- DESIGN */
  {
    id: 'design-communication',
    name: 'Design and Visual Communication',
    discipline: 'Communication',
    tagline: 'Stop your work being dismissed before it is read.',
    thesis:
      'People judge how serious your work is within about a second of seeing it, long before they read a ' +
      'word. That judgement is mostly made on spacing, type and hierarchy, all of which are mechanical and ' +
      'learnable. The talent story is mostly wrong. What separates amateur work from professional work is ' +
      'usually four or five specific habits.',
    hours: { functional: 50, competent: 200, professional: 700, elite: 2500 },
    proofs: {
      functional: 'Your documents, decks and screens look like a professional made them.',
      competent: 'You can design a product or a brand that holds up next to funded competitors.',
      professional: 'People pay you for design, and other people build against your systems.',
      elite: 'Your work has a recognisable point of view and other designers study it.'
    },
    entryCheck: ['Any design tool, including the one you already have', 'Work of your own that needs to look credible'],
    pillars: [
      {
        id: 'fundamentals',
        name: 'Visual Fundamentals',
        weight: 0.24,
        specialization: 'Layout and typography',
        objective: 'Fix the four things that make work look amateur.',
        competencies: [
          'One spacing scale, used consistently',
          'Type hierarchy: size, weight, line length, line height',
          'Restraint with colour, and enough contrast to read',
          'Deciding what the eye should hit first, second and third'
        ],
        stages: [
          {
            name: 'Black and white',
            work: 'Work with no colour at all. Colour hides weak hierarchy and you need to see yours clearly.',
            check: 'Three layouts that work in black, white and grey.'
          },
          {
            name: 'System',
            work: 'Commit to one spacing scale and one type scale and apply them everywhere without exceptions.',
            check: 'A document where every measurement comes from the scale.'
          },
          {
            name: 'Colour last',
            work: 'Add colour deliberately, three values or fewer, each with a reason.',
            check: 'A palette you can justify choice by choice.'
          }
        ],
        drills: [
          {
            name: 'Spacing discipline',
            dose: 'every artefact',
            protocol: 'Use one spacing scale: 4, 8, 16, 24, 48. Every gap on the page is one of those numbers. Inconsistent spacing is the single loudest amateur signal and it is free to fix.',
            mistake: 'Eyeballing gaps. Two gaps that differ by three pixels look like a mistake even to people who cannot say why.'
          },
          {
            name: 'Type only',
            dose: '3 layouts',
            protocol: 'Design three layouts using type, black, white and space, with no colour, no icons and no images. If the hierarchy does not work here, colour will not save it.',
            mistake: 'Reaching for a graphic to fix a layout problem that is actually a hierarchy problem.'
          },
          {
            name: 'The squint test',
            dose: 'every screen',
            protocol: 'Step back three metres or blur the screen until you cannot read words. What you can still see is your hierarchy. If everything blurs into one grey mass, nothing is leading.',
            mistake: 'Testing at 100% zoom on a large monitor, which is not how anyone sees it.'
          },
          {
            name: 'Redesign audit',
            dose: '1 per week',
            protocol: 'Take something you made, list five specific flaws in writing, fix them, and put the versions side by side. Keep both. Seeing your own before-and-after is what sustains the practice.',
            mistake: 'Redesigning by feel and never writing down what was wrong, so you make the same mistake next month.'
          }
        ],
        standard: 'Someone senior looks at it and does not think about how it looks.',
        milestone: {
          name: 'Fundamentals gate',
          criteria: [
            'A document or interface where every measurement comes from one scale',
            'Hierarchy survives the squint test',
            'Three colours or fewer, each with a stated reason'
          ]
        }
      },
      {
        id: 'interface',
        name: 'Interface Design',
        weight: 0.24,
        specialization: 'Product and UI',
        objective: 'Design things people use without being told how.',
        competencies: [
          'Grids and how layouts behave at different widths',
          'Components and variants instead of one-off screens',
          'Empty, loading, error and success states',
          'Watching real people use it without helping them'
        ],
        stages: [
          {
            name: 'Happy path',
            work: 'Get the main flow working properly before anything else.',
            check: 'The core task is designed end to end.'
          },
          {
            name: 'Every state',
            work: 'Design the unglamorous states. This is where amateur work is most obviously identifiable.',
            check: 'Empty, loading, error and success designed for every screen.'
          },
          {
            name: 'Watch it fail',
            work: 'Put it in front of five people and stay quiet while they struggle.',
            check: 'Five users completed the core task unaided.'
          }
        ],
        drills: [
          {
            name: 'All states',
            dose: 'every screen',
            protocol: 'For each screen, design what it looks like empty, loading, broken and successful. Empty states in particular are where new users live and where most products abandon them.',
            mistake: 'Designing with realistic-looking placeholder data, which hides the fact that a real new account has nothing in it.'
          },
          {
            name: 'Five-user test',
            dose: 'per project',
            protocol: 'Watch five people attempt the core task. Say nothing at all, even when they struggle, especially when they struggle. Write down every hesitation and where their hand went first.',
            mistake: 'Explaining. The moment you explain, you have lost the data you were there to collect.'
          },
          {
            name: 'Component extraction',
            dose: '1 system',
            protocol: 'Take a finished design and pull it apart into reusable components with defined variants and states. You will find inconsistencies you did not know were there.',
            mistake: 'Making a component for everything, including things used once, which slows you down without helping.'
          },
          {
            name: 'The five-second first look',
            dose: '5 people per screen',
            protocol: 'Show a screen for five seconds, take it away, then ask what it is for and what they would do next. If they cannot answer, the hierarchy is wrong regardless of how it looks.',
            mistake: 'Asking whether they liked it. Nobody can answer that usefully and everybody will say yes.'
          }
        ],
        standard: 'People finish the task without asking you anything.',
        milestone: {
          name: 'Usability gate',
          criteria: [
            'Five users completed the core task with no help',
            'Every screen has its empty, loading and error states designed',
            'A small component system in use across screens'
          ]
        }
      },
      {
        id: 'brand',
        name: 'Brand and Identity',
        weight: 0.2,
        specialization: 'Identity systems',
        objective: 'Make a thing look like it came from somewhere specific.',
        competencies: [
          'Turning a position into visual decisions you can defend',
          'Type pairing and colour systems that hold across surfaces',
          'Knowing your category conventions well enough to break one on purpose',
          'Keeping every surface recognisably the same company'
        ],
        stages: [
          {
            name: 'Reference',
            work: 'Collect and annotate work you admire until you can say precisely what works in each piece.',
            check: 'Thirty annotated references, each with a specific note.'
          },
          {
            name: 'Directions',
            work: 'Produce genuinely different directions rather than three versions of your first idea.',
            check: 'Three directions a stranger would call different.'
          },
          {
            name: 'Apply',
            work: 'Roll the chosen direction across every surface and fix what does not hold.',
            check: 'Three surfaces that clearly belong together.'
          }
        ],
        drills: [
          {
            name: 'Annotated reference board',
            dose: '30 references',
            protocol: 'Collect thirty references and write one specific technical note on each: what the type is doing, where the space is, why the colour works. Vague inspiration produces vague work.',
            mistake: 'Collecting things you like without being able to say why, which just imports someone else\'s decisions.'
          },
          {
            name: 'Three real directions',
            dose: 'per identity',
            protocol: 'Produce three directions that a stranger would describe as genuinely different, then choose. Your first idea is almost always the category default that everyone else also arrived at.',
            mistake: 'Making one direction and two deliberately weak options to make the choice easy.'
          },
          {
            name: 'Surface line-up',
            dose: 'monthly',
            protocol: 'Put every surface side by side: site, deck, invoice, email, social. Anything that looks like a different company gets fixed this week.',
            mistake: 'Only checking the surfaces you enjoy designing, so the invoice and the error emails drift.'
          },
          {
            name: 'Justify every choice',
            dose: 'per project',
            protocol: 'Write one line per decision explaining how it follows from the positioning. Anything you cannot justify is decoration, which is fine, as long as you know it is decoration.',
            mistake: 'Justifying after the fact with a story you invented once the work was done.'
          }
        ],
        standard: 'You can defend every visual choice against the positioning without inventing a reason.',
        milestone: {
          name: 'Identity gate',
          criteria: [
            'A written visual system: type, colour, spacing, tone',
            'Three surfaces that clearly belong to the same thing',
            'Every choice justified against the positioning'
          ]
        }
      },
      {
        id: 'information',
        name: 'Information Design',
        weight: 0.18,
        specialization: 'Charts and diagrams',
        objective: 'Make complicated material understandable at a glance.',
        competencies: [
          'Choosing the right chart and not lying with the axis',
          'Removing everything that is not carrying information',
          'Diagramming a system so a newcomer can follow it',
          'Structuring a document so the shape carries the argument'
        ],
        stages: [
          {
            name: 'Strip',
            work: 'Rebuild bad charts honestly and see how much of the original was decoration.',
            check: 'Five charts rebuilt, with notes on what each original obscured.'
          },
          {
            name: 'One message',
            work: 'Make every chart prove exactly one sentence.',
            check: 'Every chart in a document has its sentence written above it.'
          },
          {
            name: 'Test comprehension',
            work: 'Give diagrams to people who do not know the system and find where they get lost.',
            check: 'A newcomer read your diagram correctly with no narration.'
          }
        ],
        drills: [
          {
            name: 'Chart rebuild',
            dose: '2 per week',
            protocol: 'Find a bad chart in the wild and rebuild it honestly. Write one line on what the original hid: a truncated axis, a 3D effect, a cherry-picked window.',
            mistake: 'Making it prettier without making it more truthful.'
          },
          {
            name: 'One sentence per chart',
            dose: 'every chart',
            protocol: 'Write the sentence the chart proves and put it in the title. If you need two sentences, you need two charts.',
            mistake: 'Titling a chart with its variables ("Revenue by region, 2024") instead of its finding.'
          },
          {
            name: 'Diagram the system',
            dose: '1 per week',
            protocol: 'Draw something you understand well as a diagram, hand it to someone who does not, and watch where they get stuck. Fix that spot and repeat.',
            mistake: 'Explaining it while they read, which means you learn nothing about the diagram.'
          },
          {
            name: 'Data-ink cut',
            dose: '1 chart',
            protocol: 'Remove gridlines, borders, backgrounds, legends and labels one at a time until the chart stops being readable, then put back only the last thing you removed.',
            mistake: 'Stopping at the first removal because it feels sparse. Sparse is the target.'
          }
        ],
        standard: 'Someone gets it in one look, without you standing next to them.',
        milestone: {
          name: 'Clarity gate',
          criteria: [
            'A chart that changed how someone understood the data',
            'A diagram a newcomer read correctly with no narration',
            'Every visual carries exactly one message'
          ]
        }
      },
      {
        id: 'taste',
        name: 'Taste and Critique',
        weight: 0.14,
        specialization: 'Craft and critique',
        objective: 'Develop a point of view and the vocabulary to defend it.',
        competencies: [
          'Critique in order: what you see, then what you ask, then what you suggest',
          'Technical language for what is happening in a piece of work',
          'Taking criticism without either collapsing or arguing',
          'Knowing when something is finished'
        ],
        stages: [
          {
            name: 'Look',
            work: 'Study excellent work daily and write down what is actually happening in it.',
            check: 'Thirty days of notes, each with three technical observations.'
          },
          {
            name: 'Exchange',
            work: 'Trade critique weekly with someone whose work you respect.',
            check: 'Eight critique exchanges completed.'
          },
          {
            name: 'Ship anyway',
            work: 'Publish on fixed dates and take the critique afterwards rather than instead.',
            check: 'A public portfolio you keep current.'
          }
        ],
        drills: [
          {
            name: 'Daily study',
            dose: '10 minutes',
            protocol: 'Study one piece of excellent work and write three technical observations. Not "nice", but what the type is doing, how the space is distributed, where your eye went first and why.',
            mistake: 'Scrolling design galleries and calling it study. Ten minutes on one piece beats an hour of scrolling.'
          },
          {
            name: 'Critique exchange',
            dose: 'weekly',
            protocol: 'Trade work with a peer. Give observation first, then a question, then a suggestion, in that order. The order matters because it stops you prescribing before you understand.',
            mistake: 'Leading with the fix, which usually solves your problem rather than theirs.'
          },
          {
            name: 'Version compare',
            dose: 'per project',
            protocol: 'Keep version one, version five and the final side by side. This is the clearest evidence you will get that the practice is working.',
            mistake: 'Deleting early versions out of embarrassment, which removes your only progress record.'
          },
          {
            name: 'Fixed ship date',
            dose: 'per project',
            protocol: 'Set the publish date before you start and hold it. Critique after publishing, never as a reason to delay.',
            mistake: 'Treating "not ready" as a design judgement when it is usually just discomfort.'
          }
        ],
        standard: 'You can say what is wrong with a piece of work in specific terms, including your own.',
        milestone: {
          name: 'Taste gate',
          criteria: [
            'A portfolio a stranger would call professionally made',
            'You can critique work in specific technical language',
            'You ran a critique session that improved someone else\'s work'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Artefacts shipped', method: 'Finished, published pieces per month.' },
      { name: 'Unaided task completion', method: 'Users who finish the core task without help.' },
      { name: 'Critique rounds', method: 'Rounds of outside critique per project.' },
      { name: 'Study streak', method: 'Consecutive days of ten-minute deliberate study.' }
    ],
    failureModes: [
      { name: 'Decorating instead of structuring', fix: 'Solve it in black and white first. If it does not work there, colour is hiding the problem.' },
      { name: 'Copying trends you do not understand', fix: 'For every borrowed element, write down why it works where you found it.' },
      { name: 'Never testing with users', fix: 'Five people per project, watched in silence.' },
      { name: 'Polishing instead of shipping', fix: 'Fixed ship dates. Critique after publication.' }
    ],
    arena: [
      'Real projects with real users or clients',
      'Weekly critique with someone whose work is better than yours',
      'A public portfolio kept current',
      'Communities that give technical feedback rather than encouragement'
    ],
    library: [
      { title: 'The Non-Designer\'s Design Book', author: 'Robin Williams', note: 'Four principles that fix most amateur work. Read it in an afternoon.' },
      { title: 'Refactoring UI', author: 'Adam Wathan and Steve Schoger', note: 'Specific interface decisions you can apply the same day.' },
      { title: 'The Visual Display of Quantitative Information', author: 'Edward Tufte', note: 'The standard for charts that do not mislead.' },
      { title: 'Thinking with Type', author: 'Ellen Lupton', note: 'Typography fundamentals with worked examples.' }
    ]
  }
]);
