/*
 * sessions-01-communication.js
 *
 * The step-by-step work for acquire and produce sessions, keyed by
 * "disciplineId/pillarId". Drill sessions already carry a protocol; these are
 * the other two thirds of the week, which previously only had a topic label.
 *
 *   study[]  what an acquire session actually does. Ends with something written.
 *   make[]   what a produce session actually makes, and how you know it worked.
 *
 * Rules for writing these: name the tool, name the number, name the artefact.
 * If a step could be read and still leave someone asking "but what do I do",
 * it is not finished.
 */

window.PILLAR_SESSIONS = Object.assign(window.PILLAR_SESSIONS || {}, {

  /* ------------------------------------------------------- WRITING */

  'persuasive-writing/clarity': {
    study: [
      {
        task: 'Find your own four bad habits',
        steps: [
          'Open something you wrote in the last month. At least 500 words. A real email or document, not something you write for this exercise.',
          'Highlight every sentence where the subject and its verb are more than six words apart.',
          'Highlight every abstract noun ending in -tion, -ment, -ance or -ity.',
          'Highlight every hedge: "somewhat", "I think", "perhaps", "it seems".',
          'Count each category. Write the four numbers at the top of your log. Those are your baseline and you will re-count in the gate week.'
        ]
      },
      {
        task: 'Take apart a writer who is better than you',
        steps: [
          'Pick 500 words by someone whose prose you envy. A columnist, an essayist, a technical writer.',
          'Mark the length of every sentence in the margin. Look at the pattern of long and short.',
          'Find the three shortest sentences. Write down what each one is doing: landing a point, changing direction, or giving the reader a rest.',
          'Copy the paragraph you like most by hand, then write one of your own paragraphs in the same shape.'
        ]
      }
    ],
    make: [
      {
        task: 'A 400-word piece that survives being read aloud',
        steps: [
          'Pick something you actually need to write this week. An update, a proposal, a post.',
          'Draft it fast, 400 words, without editing. Set a 20-minute timer and do not stop.',
          'Leave it alone. Do something else for at least an hour, or finish the session and edit next time.',
          'Edit against your four habit counts from the study session. Cut 20% of the words.',
          'Read the final version out loud, standing up. Mark every stumble and fix it.'
        ],
        check: 'You read it aloud from start to finish without stumbling once.'
      },
      {
        task: 'A rewrite that is measurably shorter and no thinner',
        steps: [
          'Take a document that already exists and matters: a page from your team wiki, an old proposal, a long email thread you have to summarise.',
          'Rewrite it at 60% of the original length.',
          'Give both versions to someone who knows the subject and ask which is clearer. Do not tell them which is yours.',
          'Write down what you cut and which category it fell into.'
        ],
        check: 'A reader who knows the material picked the short version, or told you exactly what it lost.'
      }
    ]
  },

  'persuasive-writing/structure': {
    study: [
      {
        task: 'Reduce three published arguments to their bones',
        steps: [
          'Find three pieces arguing for something: an op-ed, a strategy memo, a well-argued blog post.',
          'For each, write the claim in one sentence, then the reasons underneath it as bullets.',
          'Mark every place the author asserted something instead of supporting it.',
          'Write one line per piece: what would have to be false for the argument to collapse.'
        ]
      },
      {
        task: 'Learn what a decision-maker actually reads',
        steps: [
          'Find two documents that a decision got made from at your work. Ask a colleague if you do not have any.',
          'Note where the recommendation appears: first line, buried, or missing.',
          'Note the length, and how long it would take to read at a normal pace.',
          'Write the three-sentence version of each. That version is what the reader actually retained.'
        ]
      }
    ],
    make: [
      {
        task: 'A one-page decision memo on a real decision',
        steps: [
          'Pick a decision that is genuinely open at your work or in your own life.',
          'Write, in this order: the recommendation, three reasons, the strongest objection, your answer to it, and what it costs if you are wrong.',
          'One page. No appendix. If it runs over, cut a reason rather than shrinking the type.',
          'Send it to somebody who has to act on it, or who disagrees with you.'
        ],
        check: 'Someone read it and either made the decision or gave you a specific objection you had not answered.'
      },
      {
        task: 'The argument against yourself',
        steps: [
          'Take the memo you wrote and write the opposing case in 300 words, as well as you can.',
          'Show it to someone who holds that position and ask if you have represented it fairly.',
          'Write the two sentences that actually defeat the opposing case.',
          'If you cannot find two, revise your original recommendation. That is the useful outcome, not a failure.'
        ],
        check: 'Someone who disagrees with you said your version of their argument was fair.'
      }
    ]
  },

  'persuasive-writing/audience': {
    study: [
      {
        task: 'Collect twenty sentences your readers actually said',
        steps: [
          'Pick your source: support tickets, reviews of a competitor, a subreddit, sales call notes, or ten minutes of a recorded customer call.',
          'Copy out twenty verbatim lines where someone describes the problem in their own words.',
          'Circle every phrase that appears more than once across the twenty.',
          'Write the five most repeated phrases at the top of your log. These are the words you will use.'
        ]
      },
      {
        task: 'Work out the order the doubts arrive in',
        steps: [
          'Pick one thing you want a reader to do: buy, sign up, approve, reply.',
          'List every reason they would say no. Aim for eight, however small.',
          'Order them by when the doubt would occur to a reader, not by how easy they are to answer.',
          'Write one sentence against each. Keep the list next to you while you draft.'
        ]
      }
    ],
    make: [
      {
        task: 'The same pitch written for two different readers',
        steps: [
          'Write 200 words aimed at a sceptical expert who knows the field.',
          'Write 200 words aimed at a busy generalist who controls the budget.',
          'Put them side by side and list every difference: vocabulary, what you assumed, what you led with, what you cut.',
          'That list is your model of both readers. Keep it.'
        ],
        check: 'You can state the three things that changed and why each one changed.'
      },
      {
        task: 'A piece that gets a measurable response',
        steps: [
          'Write something with one clear action attached: reply, sign up, book a call, approve.',
          'Build it only from the vocabulary you harvested, and handle the top three objections inside the text.',
          'Send it to at least twenty real people.',
          'Count the responses. Write the number in your log with the date.'
        ],
        check: 'You have a real number: responses per hundred readers.'
      }
    ]
  },

  'persuasive-writing/longform': {
    study: [
      {
        task: 'Chart the shape of an essay that held you',
        steps: [
          'Pick a long piece you read all the way through recently.',
          'Split it into sections. For each, note the word count and what it does: sets up, complicates, evidences, turns, lands.',
          'Mark where the piece stops telling you things and starts changing your mind. That is the turn.',
          'Sketch the same shape as an outline for something of your own.'
        ]
      },
      {
        task: 'Twelve ways into the same piece',
        steps: [
          'Take the piece you are about to write.',
          'Write twelve different opening paragraphs: a question, a scene, a flat claim, a number, a confession, an objection, a line of dialogue, a definition, a prediction, a complaint, an anecdote, a refusal.',
          'Read all twelve cold, an hour later.',
          'Pick one and write a sentence explaining why. Keep the other eleven; two of them are openings for future pieces.'
        ]
      }
    ],
    make: [
      {
        task: 'Publish 2,000 words where strangers can see them',
        steps: [
          'Use the shape you charted and the opening you chose.',
          'Draft in one sitting without editing. Aim for 2,500 words, knowing you will cut.',
          'Edit cold, at least a day later. Delete the first three paragraphs and check whether it is worse.',
          'Publish it somewhere public with a date attached. Tell at least one person it is up.'
        ],
        check: 'It is published at a URL, and at least one stranger responded.'
      },
      {
        task: 'Find out where people stopped reading',
        steps: [
          'Get read-through data if your platform gives it, or ask five readers where they drifted.',
          'Mark the paragraph where attention dropped.',
          'Work out what that paragraph was doing: over-explaining, repeating, or changing subject without warning.',
          'Rewrite that section and republish.'
        ],
        check: 'You can name the exact paragraph where readers left, and you fixed it.'
      }
    ]
  },

  'persuasive-writing/voice': {
    study: [
      {
        task: 'Find the borrowed lines in your own writing',
        steps: [
          'Open something you wrote at least 30 days ago. Long enough that you have forgotten the sentences.',
          'Mark every line that sounds like someone else, or like a LinkedIn post, or like nobody in particular.',
          'Count what is left. That fraction is how much of your voice is actually yours.',
          'Rewrite three of the borrowed lines as things you would say out loud to a friend.'
        ]
      },
      {
        task: 'Work out where your readers are',
        steps: [
          'List ten places your intended readers already gather: newsletters, publications, podcasts, communities.',
          'For each, note who decides what gets in and what they published most recently.',
          'Rank by how reachable they are.',
          'Draft one pitch to the top-ranked one. Send it this week.'
        ]
      }
    ],
    make: [
      {
        task: 'Write your stance and defend it in public',
        steps: [
          'Write the twenty words describing something you believe that most people in your field do not.',
          'Write a 1,000-word piece defending it, including the strongest counter-argument.',
          'Publish it and send it directly to three people who might disagree.',
          'Log what came back. Being argued with is the point.'
        ],
        check: 'You published a position someone could disagree with, and at least one person did.'
      },
      {
        task: 'Place a piece somewhere you do not own',
        steps: [
          'Pitch the piece to a newsletter, publication or community with an existing audience.',
          'Follow up once after a week if you hear nothing.',
          'If it is declined, send it to the next one on your list the same day.',
          'Log every pitch and outcome. Placement rates are low and the log stops you taking it personally.'
        ],
        check: 'A piece of yours appeared in front of an audience you did not build.'
      }
    ]
  },

  /* ------------------------------------------------------ SPEAKING */

  'speaking-presence/mechanics': {
    study: [
      {
        task: 'Watch three speakers with the sound off, then with the picture off',
        steps: [
          'Pick three recorded talks: one you admire, one you find dull, one from your own field.',
          'Watch each on mute for two minutes. Write what their hands, feet and eyes are doing.',
          'Listen to each with the screen off. Note pace, where they pause, and whether their pitch drops at the end of sentences.',
          'Write the three things you want to steal and the two you want to avoid.'
        ]
      },
      {
        task: 'Measure your own baseline on tape',
        steps: [
          'Set your phone at eye height, about two metres away, landscape.',
          'Talk for three minutes about a project you know well, with no preparation.',
          'Play it back with a tally sheet. Count fillers, count how many times you looked away, and time your longest pause.',
          'Write the three numbers in your log. You will repeat this exact test in the gate week.'
        ]
      }
    ],
    make: [
      {
        task: 'A clean five-minute recording',
        steps: [
          'Choose a topic you could talk about with no notes.',
          'Record five minutes. Watch it back, tally the fillers, and write the count.',
          'Re-record, replacing each filler with a full second of silence. It will feel far too long and will not sound long.',
          'Repeat until you are under two fillers per minute. Expect three or four takes.',
          'Keep the best take in a folder with the date. This is your progress record.'
        ],
        check: 'Under two fillers per minute on a five-minute take, on tape.'
      },
      {
        task: 'Say something to actual humans',
        steps: [
          'Find a live audience this week: a team meeting, a meetup, a stand-up, a family dinner if nothing else exists.',
          'Speak for at least three minutes with a point you planned in advance.',
          'Afterwards write down what your body did when you started, and how long it took to settle.',
          'Ask one person what they remember. Compare it to what you meant to say.'
        ],
        check: 'You spoke to real people and can name the gap between what you said and what they heard.'
      }
    ]
  },

  'speaking-presence/talkdesign': {
    study: [
      {
        task: 'Reverse-engineer a talk that travelled',
        steps: [
          'Pick a talk that people quote. Watch it once normally.',
          'Watch it again with a timer, writing what happens every two minutes.',
          'Find the one sentence the whole talk exists to deliver. Write it down.',
          'Count the slides and note how many had more than six words.'
        ]
      },
      {
        task: 'Collect the openings that work',
        steps: [
          'Watch the first thirty seconds of six talks. Stop each at thirty seconds.',
          'Write down which ones made you want to keep watching, and what the speaker did in that time.',
          'Note how many started with their name and job title, and whether any of those held you.',
          'Write three openings for your own talk using the techniques that worked.'
        ]
      }
    ],
    make: [
      {
        task: 'Build a ten-minute talk from six slides',
        steps: [
          'Write the one sentence you want repeated afterwards. Put it at the top of the page.',
          'Outline three movements that serve it. Cut anything that does not.',
          'Build six slides, maximum six words each. No slide the audience must read while you talk.',
          'Rehearse standing, out loud, timed. Three times minimum.',
          'Record the third run and watch it back.'
        ],
        check: 'You delivered it from six slides without reading them, inside the time.'
      },
      {
        task: 'Cut the talk in half',
        steps: [
          'Take your finished ten-minute talk and deliver it in five without dropping the core idea.',
          'Record both versions.',
          'Watch them back to back and write down what the five-minute version lost, and what it gained.',
          'Decide honestly which one you would rather give.'
        ],
        check: 'A five-minute version exists on tape and still lands the same point.'
      }
    ]
  },

  'speaking-presence/pressure': {
    study: [
      {
        task: 'Study how people handle hostile questions',
        steps: [
          'Find a recorded Q&A where someone got a difficult question: a press conference, an earnings call, a conference panel.',
          'Write down the first sentence of each answer. Note whether it answered the question or delayed.',
          'Note what the good ones did with their hands and their pace when the question landed.',
          'Write the three phrases you want available when you are caught out.'
        ]
      },
      {
        task: 'Write your own hardest questions',
        steps: [
          'Take the thing you will be presenting. List the ten questions you least want to be asked.',
          'Mark the three you cannot currently answer.',
          'Do the work to answer two of them. For the third, write the honest "I do not know, here is how I would find out" version.',
          'Rehearse all ten answers out loud, under 45 seconds each.'
        ]
      }
    ],
    make: [
      {
        task: 'Ten hostile questions on tape',
        steps: [
          'Give someone your ten questions and ask them to fire them at you, out of order, interrupting where they can.',
          'Record it. Answer each in under 45 seconds with the answer in the first sentence.',
          'Watch it back and mark every answer where you padded before getting to the point.',
          'Run the worst three again.'
        ],
        check: 'Fifteen minutes of unscripted questions on tape, answer-first, no evasion.'
      },
      {
        task: 'Present somewhere the stakes are real',
        steps: [
          'Find a room one size larger or one level more senior than is comfortable. Volunteer for it.',
          'Present, then take questions without a script.',
          'Immediately afterwards write three lines: what your body did, which question was hardest, what you would change.',
          'Ask one person in the room for one specific piece of feedback.'
        ],
        check: 'You took unscripted questions in a room that mattered and wrote up what happened.'
      }
    ]
  },

  'speaking-presence/narrative': {
    study: [
      {
        task: 'Mine your own life for twelve stories',
        steps: [
          'List twelve things that happened to you at work or elsewhere that changed how you think.',
          'For each, write one line on what happened and one line on the point it proves.',
          'Discard any where you cannot name the point. A good anecdote that proves nothing wastes the room.',
          'Pick the three strongest to write up in full.'
        ]
      },
      {
        task: 'Study how detail creates belief',
        steps: [
          'Find a story in a book or article that you believed completely.',
          'Circle every concrete detail: names, numbers, times, objects, weather.',
          'Count them. Note how few there usually are, and how specific.',
          'Take one of your own stories and add exactly three specifics.'
        ]
      }
    ],
    make: [
      {
        task: 'Three stories, timed to ninety seconds',
        steps: [
          'Write out three of your stories in full, under 200 words each, with the point at the bottom.',
          'Rehearse each aloud with a timer until it lands in 90 seconds.',
          'Record all three in one take each.',
          'Tell one of them to a real person this week and watch their face for where attention moves.'
        ],
        check: 'Three stories delivered in 90 seconds each, on tape, each landing a distinct point.'
      },
      {
        task: 'Attach a story to an argument, cold',
        steps: [
          'Have someone name an argument you might have to make.',
          'You get ten seconds to choose a story from your bank and 90 seconds to tell it so it lands the point.',
          'Do this five times with five different arguments.',
          'Note which stories are versatile and which only fit one situation.'
        ],
        check: 'You pulled the right story out of your bank on ten seconds notice, more than once.'
      }
    ]
  },

  'speaking-presence/presence': {
    study: [
      {
        task: 'Watch who actually decides in a meeting',
        steps: [
          'Sit in a meeting and take notes on people rather than content.',
          'Write who spoke most, who spoke least, and who the room looked at before agreeing.',
          'Note what the decider was worried about, judging by what they asked.',
          'Write three lines afterwards: who decided, what moved them, what you would change about your own contribution.'
        ]
      },
      {
        task: 'Audit your own airtime',
        steps: [
          'In your next three meetings, estimate what share of the talking was yours. Write it down immediately after.',
          'Note how many of your contributions started with the conclusion, and how many built up to it.',
          'Note how many times you spoke when you had nothing new to add.',
          'Set a target share for next week.'
        ]
      }
    ],
    make: [
      {
        task: 'Run a meeting to a decision',
        steps: [
          'Take a meeting you attend and offer to run it.',
          'Write the opening sentence and the closing sentence in advance. The opening states what the meeting is for; the closing states what was decided and who does what.',
          'Run it. Say half of what you want to say. Make your first sentence the conclusion each time.',
          'Send the decision in writing within an hour.'
        ],
        check: 'A decision was made, written down, and the people affected know what happens next.'
      },
      {
        task: 'Get in a room above your level',
        steps: [
          'Find a meeting one or two levels above you and ask to attend, even as a note-taker.',
          'Contribute exactly once, with something prepared.',
          'Write down how the senior people handled disagreement and silence.',
          'Name one behaviour you will copy and one you will not.'
        ],
        check: 'You contributed once in a senior room and can name what you learned from watching.'
      }
    ]
  },

  /* -------------------------------------------------------- DESIGN */

  'design-communication/fundamentals': {
    study: [
      {
        task: 'Measure the spacing in work that looks professional',
        steps: [
          'Take a screenshot of an interface or document that looks expensive.',
          'Use any measuring tool, or just a ruler on a printout, to measure six gaps: between paragraphs, around headings, inside buttons, page margins.',
          'Write the numbers down. You will find they are nearly all multiples of 4 or 8.',
          'Write your own scale: 4, 8, 16, 24, 48. Pin it where you can see it.'
        ]
      },
      {
        task: 'Find the four things wrong with your own work',
        steps: [
          'Open something you made: a deck, a document, a screen.',
          'Check alignment: is there an invisible line every element sits against? Mark every element that misses it.',
          'Check spacing: measure five gaps. Mark any that are not on your scale.',
          'Check hierarchy: squint until it blurs. Write what you see first, second, third. If it is all one grey mass, that is the problem.',
          'Check colour: count your colours. If it is more than three, list which ones you can remove.'
        ]
      }
    ],
    make: [
      {
        task: 'Rebuild one artefact on a strict system',
        steps: [
          'Take the piece you audited. Rebuild it using only your spacing scale and two type sizes.',
          'Work in black, white and grey only. No colour at all.',
          'Put the before and after side by side.',
          'Show both to someone and ask which looks more professional, without telling them which is new.'
        ],
        check: 'Every measurement in the new version comes from your scale, and it passes the squint test.'
      },
      {
        task: 'Three type-only layouts',
        steps: [
          'Design three different layouts for the same content, using type, space, black and white.',
          'Vary what leads: a huge headline, a strong left rule, a wide margin with a small block of text.',
          'Print them or view them at actual size.',
          'Pick the strongest and write one sentence on why it works.'
        ],
        check: 'Three genuinely different layouts exist, and the hierarchy works in all three without colour.'
      }
    ]
  },

  'design-communication/interface': {
    study: [
      {
        task: 'Collect the states nobody designs',
        steps: [
          'Pick three apps you use. For each, find the empty state: a new account, a list with nothing in it, a search with no results.',
          'Screenshot them. Note which ones tell you what to do next and which just show nothing.',
          'Do the same for one error state. Turn off your wifi and see what happens.',
          'Write what a good empty state does, in three bullets.'
        ]
      },
      {
        task: 'Watch someone use something cold',
        steps: [
          'Pick an interface you did not build. Sit next to someone using it for the first time.',
          'Give them one task and say nothing else. Nothing, even when they struggle.',
          'Write down every hesitation and where their hand or eye went first.',
          'Note the moment they nearly gave up. That moment is what interface design is for.'
        ]
      }
    ],
    make: [
      {
        task: 'Design every state of one screen',
        steps: [
          'Pick the most important screen in something you are building.',
          'Design it four ways: with no data, while loading, with an error, and full of real content.',
          'Write the exact words for the empty state and the error. Not "Something went wrong".',
          'Build them, or mock them up properly. Half-drawn does not count.'
        ],
        check: 'All four states exist and a stranger would know what to do in each.'
      },
      {
        task: 'Five people, one task, no help',
        steps: [
          'Write down the one task: "sign up and create your first project".',
          'Get five people to attempt it while you watch in silence.',
          'Record where each one hesitated, in seconds and location.',
          'Fix the single most common sticking point, then test with two more people.'
        ],
        check: 'Five people attempted it unaided and you fixed the problem the majority hit.'
      }
    ]
  },

  'design-communication/brand': {
    study: [
      {
        task: 'Build an annotated reference board',
        steps: [
          'Collect thirty pieces of work you admire in the same category as yours.',
          'For each, write one specific technical note: what the type is doing, where the space is, why the colour works.',
          'Delete any where you cannot write something specific. Vague admiration is not usable.',
          'Group what is left. The groups are your possible directions.'
        ]
      },
      {
        task: 'Learn your category conventions',
        steps: [
          'Look at eight competitors or neighbours in your space.',
          'Write down what they all do: the same blue, the same sans-serif, the same hero layout.',
          'Pick one convention you could break on purpose and write down what breaking it would signal.',
          'Pick two you should keep, because breaking them would just confuse people.'
        ]
      }
    ],
    make: [
      {
        task: 'Three directions that are actually different',
        steps: [
          'Produce three visual directions for the same thing. Different type, different colour logic, different feel.',
          'Apply each to the same two surfaces so they can be compared fairly.',
          'Show all three to five people and ask what each one says about the company.',
          'Choose one and write a paragraph on why, referencing the positioning.'
        ],
        check: 'A stranger would call the three directions genuinely different, and you can defend the one you chose.'
      },
      {
        task: 'Write the system down and apply it everywhere',
        steps: [
          'Document the system: type scale, colours with hex values, spacing scale, tone of voice in three bullets.',
          'Apply it to three surfaces: your site, a document template, and one small thing like an email signature or invoice.',
          'Line all three up side by side.',
          'Fix anything that looks like it came from a different company.'
        ],
        check: 'Three surfaces sit side by side and obviously belong together.'
      }
    ]
  },

  'design-communication/information': {
    study: [
      {
        task: 'Find what a bad chart is hiding',
        steps: [
          'Find three charts in the news or in a company report.',
          'For each, check the y-axis: does it start at zero, and should it?',
          'Check the time window: what happens if you extend it backwards?',
          'Write one line per chart on what the design obscured, deliberately or not.'
        ]
      },
      {
        task: 'Watch a diagram fail',
        steps: [
          'Take a system diagram from your own work or from documentation you use.',
          'Give it to someone who does not know the system and ask them to explain it back.',
          'Say nothing while they try. Write down every point where they hesitated or guessed.',
          'Mark the two places on the diagram that caused most confusion.'
        ]
      }
    ],
    make: [
      {
        task: 'Rebuild two charts honestly',
        steps: [
          'Take the worst chart you found and rebuild it with an honest axis and no decoration.',
          'Write the one sentence the chart proves, and make that the title.',
          'Remove gridlines, borders and legends one at a time until it stops being readable, then put back only the last thing you removed.',
          'Put the original and yours side by side and write what changed in the reader\'s understanding.'
        ],
        check: 'The rebuilt chart proves one sentence and the title says what it is.'
      },
      {
        task: 'A diagram a newcomer can read alone',
        steps: [
          'Draw a system you understand well: how a process works, how money moves, how a request flows.',
          'Fix the two confusion points you found in your study session.',
          'Hand it to a different newcomer with no narration at all.',
          'If they get it, you are done. If not, fix and repeat.'
        ],
        check: 'Someone who did not know the system read your diagram correctly with no explanation from you.'
      }
    ]
  },

  'design-communication/taste': {
    study: [
      {
        task: 'Ten minutes on one piece, not an hour of scrolling',
        steps: [
          'Pick one piece of excellent work. One.',
          'Spend ten minutes on it. Write three technical observations: what the type is doing, where your eye goes first and why, what the space is doing.',
          'No adjectives. "Clean" and "nice" are not observations.',
          'Do this daily. After thirty days read them back and see what you keep noticing.'
        ]
      },
      {
        task: 'Learn to critique in the right order',
        steps: [
          'Take a piece of someone else\'s work, or your own from a month ago.',
          'Write three observations first: what is there, factually.',
          'Then write two questions: what were they trying to do here.',
          'Only then write one suggestion. Notice how the suggestion changes once you have done the first two steps.'
        ]
      }
    ],
    make: [
      {
        task: 'Run a critique with a peer',
        steps: [
          'Find one person whose work is at least as good as yours. Agree to trade work weekly.',
          'Send them something unfinished, not something polished.',
          'Give observation, then question, then suggestion, in that order. Ask them to do the same.',
          'Write down which piece of their feedback you resisted most. That is usually the one worth acting on.'
        ],
        check: 'You gave and received critique in that order, and acted on at least one piece of it.'
      },
      {
        task: 'Ship on the date you set',
        steps: [
          'Set a publish date for a piece of work before you start it.',
          'Work to it. When the date arrives, publish whatever state it is in.',
          'Take critique afterwards, not instead.',
          'Keep version one, version five and the final side by side in a folder.'
        ],
        check: 'You published on the date you set, and you have the version history to look at.'
      }
    ]
  }
});
