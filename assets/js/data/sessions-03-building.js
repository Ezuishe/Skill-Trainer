/* Step-by-step session work for software, applied AI, and capital. */

window.PILLAR_SESSIONS = Object.assign(window.PILLAR_SESSIONS || {}, {

  /* ---------------------------------------------------- ENGINEERING */

  'software-engineering/fundamentals': {
    study: [
      {
        task: 'Read one real file properly',
        steps: [
          'Pick a small file from a library you already depend on. Under 300 lines.',
          'Read it top to bottom without skipping. Look up anything you do not recognise.',
          'Write three sentences: what it does, why it is structured that way, and one decision you would have made differently.',
          'Find the test file for it and read that too. Tests document intent better than comments do.'
        ]
      },
      {
        task: 'Learn your language\'s standard library where it matters',
        steps: [
          'Open the standard library docs for your language. Pick one module you have never used properly: collections, iterators, dates, whatever it is.',
          'Read the whole page.',
          'Write five small examples in a scratch file, running each one.',
          'Find one place in your own code where this module would have saved you writing something by hand. Rewrite it.'
        ]
      }
    ],
    make: [
      {
        task: 'Build something 300 lines long from an empty file',
        steps: [
          'Pick a small tool you would use: a file renamer, a log parser, a CLI that hits an API you care about.',
          'Open an empty file. Close every tutorial.',
          'Build it until it works. Being stuck is the exercise; give any problem 20 minutes before you look anything up.',
          'When it works, rewrite the ugliest function twice: once shorter, once faster. Keep all three versions.'
        ],
        check: 'It runs, you wrote it from blank, and you have three versions of the hardest part.'
      },
      {
        task: 'Find a bug by narrowing, not guessing',
        steps: [
          'Take a real bug. Reproduce it reliably first; if you cannot reproduce it, you cannot fix it.',
          'Write down what you believe is happening before you change anything.',
          'Halve the search space repeatedly: comment out, bisect commits, add one log line at the midpoint.',
          'When you find it, write the failing test first, then the fix.'
        ],
        check: 'A regression test exists that fails without your fix, and you can explain the cause in one sentence.'
      }
    ]
  },

  'software-engineering/shipping': {
    study: [
      {
        task: 'Trace one request end to end',
        steps: [
          'Take an application you have access to. Pick one user action.',
          'Follow it: browser, network, server route, business logic, database, response, render.',
          'Draw it on paper with every hop.',
          'Mark every point where it could fail and what the user would see if it did.'
        ]
      },
      {
        task: 'Learn the deployment path before you need it',
        steps: [
          'Read your deployment configuration end to end: the CI file, the Dockerfile, the host settings.',
          'Write down where the environment variables come from and who can see them.',
          'Write down exactly what happens when you push to main.',
          'Note the one step you do not understand and find out what it does.'
        ]
      }
    ],
    make: [
      {
        task: 'Deploy something publicly, today',
        steps: [
          'Take the smallest thing you have. It can print one line.',
          'Get it onto a real host with a real URL. Free tiers are fine.',
          'Wire up deployment from a git push so you never deploy by hand again.',
          'Send the URL to one person.'
        ],
        check: 'There is a public URL, and pushing to main updates it.'
      },
      {
        task: 'Break it on purpose and recover',
        steps: [
          'With your deployed thing running, kill the database mid-request.',
          'Expire or corrupt an API token.',
          'Fill the disk, or send it a request a hundred times larger than expected.',
          'For each: note what the user saw, fix the handling, and write down what you would need at 3am to diagnose it.'
        ],
        check: 'Three deliberate failures survived, each with an explicit handling path and a useful log line.'
      }
    ]
  },

  'software-engineering/quality': {
    study: [
      {
        task: 'Read a test suite you did not write',
        steps: [
          'Find a well-tested open source project in your language.',
          'Read one test file completely.',
          'Note what they chose to test and, more importantly, what they chose not to.',
          'Write down the three patterns you want to copy.'
        ]
      },
      {
        task: 'Find the code you are afraid of',
        steps: [
          'Open your own project. Find the file you avoid changing.',
          'Write down why: no tests, unclear names, too many responsibilities, something you never understood.',
          'Check whether it has test coverage. Usually it does not, which is why you are afraid of it.',
          'Write the three test cases that would let you change it safely.'
        ]
      }
    ],
    make: [
      {
        task: 'Cover the scary code, then improve it',
        steps: [
          'Write tests around the file you are afraid of, without changing any behaviour. Get to the point where the tests fail if you break it.',
          'Deliberately introduce a bug and confirm a test catches it. Then undo it.',
          'Now refactor in small steps, running the tests after each one. Commit at every green point.',
          'Stop when the file is one you would be willing to hand to someone else.'
        ],
        check: 'The tests caught a bug you introduced on purpose, and the file changed shape without behaviour changing.'
      },
      {
        task: 'Review three pull requests properly',
        steps: [
          'Find three PRs to review: at work, or in an open source project accepting contributions.',
          'For each, read the whole diff before commenting.',
          'Ask at least one question about intent rather than style.',
          'Note which review taught you something. Reading critically is how taste develops.'
        ],
        check: 'Three reviews given, each with at least one question about why rather than how.'
      }
    ]
  },

  'software-engineering/systems': {
    study: [
      {
        task: 'Read two post-mortems and write what you would have instrumented',
        steps: [
          'Find two published incident write-ups from large engineering organisations.',
          'For each, write the sequence: what broke, what made it worse, what made it visible.',
          'Write down what monitoring would have caught it fifteen minutes earlier.',
          'Check whether your own systems have that monitoring. They probably do not.'
        ]
      },
      {
        task: 'Work out what your data actually looks like',
        steps: [
          'For your main data store: write down the size, the read and write pattern, and the growth rate.',
          'Find the largest table or collection and its row count.',
          'Write the three queries that run most often, and time them.',
          'Note which one will break first as data grows, and roughly when.'
        ]
      }
    ],
    make: [
      {
        task: 'Write a design document and have it attacked',
        steps: [
          'Pick something you would genuinely build. Write: the requirements, two or three options with trade-offs, your choice and why, and how it fails.',
          'Two pages maximum.',
          'Give it to an engineer better than you and ask them to find the weakness.',
          'Rewrite it based on what they found. Keep both versions.'
        ],
        check: 'Someone senior read it, found a real problem, and the second version handles it.'
      },
      {
        task: 'Predict the breaking point, then find it',
        steps: [
          'Write down where you think your system falls over and at what load. Commit to a number.',
          'Load-test it until it breaks. Any tool will do.',
          'Compare where it actually broke with your prediction.',
          'Write one line on why you were wrong. That gap is your mental model correcting itself.'
        ],
        check: 'You have a predicted number, a measured number, and an explanation of the difference.'
      }
    ]
  },

  'software-engineering/leverage': {
    study: [
      {
        task: 'Find out what your work is actually worth',
        steps: [
          'List everything you shipped in the last month.',
          'For each, write what measurably changed: a number, a time saved, a cost avoided, a user outcome.',
          'Mark everything where you cannot name a change.',
          'For one of those, go and ask whoever requested it what it was for.'
        ]
      },
      {
        task: 'Calibrate your own estimates',
        steps: [
          'Look back at your last ten tasks. Write your original estimate and the actual time.',
          'Compute the ratio for each, then the average.',
          'Note whether you are consistently wrong in one direction. Almost everyone is.',
          'Write your personal multiplier at the top of your log and start applying it.'
        ]
      }
    ],
    make: [
      {
        task: 'Ship something with a number attached',
        steps: [
          'Pick work where you can measure the before state. Measure it first.',
          'Ship the change.',
          'Measure the after state a week later.',
          'Write it up in three sentences and send it to whoever cares about that number.'
        ],
        check: 'A shipped change with a before number, an after number, and someone who read the write-up.'
      },
      {
        task: 'Publish something small',
        steps: [
          'Pick one thing you built or learned that would help someone else: a small library, a technical write-up, a fix to someone\'s docs.',
          'Make it public. A repository with a readme, or a post.',
          'Tell three people it exists.',
          'Do not wait for it to be impressive. Small and finished beats ambitious and private.'
        ],
        check: 'Something of yours is public with your name on it.'
      }
    ]
  },

  /* ----------------------------------------------------- APPLIED AI */

  'applied-ai/direction': {
    study: [
      {
        task: 'Find where it fails on work you can grade',
        steps: [
          'Pick a task in a field you know well enough to mark out of ten.',
          'Run it ten times with the same input.',
          'Grade each output and write what was wrong with the weak ones: invented facts, wrong emphasis, missed constraint, generic filler.',
          'Write the three failure patterns you saw. Those are what you now design against.'
        ]
      },
      {
        task: 'Compare a vague request with a specified one',
        steps: [
          'Take five requests you would normally type in one line.',
          'For each, write the full version: the context, the constraints, an example of good output, and what "done" means.',
          'Run both versions.',
          'Put the outputs side by side and mark what changed. Keep the specifications; you will reuse them.'
        ]
      }
    ],
    make: [
      {
        task: 'A specification you reuse rather than retype',
        steps: [
          'Take a task you do repeatedly.',
          'Write the specification properly, once, in a file: role, context, constraints, output format, two examples.',
          'Use it five times this week without retyping it.',
          'Each time it produces something weak, improve the file rather than patching the output.'
        ],
        check: 'A saved specification you have used five times and improved twice.'
      },
      {
        task: 'Build the checking habit',
        steps: [
          'For every output you will act on, ask for the strongest case against it.',
          'Pick one factual claim and verify it from a primary source.',
          'Do this every time for a week, even when it feels unnecessary.',
          'Log how many times per week the check caught something. It is rarely zero.'
        ],
        check: 'A week of logged checks with a count of what they caught.'
      }
    ]
  },

  'applied-ai/automation': {
    study: [
      {
        task: 'Log a week of repetitive work',
        steps: [
          'For one week, write down every task you do more than once: what it was, how long it took, how often it recurs.',
          'At the end, multiply duration by annual frequency for each.',
          'Sort by annual hours.',
          'Mark which ones would be dangerous to get wrong. Those need a human checkpoint, not full automation.'
        ]
      },
      {
        task: 'Learn what your tools can already talk to',
        steps: [
          'For the top three tasks on your list, find out whether the tools involved have an API, a webhook, or an export.',
          'Read the authentication section of each one properly.',
          'Get a single successful API call working for each, even just fetching a list.',
          'Write down the rate limits and what happens when you hit them.'
        ]
      }
    ],
    make: [
      {
        task: 'Automate the top item on your list',
        steps: [
          'Take the highest annual-hours task. Build the whole thing end to end, however crudely.',
          'Run it manually five times before you schedule it.',
          'Then schedule it and stop doing it by hand.',
          'Record the hours it gives back per month.'
        ],
        check: 'It runs on a schedule, you have stopped doing the task by hand, and you know the hours saved.'
      },
      {
        task: 'Feed it bad input on purpose',
        steps: [
          'Give your automation empty input, enormous input, malformed input, and input in the wrong language.',
          'For each, decide explicitly: stop, retry, or escalate to a human.',
          'Implement that decision. Silent failure is the one option not allowed.',
          'Make it tell you when it stops. An automation that fails quietly is worse than no automation.'
        ],
        check: 'Four bad inputs handled explicitly, and it can reach you when it gives up.'
      }
    ]
  },

  'applied-ai/building': {
    study: [
      {
        task: 'Build the answer key before the system',
        steps: [
          'Pick a corpus you know well: your own documents, your company wiki, a codebase.',
          'Write twenty questions people actually ask about it.',
          'Write the correct answer to each, by hand, from the source.',
          'Save it as a file. This answer key is what makes everything after this measurable.'
        ]
      },
      {
        task: 'Compare models on your own task',
        steps: [
          'Take fifty real inputs from your task.',
          'Run them through a large model and a small one.',
          'Record quality (against your key), cost per run, and latency for each.',
          'Chart the three. Decide which model to use where, and write down why.'
        ]
      }
    ],
    make: [
      {
        task: 'Retrieval you can actually score',
        steps: [
          'Build retrieval over the corpus you wrote the answer key for.',
          'Run your twenty questions through it.',
          'Score each answer against your key: right, partly right, wrong, or invented.',
          'Fix the worst failure mode: usually chunking or the way context is assembled, not the model.'
        ],
        check: 'A scored run against your own answer key, with a number you can improve on.'
      },
      {
        task: 'Enforce the output contract',
        steps: [
          'Define the exact schema your output must match.',
          'Validate every response against it in code.',
          'Handle every violation explicitly: retry with the error, fall back, or fail loudly. Never pass a malformed object downstream.',
          'Test by deliberately requesting something that breaks the schema.'
        ],
        check: 'Invalid output cannot get through, and you proved it by trying.'
      }
    ]
  },

  'applied-ai/evaluation': {
    study: [
      {
        task: 'Turn your real failures into test cases',
        steps: [
          'Go back through your last month of use and collect twenty outputs that were wrong.',
          'For each, save the exact input and what the right answer would have been.',
          'Group them by failure type.',
          'This file is now the most valuable thing you own here. Back it up.'
        ]
      },
      {
        task: 'Work out what you can and cannot grade automatically',
        steps: [
          'Take your twenty cases. Mark which have a single correct answer a program could check.',
          'Mark which need judgement.',
          'For the judgement ones, write the specific criteria you would give a human grader.',
          'Note the proportion. If most need judgement, automated scoring will mislead you.'
        ]
      }
    ],
    make: [
      {
        task: 'Make the evaluation run itself',
        steps: [
          'Write a script that runs all your cases and reports a score.',
          'Wire it into wherever your tests run, so it happens without you remembering.',
          'Run it now and record the baseline score with the date.',
          'Run it after every prompt, model or data change.'
        ],
        check: 'The evaluation runs automatically and you have a dated baseline.'
      },
      {
        task: 'Reject a change you liked',
        steps: [
          'Make a change you believe improves things.',
          'Run the evaluation.',
          'If the score dropped, revert it, even though you preferred it.',
          'Write down what you believed and what the data said. This is the whole point of having the evaluation.'
        ],
        check: 'You reverted a change on evidence rather than on preference, at least once.'
      }
    ]
  },

  'applied-ai/judgment': {
    study: [
      {
        task: 'Assess five ideas honestly',
        steps: [
          'List five things you could build with these tools.',
          'For each write: who needs it, what it replaces, and what happens when it is confidently wrong.',
          'Decide build, buy or skip, with a written reason.',
          'Expect most to be skip. Write down why for each, so you do not re-litigate it in a month.'
        ]
      },
      {
        task: 'Check where your data is going',
        steps: [
          'List every tool you paste work into.',
          'For each, find the actual data retention and training terms. Read them, do not assume.',
          'Mark which ones you would be comfortable explaining to the person whose data it is.',
          'Stop using the ones that fail that test for anything sensitive.'
        ]
      }
    ],
    make: [
      {
        task: 'Write the failure note for something live',
        steps: [
          'Take a system you have running. Write what happens when it is wrong and sounds certain.',
          'Write who notices, how long that takes, and who is accountable.',
          'If nobody notices, add a check. If nobody is accountable, name someone.',
          'Keep the note with the code.'
        ],
        check: 'A written failure note exists, names a person, and there is a check that would catch a silent failure.'
      },
      {
        task: 'Demo it with the failures included',
        steps: [
          'Prepare a demo of something you built.',
          'Include two cases where it fails, and show them.',
          'Say plainly what it cannot do and what you would need to fix it.',
          'Ask the audience afterwards what they think it can do. Correct any overestimate immediately.'
        ],
        check: 'Someone who saw your demo can state its limits back to you accurately.'
      }
    ]
  },

  /* -------------------------------------------------------- CAPITAL */

  'capital-allocation/foundation': {
    study: [
      {
        task: 'Find out what you actually keep',
        steps: [
          'Take the last three months of bank and card statements.',
          'Total what came in after tax and what went out.',
          'Compute your savings rate for each month: saved divided by income.',
          'Write the three numbers down. This is the variable that matters most for the next decade, and almost nobody knows theirs.'
        ]
      },
      {
        task: 'Find every fee you pay on capital',
        steps: [
          'List every account, fund and platform holding your money.',
          'For each, find the actual annual cost: fund fee, platform fee, spreads, advice fees.',
          'Add them into one annual percentage of your total.',
          'Multiply that percentage across thirty years on your current balance. Write the number down.'
        ]
      }
    ],
    make: [
      {
        task: 'A one-page net worth statement',
        steps: [
          'One page: everything you own, everything you owe, and the difference.',
          'Include the boring ones: pensions, car finance, the money someone owes you.',
          'Write one line on why the number changed since last month.',
          'Do this on the same day every month. Twelve of these teaches more than any book.'
        ],
        check: 'One page exists with a date on it, and you have a calendar reminder for next month.'
      },
      {
        task: 'Fund the buffer before taking any market risk',
        steps: [
          'Work out your essential monthly costs. Not your current spending; the version where you cut.',
          'Decide how many months you want covered and write the target number.',
          'Move what you have into something separate and boring where you cannot spend it by accident.',
          'Set up an automatic transfer to fill the gap.'
        ],
        check: 'A separate buffer account exists with a target number and an automatic transfer running.'
      }
    ]
  },

  'capital-allocation/theory': {
    study: [
      {
        task: 'Explain everything you own in one sentence each',
        steps: [
          'List every investment you hold.',
          'For each, write where the return comes from: profits growing, income paid out, a rerating, or somebody paying more later.',
          'Mark the ones where the honest answer is only the last one.',
          'For anything you cannot explain at all, write "I do not know why I own this". That is useful information.'
        ]
      },
      {
        task: 'Study five crashes properly',
        steps: [
          'Pick five historical declines. Include at least one that took years to recover.',
          'For each write: how far it fell, how long recovery took, and what people were saying at the bottom.',
          'Write what you think you would have done.',
          'Then read what fund flow data says most people actually did. The gap is the thing to plan around.'
        ]
      }
    ],
    make: [
      {
        task: 'Do the compounding arithmetic by hand',
        steps: [
          'Take your current savings rate and balance.',
          'Compute the outcome at 20 years with a 1% annual fee and with a 0.2% fee. Do it in a spreadsheet you build yourself.',
          'Compute what happens if you save 5% more.',
          'Write the three end numbers side by side. Seeing your own arithmetic changes behaviour more than reading about it.'
        ],
        check: 'A spreadsheet you built, with the fee difference and the savings-rate difference shown in money.'
      },
      {
        task: 'Answer the 40% question in writing',
        steps: [
          'Write what your portfolio is worth if markets fall 40%.',
          'Write what happens if your income stops in the same year, because those two often arrive together.',
          'Write what you would have to sell, and at what price.',
          'If that paragraph is uncomfortable, change the allocation now rather than later.'
        ],
        check: 'A written answer with real numbers in it, not a general statement about being long-term.'
      }
    ]
  },

  'capital-allocation/policy': {
    study: [
      {
        task: 'Read three real policy statements',
        steps: [
          'Find three published investment policy statements. Pension funds and endowments publish theirs.',
          'Note what they specify: objectives, allocation ranges, rebalancing rules, what is prohibited.',
          'Note that they say what to do in a decline, in advance.',
          'List the sections yours will need.'
        ]
      },
      {
        task: 'Work out your actual time horizon',
        steps: [
          'Write down what this money is for and when you will need it.',
          'Split it: money needed within three years, within ten, and beyond.',
          'Note that the first bucket should not be exposed to market risk at all.',
          'Write the three amounts.'
        ]
      }
    ],
    make: [
      {
        task: 'Write and sign the policy',
        steps: [
          'Two pages. Objectives, horizon, allocation with ranges, rebalancing rule, contribution amount.',
          'Add the section that matters most: exactly what you will do if markets fall 20%, 30% and 40%.',
          'Add what would legitimately make you change the plan, so you can tell a real reason from a panic.',
          'Sign it, date it, and put it where you will find it in a bad month.'
        ],
        check: 'A signed, dated document that says what you will do in a crash.'
      },
      {
        task: 'Automate the decision away',
        steps: [
          'Set up an automatic transfer and investment on the same day each month.',
          'Set the amount from your policy, not from what feels comfortable this month.',
          'Set rebalancing bands and a calendar reminder to check them.',
          'Then stop looking. Checking daily is a cost with no benefit.'
        ],
        check: 'Contributions happen without you deciding, and a rebalance rule exists with a date to check it.'
      }
    ]
  },

  'capital-allocation/analysis': {
    study: [
      {
        task: 'Read an annual report the right way round',
        steps: [
          'Pick a company you understand as a customer.',
          'Start with the cash flow statement, not the narrative. Where did cash actually come from and go?',
          'Read the footnotes on revenue recognition and on debt.',
          'Only then read the chief executive\'s letter, and note the difference in tone from the numbers.'
        ]
      },
      {
        task: 'Find the strongest argument against something you own',
        steps: [
          'Take one holding. Search for the most credible bear case you can find.',
          'Write their argument in your own words, as well as they would put it.',
          'Write what would have to happen for them to be right.',
          'Write whether you would notice if it started happening.'
        ]
      }
    ],
    make: [
      {
        task: 'A one-page thesis with an exit condition',
        steps: [
          'Write: what it is, why you think it is mispriced, and what has to be true for that to hold.',
          'Write the specific things that would prove you wrong.',
          'Write the price or condition at which you sell.',
          'Date it. Put a reminder six months out to review it against what you actually wrote.'
        ],
        check: 'A dated page with falsification conditions and a sell rule, written before you bought.'
      },
      {
        task: 'Run paper positions with dated reasoning',
        steps: [
          'For three ideas, write the full thesis but commit no money.',
          'Record the price and date.',
          'Review at six months against exactly what you wrote, not what you now remember thinking.',
          'Only size up on the ones where your reasoning, not just the outcome, held up.'
        ],
        check: 'Three dated paper theses and one honest six-month review.'
      }
    ]
  },

  'capital-allocation/behaviour': {
    study: [
      {
        task: 'Read your own decisions back',
        steps: [
          'Write down your last ten financial decisions, with what you expected at the time.',
          'Mark which turned out well and which badly.',
          'Separately, mark which had sound reasoning given what was knowable then.',
          'Note how often those two columns disagree. That gap is the lesson.'
        ]
      },
      {
        task: 'Find your own paths to ruin',
        steps: [
          'List everything that could cause permanent, unrecoverable loss: leverage, one position too large, something illiquid, a counterparty, an uninsured event.',
          'For each, write the probability you would actually accept.',
          'Mark anything where a bad outcome ends your ability to keep playing.',
          'Bound or remove those, even at a cost to expected return.'
        ]
      }
    ],
    make: [
      {
        task: 'Start the decision journal',
        steps: [
          'Before your next financial decision, write: what you expect, why, and your confidence as a percentage.',
          'Do this for every decision, including doing nothing.',
          'Review quarterly: at each confidence level, how often were you right?',
          'Twelve entries is enough to see whether you have skill or a good market.'
        ],
        check: 'Twelve dated entries with confidence levels, and one review completed.'
      },
      {
        task: 'Write the decline instructions to yourself',
        steps: [
          'Write what you will do at -20%, -30% and -40%, in specific actions, not sentiments.',
          'Include whether you will still have income, and where the money to buy more would come from.',
          'Address it to yourself and put it with your policy document.',
          'Read it during the next decline instead of improvising.'
        ],
        check: 'Written instructions exist for three decline levels, with the source of any further money named.'
      }
    ]
  }
});
