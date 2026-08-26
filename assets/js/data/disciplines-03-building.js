/* Building and capital: software, applied AI, and allocating money. */

window.DISCIPLINES = (window.DISCIPLINES || []).concat([

  /* ------------------------------------------------------------ ENGINEERING */
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    discipline: 'Building',
    tagline: 'Build things that keep working when you are not looking at them.',
    thesis:
      'Software costs almost nothing to copy and can reach anyone, which makes it the cheapest leverage ' +
      'available to an individual. Even moderate skill converts into a job, freelance work, or your own ' +
      'product. The part that takes years is not the syntax. It is learning to keep something working ' +
      'once other people depend on it.',
    hours: { functional: 150, competent: 600, professional: 2000, elite: 6000 },
    proofs: {
      functional: 'You shipped a working application that other people can use.',
      competent: 'You are employable: you build, test, deploy and maintain production software.',
      professional: 'You own systems at scale and make decisions other engineers build on.',
      elite: 'You set technical direction across an organisation.'
    },
    entryCheck: ['A computer and an internet connection', 'Tolerance for being stuck for several hours at a time'],
    pillars: [
      {
        id: 'fundamentals',
        name: 'Language and Fundamentals',
        weight: 0.2,
        specialization: 'Programming fundamentals',
        objective: 'Get genuinely fluent in one language and the machine underneath it.',
        competencies: [
          'One language properly: idioms, standard library, tooling',
          'Data structures and cost, as an instinct rather than a quiz answer',
          'Debugging as a method rather than as guessing',
          'Reading unfamiliar code without panic'
        ],
        stages: [
          {
            name: 'From blank',
            work: 'Write code from an empty file every session. Tutorials produce the feeling of competence without the substance.',
            check: 'You built something 300 lines long with no tutorial open.'
          },
          {
            name: 'Read others',
            work: 'Read real code written by better engineers and work out why it is shaped that way.',
            check: 'You can explain the design of a file you did not write.'
          },
          {
            name: 'Debug systematically',
            work: 'Fix bugs by narrowing rather than by changing things and rerunning.',
            check: 'You found a bug in unfamiliar code using tooling and reasoning.'
          }
        ],
        drills: [
          {
            name: 'Blank page reps',
            dose: '1 problem a day',
            protocol: 'Solve one problem from an empty file, then rewrite the solution twice: once shorter, once faster. The rewrites are where most of the learning happens and they are the part people skip.',
            mistake: 'Stopping at the first working version, which teaches you that it works but not why.'
          },
          {
            name: 'Source reading',
            dose: '30 minutes',
            protocol: 'Read one real file from a library you use, end to end. Write three sentences on why it is built that way. Do this on code you already depend on, so the context is real.',
            mistake: 'Choosing something enormous. One file, and a small one, is the exercise.'
          },
          {
            name: 'Bisect the bug',
            dose: '2 bugs',
            protocol: 'Reproduce it reliably first. Then halve the search space repeatedly until you have it. Form a hypothesis, test it, fix it, and write the regression test. Never fix a bug you cannot explain, because you probably have not fixed it.',
            mistake: 'Changing three things at once, which means you cannot tell what fixed it.'
          },
          {
            name: 'Explain the cost',
            dose: 'weekly',
            protocol: 'Take something you wrote and write down its time and space behaviour as the input grows. Then test whether you were right.',
            mistake: 'Reciting the theoretical complexity without checking what actually happens on your data sizes.'
          }
        ],
        standard: 'You can drop into unfamiliar code and be useful inside an hour.',
        milestone: {
          name: 'Fluency gate',
          criteria: [
            'A 500-line program built without copying its structure from a tutorial',
            'A bug found in an unfamiliar codebase using tooling and reasoning',
            'You can explain your own code\'s cost as data grows'
          ]
        }
      },
      {
        id: 'shipping',
        name: 'Shipping End to End',
        weight: 0.24,
        specialization: 'Getting things live',
        objective: 'Take an idea to a URL that other people use.',
        competencies: [
          'The whole path: client, server, data store',
          'Version control and working with other people\'s branches',
          'Deployment, environments, configuration and secrets',
          'Knowing you are broken before a user tells you'
        ],
        stages: [
          {
            name: 'Deploy on day one',
            work: 'Get something live before it does anything. Deployment is the part people postpone and then fear.',
            check: 'Something deployed, however trivial.'
          },
          {
            name: 'Ship repeatedly',
            work: 'Small projects finished and deployed, rather than one large project never released.',
            check: 'Three things deployed and used.'
          },
          {
            name: 'Break it on purpose',
            work: 'Cause failures deliberately and learn to recover. Production competence is mostly familiarity with failure.',
            check: 'You recovered from three deliberate failures.'
          }
        ],
        drills: [
          {
            name: 'Weekend ship',
            dose: '1 project a fortnight',
            protocol: 'Scope something you can deploy in two weekends. Deploy it publicly, even if only three people ever see it. An unshipped project teaches a fraction of what a shipped one does.',
            mistake: 'Scoping something you could finish in two weekends if nothing went wrong. Something always goes wrong.'
          },
          {
            name: 'Clone and extend',
            dose: '1 clone',
            protocol: 'Rebuild a small tool you actually use, then add the feature it is missing. Working against a known specification removes the design questions so you can focus on the building.',
            mistake: 'Cloning something enormous. Pick a tool with one job.'
          },
          {
            name: 'Break it deliberately',
            dose: '3 failures',
            protocol: 'Kill the database mid-request. Expire the token. Fill the disk. Cut the network. Fix each one and write down what you would need to know at 3am to diagnose it.',
            mistake: 'Only testing failures you already know how to handle.'
          },
          {
            name: 'Page yourself',
            dose: 'per project',
            protocol: 'Set up an alert that tells you when the thing is broken, and make sure it reaches you. Then break it and check the alert actually arrived.',
            mistake: 'Configuring monitoring and never testing whether the alert fires.'
          }
        ],
        standard: 'You can go from an idea to something live and monitored in a weekend.',
        milestone: {
          name: 'Shipping gate',
          criteria: [
            'A deployed application with real users other than you',
            'Deployment happens from a push, without manual steps',
            'Your own monitoring told you about a problem before a user did'
          ]
        }
      },
      {
        id: 'quality',
        name: 'Correctness and Craft',
        weight: 0.2,
        specialization: 'Testing and code quality',
        objective: 'Write code a stranger can safely change a year from now.',
        competencies: [
          'What to test at which level, and what not to test',
          'Refactoring under test, in small verified steps',
          'Giving and receiving code review',
          'Designing so that wrong states are hard to represent'
        ],
        stages: [
          {
            name: 'Cover',
            work: 'Get tests around code you are afraid to change.',
            check: 'A test suite that catches a regression you introduce on purpose.'
          },
          {
            name: 'Improve safely',
            work: 'Refactor in small steps with the tests running.',
            check: 'A messy function improved without behaviour changing.'
          },
          {
            name: 'Review',
            work: 'Read other people\'s code critically and often. This is the fastest route to taste.',
            check: 'Three reviews a week for a month.'
          }
        ],
        drills: [
          {
            name: 'Test first, three times',
            dose: '3 features',
            protocol: 'Write the failing test before the implementation for three features. Notice what it does to the shape of the code, particularly to how much you couple things together.',
            mistake: 'Writing the test after the code and calling it test-first, which misses the design benefit entirely.'
          },
          {
            name: 'Refactor kata',
            dose: '1 a week',
            protocol: 'Take an ugly function, cover it with tests, then improve it in steps small enough that the tests pass after every step. Commit at each green point.',
            mistake: 'Rewriting it in one go, which leaves you unable to tell where behaviour changed.'
          },
          {
            name: 'Review reps',
            dose: '3 a week',
            protocol: 'Review other people\'s pull requests, at work or in open source. Ask why rather than telling. Reading critically is how you build judgement about design.',
            mistake: 'Reviewing only for style, which is what a linter is for.'
          },
          {
            name: 'Come back cold',
            dose: 'quarterly',
            protocol: 'Open a project you have not touched in sixty days and try to make a change. Whatever confuses you is the documentation and naming you owe your future self.',
            mistake: 'Blaming your past self instead of writing down what would have helped.'
          }
        ],
        standard: 'You can change your own code confidently after two months away.',
        milestone: {
          name: 'Craft gate',
          criteria: [
            'A codebase you changed confidently after 60 days away',
            'A test suite that caught a regression you introduced deliberately',
            'A review of yours changed someone\'s design for the better'
          ]
        }
      },
      {
        id: 'systems',
        name: 'Systems and Architecture',
        weight: 0.2,
        specialization: 'Systems design',
        objective: 'Design for scale, failure and change.',
        competencies: [
          'Data modelling and choosing storage against real constraints',
          'Queues, caching, concurrency and doing things exactly once',
          'Timeouts, retries and what happens when a dependency is slow',
          'Writing a design down so other people can argue with it'
        ],
        stages: [
          {
            name: 'Write it down',
            work: 'Produce design documents and have them attacked.',
            check: 'A design document that survived senior review.'
          },
          {
            name: 'Predict then measure',
            work: 'Guess where things break, then find out.',
            check: 'A load test where you predicted the break point first.'
          },
          {
            name: 'Learn from failure',
            work: 'Study real incidents and work out what instrumentation would have caught them.',
            check: 'Four post-mortems studied with your own notes.'
          }
        ],
        drills: [
          {
            name: 'Design document',
            dose: '1 a month',
            protocol: 'Write a design for something you would build: requirements, two or three options, the trade-offs, what you chose and why, and how it fails. Give it to an engineer who will tear it apart.',
            mistake: 'Presenting one option, which turns a design review into a defence.'
          },
          {
            name: 'Predict the break point',
            dose: '1 test',
            protocol: 'Write down where you think your system will fall over and at what load. Then load-test it until it does. The gap between prediction and reality is the useful part.',
            mistake: 'Load-testing without a prediction, which produces a number you have no way to interpret.'
          },
          {
            name: 'Incident study',
            dose: '2 a month',
            protocol: 'Read published post-mortems from large engineering organisations. For each one, write what you would have instrumented differently. Most outages have a boring cause you can learn cheaply.',
            mistake: 'Reading them as entertainment rather than writing anything down.'
          },
          {
            name: 'Justify the storage',
            dose: 'per project',
            protocol: 'Write down why you chose that database, with numbers: expected size, read and write shape, consistency requirements. Preference is not a reason.',
            mistake: 'Choosing what you used last time and reverse-engineering a justification.'
          }
        ],
        standard: 'You can explain what happens to your system at ten times the load, and be roughly right.',
        milestone: {
          name: 'Architecture gate',
          criteria: [
            'A written design document that survived senior review',
            'A system that survived ten times its expected load, or degraded gracefully',
            'Your storage choice explained with numbers rather than preference'
          ]
        }
      },
      {
        id: 'leverage',
        name: 'Turning it into Impact',
        weight: 0.16,
        specialization: 'Engineering impact',
        objective: 'Do work that changes a number someone cares about.',
        competencies: [
          'Scoping and estimating in a way you can defend',
          'Working with people who do not write code',
          'Choosing high-impact work over interesting work',
          'Building things in public'
        ],
        stages: [
          {
            name: 'Measure yourself',
            work: 'Start recording what you actually shipped and what changed because of it.',
            check: 'Eight weeks of impact notes.'
          },
          {
            name: 'Estimate honestly',
            work: 'Estimate before starting, record actual, and compute your own error factor.',
            check: 'Ten tasks estimated and measured.'
          },
          {
            name: 'Be visible',
            work: 'Publish something: a library, a write-up, a contribution.',
            check: 'One public artefact, live.'
          }
        ],
        drills: [
          {
            name: 'Impact ledger',
            dose: 'weekly',
            protocol: 'Each week write what you shipped and what measurably changed. Most engineers cannot answer "what did you make better this quarter", and this is the cheapest possible fix.',
            mistake: 'Recording activity rather than outcome. "Refactored the billing module" is activity.'
          },
          {
            name: 'Estimate and compare',
            dose: 'every task',
            protocol: 'Write your estimate before starting and the actual afterwards. Compute the ratio. After ten tasks you will have a personal multiplier, and it converges faster than you expect.',
            mistake: 'Adjusting the estimate halfway through so it looks accurate.'
          },
          {
            name: 'Public artefact',
            dose: '1 a month',
            protocol: 'Publish a small library, a technical write-up or an open-source contribution. Visible work compounds into opportunities in a way that private work cannot.',
            mistake: 'Waiting until you have something impressive. Small and finished beats ambitious and private.'
          },
          {
            name: 'Ask what it is for',
            dose: 'every task',
            protocol: 'Before starting, write one sentence on what this changes for a user or the business. If you cannot, ask. Sometimes the answer is that it should not be built.',
            mistake: 'Assuming someone senior has already checked. Often nobody has.'
          }
        ],
        standard: 'You can name the number your last three pieces of work moved.',
        milestone: {
          name: 'Impact gate',
          criteria: [
            'A shipped change with a measured user or business metric attached',
            'Estimation error under 2x across ten tasks',
            'One inbound opportunity you can trace to public work'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Things shipped', method: 'Deployed and used, per month.' },
      { name: 'Estimation error', method: 'Actual over estimated, per task.' },
      { name: 'Unassisted build ratio', method: 'How much you wrote without copying a solution wholesale.' },
      { name: 'Reviews given', method: 'Pull requests reviewed per week. This is the taste metric.' }
    ],
    failureModes: [
      { name: 'The tutorial loop', fix: 'Cap tutorials at a quarter of the session. Build from a blank file for the rest.' },
      { name: 'Never deploying', fix: 'Deploy on day one, before there are features, then deploy every session.' },
      { name: 'Switching stacks', fix: 'One stack for the whole programme. Novelty is procrastination wearing a lab coat.' },
      { name: 'No feedback from better engineers', fix: 'Get code reviewed weekly by someone stronger. Open source works if work does not.' }
    ],
    arena: [
      'Users who complain when it breaks',
      'Code review from engineers better than you',
      'An open-source project with maintainers who push back',
      'Being on call for something you built'
    ],
    library: [
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas', note: 'Working habits that hold up over a career.' },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', note: 'The systems book worth reading twice, several years apart.' },
      { title: 'A Philosophy of Software Design', author: 'John Ousterhout', note: 'Short, opinionated, and right about complexity.' },
      { title: 'Refactoring', author: 'Martin Fowler', note: 'Changing code safely, as a set of named moves.' }
    ]
  },

  /* -------------------------------------------------------------- APPLIED AI */
  {
    id: 'applied-ai',
    name: 'Applied AI',
    discipline: 'Building',
    tagline: 'Get real work out of these systems instead of impressive demos.',
    thesis:
      'The gap between people who can direct these systems and people who cannot is widening quickly, and ' +
      'it has little to do with knowing prompt tricks. It comes down to specifying work precisely, ' +
      'checking output you cannot fully verify, and knowing which problems are actually tractable. Those ' +
      'are old engineering skills pointed at new tools.',
    hours: { functional: 40, competent: 180, professional: 600, elite: 2000 },
    proofs: {
      functional: 'You automated something recurring and you trust the output.',
      competent: 'You build evaluated AI features that hold up in daily use.',
      professional: 'You design production systems with measured quality and controlled cost.',
      elite: 'You set the technical direction others build against.'
    },
    entryCheck: [
      'Access to a frontier model, through an interface or an API',
      'Some scripting ability helps from the second pillar onward'
    ],
    pillars: [
      {
        id: 'direction',
        name: 'Directing the Model',
        weight: 0.2,
        specialization: 'Getting good output',
        objective: 'Get reliable output instead of plausible mush.',
        competencies: [
          'Specifying context, role, constraints, examples and output shape',
          'Breaking big tasks into steps you can check',
          'Knowing where these systems fail and where checking is mandatory',
          'Judging quality in domains you actually know'
        ],
        stages: [
          {
            name: 'Specify',
            work: 'Rewrite vague requests as specifications and compare the output.',
            check: 'Five tasks specified properly, with before-and-after output.'
          },
          {
            name: 'Decompose',
            work: 'Split work so each step can be verified before the next runs.',
            check: 'Three workflows broken into checkable steps.'
          },
          {
            name: 'Verify',
            work: 'Build the habit of checking anything you will act on.',
            check: 'A verification routine you use every time.'
          }
        ],
        drills: [
          {
            name: 'Specification rewrite',
            dose: '5 tasks',
            protocol: 'Take five vague requests and rewrite each with context, constraints, an example of good output, and what "done" means. Run both versions and keep the diff.',
            mistake: 'Adding length rather than precision. Three sentences of constraint beat two paragraphs of preamble.'
          },
          {
            name: 'Argue against it',
            dose: 'every output you will act on',
            protocol: 'Ask for the strongest case against the output you just got, then verify one factual claim independently. Two minutes here has saved people from expensive confident errors.',
            mistake: 'Asking "are you sure?", which usually just produces agreement or a needless reversal.'
          },
          {
            name: 'Checkable steps',
            dose: '3 workflows',
            protocol: 'Break a large task into steps where each output can be checked before the next begins. The failure you catch at step two is much cheaper than the one you find at step six.',
            mistake: 'Chaining steps so tightly that you cannot inspect the middle.'
          },
          {
            name: 'Work in your own domain',
            dose: 'weekly',
            protocol: 'Use it on something you know well enough to grade. This is how you learn where it is strong and where it is confidently wrong, which does not transfer from reading about it.',
            mistake: 'Judging quality in a field where you cannot tell good from plausible.'
          }
        ],
        standard: 'You can predict where it will fail on your task before you run it.',
        milestone: {
          name: 'Direction gate',
          criteria: [
            'A recurring task where the output holds up unedited',
            'You can predict its failure modes on your own work',
            'Specifications written down and reused rather than retyped'
          ]
        }
      },
      {
        id: 'automation',
        name: 'Automating Real Work',
        weight: 0.22,
        specialization: 'Workflow automation',
        objective: 'Take recurring work out of your week permanently.',
        competencies: [
          'Spotting what is worth automating: frequency times duration times tolerance for error',
          'Connecting tools with scripts, APIs, schedulers and webhooks',
          'Deciding where a human has to stay in the loop',
          'Measuring hours you actually got back'
        ],
        stages: [
          {
            name: 'Audit',
            work: 'Log a week of recurring work before automating anything.',
            check: 'A ranked list of recurring tasks by annual hours.'
          },
          {
            name: 'Build small',
            work: 'One finished automation a week, starting from the top of the list.',
            check: 'Four automations running.'
          },
          {
            name: 'Make them survive',
            work: 'Handle bad input, failure and drift so they still run in a month.',
            check: 'One automation running unattended for 30 days.'
          }
        ],
        drills: [
          {
            name: 'Time audit',
            dose: '1 week',
            protocol: 'Log every recurring task for a week with how long it took and how often it happens. Multiply out to annual hours and sort. Automate from the top, not from whatever is most interesting.',
            mistake: 'Automating the fun task that happens twice a year.'
          },
          {
            name: 'One pipeline a week',
            dose: 'weekly',
            protocol: 'Build one automation, end to end, and finish it. Small and finished beats large and theoretical, and four small ones teach more than one ambitious one.',
            mistake: 'Building a general framework before you have three concrete cases.'
          },
          {
            name: 'Feed it garbage',
            dose: 'per pipeline',
            protocol: 'Deliberately give each automation bad input: empty, enormous, malformed, wrong language. Decide explicitly whether it should stop, retry or ask a human.',
            mistake: 'Assuming input will look like your test data, which it will for about a fortnight.'
          },
          {
            name: 'Count the hours back',
            dose: 'monthly',
            protocol: 'Measure the hours you actually reclaimed against your original audit. Some automations cost more to maintain than they save, and you want to know which.',
            mistake: 'Counting the hours you saved and ignoring the hours you now spend fixing it.'
          }
        ],
        standard: 'Five or more hours a week come back, measured rather than estimated.',
        milestone: {
          name: 'Automation gate',
          criteria: [
            'Five or more hours a week reclaimed against your original audit',
            'One automation running unattended for 30 days',
            'Every pipeline has a defined behaviour when it fails'
          ]
        }
      },
      {
        id: 'building',
        name: 'Building AI Systems',
        weight: 0.24,
        specialization: 'AI application engineering',
        objective: 'Ship applications where a model is a component rather than the demo.',
        competencies: [
          'Retrieval and getting the right context in front of the model',
          'Tool use and multi-step agents that do not wander',
          'Structured output, validation, and handling every violation',
          'Trading off latency, cost and quality on purpose'
        ],
        stages: [
          {
            name: 'Ground it',
            work: 'Build retrieval over a corpus you know well enough to grade the answers.',
            check: 'Retrieval measured against a hand-written answer key.'
          },
          {
            name: 'Constrain it',
            work: 'Enforce output schemas and handle failures explicitly.',
            check: 'Three endpoints with validated output and explicit failure paths.'
          },
          {
            name: 'Cost it',
            work: 'Compare models on your own task and choose deliberately.',
            check: 'A quality, cost and latency comparison you have run.'
          }
        ],
        drills: [
          {
            name: 'Retrieval on known ground',
            dose: '1 system',
            protocol: 'Build retrieval over documents you know well. Write twenty questions and the right answers by hand first, then measure. Working on a corpus you cannot grade tells you nothing.',
            mistake: 'Grading the answers by whether they sound good.'
          },
          {
            name: 'Schema or nothing',
            dose: '3 endpoints',
            protocol: 'Force schema-valid output and handle every violation explicitly rather than hoping. Reliability comes from the contract and the retry, not from asking nicely.',
            mistake: 'Parsing free text with regular expressions and calling it structured.'
          },
          {
            name: 'Model sweep',
            dose: '1 comparison',
            protocol: 'Run the same fifty tasks across a large model and a small one. Chart quality, cost and latency. Frequently the small model is fine for most of the work.',
            mistake: 'Choosing the largest model everywhere by default and being surprised by the bill.'
          },
          {
            name: 'Watch it drift',
            dose: 'monthly',
            protocol: 'Rerun your evaluation set after any change to prompts, data or model version. Things move, and silently.',
            mistake: 'Assuming a system that worked in March still works in September.'
          }
        ],
        standard: 'Someone other than you depends on it daily and it holds.',
        milestone: {
          name: 'Build gate',
          criteria: [
            'A deployed feature used by people other than you',
            'Structured outputs validated, with explicit failure handling',
            'Cost per task known and under control'
          ]
        }
      },
      {
        id: 'evaluation',
        name: 'Evaluation',
        weight: 0.2,
        specialization: 'Measuring quality',
        objective: 'Know whether it is any good, with evidence.',
        competencies: [
          'Building test sets out of real failures',
          'Automated grading and where it stops being trustworthy',
          'Regression testing prompts and pipelines as they change',
          'Watching quality in production rather than at launch'
        ],
        stages: [
          {
            name: 'Collect failures',
            work: 'Turn every real failure into a test case. This set becomes your most valuable asset.',
            check: 'Twenty real failures captured as test cases.'
          },
          {
            name: 'Automate the check',
            work: 'Run the set automatically on every change.',
            check: 'The set runs without you remembering to run it.'
          },
          {
            name: 'Compare blind',
            work: 'Judge versions without knowing which is which.',
            check: 'One blind comparison that changed your mind.'
          }
        ],
        drills: [
          {
            name: 'Failure harvest',
            dose: '20 cases',
            protocol: 'Every time the system gets something wrong, write the input and the expected output into your test set. Twenty real failures is worth more than two hundred synthetic examples.',
            mistake: 'Fixing the failure and moving on without capturing it, so it comes back in three weeks.'
          },
          {
            name: 'Blind comparison',
            dose: '2 versions',
            protocol: 'Run two versions on the same inputs, strip the labels, and score them without knowing which is which. Your intuition about which prompt is better is not reliable.',
            mistake: 'Scoring while knowing which one you wrote most recently.'
          },
          {
            name: 'Wire it into the build',
            dose: 'every change',
            protocol: 'Wire the evaluation set into the same place your tests run. If it needs a decision to run, it will stop running within a fortnight.',
            mistake: 'Keeping evaluation in a notebook that only you know how to run.'
          },
          {
            name: 'Reject a change',
            dose: 'when the data says so',
            protocol: 'Practise throwing away a change you liked because the evaluation says it is worse. This is the entire point of having the evaluation.',
            mistake: 'Adjusting the test set until your preferred version wins.'
          }
        ],
        standard: 'You can say how good it is with a number, and defend the number.',
        milestone: {
          name: 'Evaluation gate',
          criteria: [
            'A set of twenty or more real cases running automatically',
            'A change rejected because the evaluation showed a regression',
            'Quality tracked over time rather than asserted'
          ]
        }
      },
      {
        id: 'judgment',
        name: 'Judgement and Limits',
        weight: 0.14,
        specialization: 'Deciding what to build',
        objective: 'Know what to build, what to refuse, and what must be checked by a person.',
        competencies: [
          'Choosing problems where this genuinely beats the alternative',
          'Handling data, privacy and the things you should not send anywhere',
          'Keeping a person accountable for consequential decisions',
          'Describing capability honestly to people who cannot evaluate it'
        ],
        stages: [
          {
            name: 'Choose',
            work: 'Practise deciding not to build things.',
            check: 'Five candidate projects assessed, most of them declined.'
          },
          {
            name: 'Risk',
            work: 'Write down what happens when the system is confidently wrong.',
            check: 'A written risk note for a live system.'
          },
          {
            name: 'Explain',
            work: 'Get good at telling non-technical stakeholders what it cannot do.',
            check: 'A stakeholder correctly described its limits back to you.'
          }
        ],
        drills: [
          {
            name: 'Build, buy or skip',
            dose: '5 ideas',
            protocol: 'For five candidate projects, decide build, buy or skip with a written reason. Most should be skip, and writing down why makes the next decision faster.',
            mistake: 'Building something because it is technically interesting rather than because it is needed.'
          },
          {
            name: 'Confidently wrong',
            dose: 'per project',
            protocol: 'Write what happens when the system is wrong and sounds certain, who notices, how long it takes, and who is accountable. If the answer is nobody, do not ship it.',
            mistake: 'Planning for the system failing loudly, which is the easy case. The hard case is failing quietly.'
          },
          {
            name: 'Honest demo',
            dose: '1 demo',
            protocol: 'Demo a system while showing two cases where it fails. It builds far more trust than a polished demo, and it sets expectations you can actually meet.',
            mistake: 'Hiding the failure cases and then spending six months managing disappointment.'
          },
          {
            name: 'The data question',
            dose: 'per project',
            protocol: 'Before sending anything anywhere, write down what is in it, whose it is, and whether they would be comfortable knowing. Check the retention terms of whatever you are using.',
            mistake: 'Pasting customer data into a tool without checking, which is a common and expensive mistake.'
          }
        ],
        standard: 'People trust your assessment of what these systems can and cannot do.',
        milestone: {
          name: 'Judgement gate',
          criteria: [
            'You declined a project with a written technical reason',
            'A documented risk assessment for something live',
            'A stakeholder correctly stated what your system cannot do'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Hours reclaimed a week', method: 'Measured against your original time audit.' },
      { name: 'Evaluation pass rate', method: 'Score on your own test set, per version.' },
      { name: 'Cost per task', method: 'Money per completed unit of work.' },
      { name: 'Days running unattended', method: 'How long an automation went without you touching it.' }
    ],
    failureModes: [
      { name: 'Demo-driven development', fix: 'Nothing counts until someone other than you depends on it daily.' },
      { name: 'No evaluation', fix: 'Build the test set before the second version of any prompt or pipeline.' },
      { name: 'Trusting output you cannot judge', fix: 'Verify independently or do not act on it.' },
      { name: 'Chasing every new tool', fix: 'Fix your stack for the programme. Evaluate new things in one scheduled slot a month.' }
    ],
    arena: [
      'Your own recurring work, which is an honest first customer',
      'Colleagues who will complain immediately when it is wrong',
      'Publishing a tool other people file issues against'
    ],
    library: [
      { title: 'Provider engineering documentation', author: 'Anthropic, OpenAI and others', note: 'Read the primary docs. Most secondhand advice is a year out of date.' },
      { title: 'AI Engineering', author: 'Chip Huyen', note: 'Practical structure for building on foundation models.' },
      { title: 'Designing Machine Learning Systems', author: 'Chip Huyen', note: 'Production thinking that transfers directly.' },
      { title: 'The Mythical Man-Month', author: 'Frederick Brooks', note: 'Why software estimates fail. Nothing about that has changed.' }
    ]
  },

  /* ---------------------------------------------------------------- CAPITAL */
  {
    id: 'capital-allocation',
    name: 'Investing and Capital',
    discipline: 'Capital',
    tagline: 'Make decisions about money that you can live with for thirty years.',
    thesis:
      'Two people can earn the same amount over a career and end up in completely different places, and ' +
      'most of that difference comes from savings rate, costs, and what they did during a crash. This is ' +
      'much more a discipline of temperament than of analysis, which is why it is trainable and why almost ' +
      'nobody trains it.',
    hours: { functional: 30, competent: 150, professional: 600, elite: 2500 },
    proofs: {
      functional: 'You have a written policy, automated contributions, and you understand what you own.',
      competent: 'You can analyse something independently and hold a plan through a bad year.',
      professional: 'You manage money to a mandate with a documented process.',
      elite: 'You have an edge you can evidence across more than one cycle.'
    },
    entryCheck: [
      'Some positive cash flow, however small',
      'An emergency buffer before you take any market risk'
    ],
    pillars: [
      {
        id: 'foundation',
        name: 'The Base',
        weight: 0.18,
        specialization: 'Personal finance',
        objective: 'Build the base that makes everything else survivable.',
        competencies: [
          'Knowing your savings rate, which matters more than your returns for a long time',
          'An emergency reserve and cover for the things that would ruin you',
          'Debt, in order of what it costs',
          'The tax-advantaged accounts available where you live'
        ],
        stages: [
          {
            name: 'Measure',
            work: 'Find out what you actually save and what you actually pay in fees.',
            check: 'Three months of measured savings rate.'
          },
          {
            name: 'Buffer',
            work: 'Fund the reserve before taking market risk.',
            check: 'A reserve at a number you chose deliberately.'
          },
          {
            name: 'Strip costs',
            work: 'Find and remove the fees quietly compounding against you.',
            check: 'Total annual cost known as a percentage.'
          }
        ],
        drills: [
          {
            name: 'Savings rate',
            dose: 'monthly',
            protocol: 'Compute what you saved as a share of what you earned after tax. Write it down each month. Over a decade this number does more work than any investment decision you will make.',
            mistake: 'Computing it once in a good month and assuming it holds.'
          },
          {
            name: 'One-page net worth',
            dose: 'monthly',
            protocol: 'Assets, liabilities, the change since last month, and one line on why it changed. Twelve of these is a genuine education in how money actually moves.',
            mistake: 'Tracking only the investment accounts and ignoring the debt.'
          },
          {
            name: 'Fee audit',
            dose: 'quarterly',
            protocol: 'List every cost on your capital: fund fees, platform fees, spreads, advice, tax drag. Add them up as one annual percentage. Fees compound against you exactly the way returns compound for you.',
            mistake: 'Comparing headline fees while ignoring the trading costs and tax underneath.'
          },
          {
            name: 'What would ruin me',
            dose: 'annually',
            protocol: 'Write the three events that would do lasting financial damage: illness, job loss, a legal claim. Check what covers each one. Insurance is boring until the year it is not.',
            mistake: 'Insuring the small stuff and leaving the catastrophic stuff uncovered.'
          }
        ],
        standard: 'A bad month is an inconvenience rather than an emergency.',
        milestone: {
          name: 'Base gate',
          criteria: [
            'An emergency reserve funded to a number you chose deliberately',
            'Savings rate measured for three consecutive months',
            'All investment costs known as one annual percentage'
          ]
        }
      },
      {
        id: 'theory',
        name: 'Understanding What You Own',
        weight: 0.22,
        specialization: 'Market literacy',
        objective: 'Be able to say where the return comes from.',
        competencies: [
          'Asset classes and why each one is paid',
          'Compounding, volatility and what a sequence of bad years does',
          'Diversification, and how correlations behave when it matters',
          'Where an edge could plausibly exist and where it cannot'
        ],
        stages: [
          {
            name: 'Sources',
            work: 'For everything you own, work out what actually produces the return.',
            check: 'Every holding explained in one sentence.'
          },
          {
            name: 'History',
            work: 'Study real drawdowns and what people did during them.',
            check: 'Five drawdowns studied with your own notes.'
          },
          {
            name: 'Arithmetic',
            work: 'Do the compounding and recovery maths by hand until it is intuitive.',
            check: 'You can compute recovery from a 40% fall without a calculator.'
          }
        ],
        drills: [
          {
            name: 'Where does the return come from',
            dose: '3 holdings',
            protocol: 'For three things you own, write whether the return comes from earnings growth, dividends, a rerating, or somebody paying more later. If it is only the last one, write that down honestly.',
            mistake: 'Describing what it did rather than why it should do anything.'
          },
          {
            name: 'Drawdown history',
            dose: '5 events',
            protocol: 'Study five historical crashes. Write what you think you would have done at the bottom, then read what most people actually did. The gap is the thing to plan around.',
            mistake: 'Reading the chart, where every crash looks obviously temporary in hindsight.'
          },
          {
            name: 'Do the maths by hand',
            dose: 'once, properly',
            protocol: 'Compute outcomes at different rates, fees and time horizons yourself. Feeling a 1% fee across thirty years in your own arithmetic changes behaviour in a way reading about it does not.',
            mistake: 'Using a calculator that hides the mechanism.'
          },
          {
            name: 'The 40% question',
            dose: 'annually',
            protocol: 'Write down what your portfolio does if markets fall 40% and your income stops in the same year. If you have not answered that, you have not finished planning.',
            mistake: 'Assuming the two are independent. They often arrive together.'
          }
        ],
        standard: 'You can explain everything you own to someone else, plainly.',
        milestone: {
          name: 'Literacy gate',
          criteria: [
            'Every holding\'s source of return explained in one sentence',
            'You understand the arithmetic of recovering from a large fall',
            'You can state what your portfolio does in a 40% decline'
          ]
        }
      },
      {
        id: 'policy',
        name: 'Deciding in Advance',
        weight: 0.24,
        specialization: 'Portfolio policy',
        objective: 'Make the decisions once, in writing, while you are calm.',
        competencies: [
          'A written policy: objectives, constraints, rules',
          'Allocation, rebalancing bands, automated contributions',
          'Position sizing and how much of anything is too much',
          'Committing in advance against your own future behaviour'
        ],
        stages: [
          {
            name: 'Write it',
            work: 'Produce the policy document. Two pages is enough.',
            check: 'A signed, dated policy statement.'
          },
          {
            name: 'Automate it',
            work: 'Remove the monthly decision entirely.',
            check: 'Contributions running without you.'
          },
          {
            name: 'Rehearse the bad case',
            work: 'Write what you will do at each level of decline, before you need it.',
            check: 'A written plan for -20%, -30% and -40%.'
          }
        ],
        drills: [
          {
            name: 'Write the policy',
            dose: '1 document',
            protocol: 'Two pages: goals, time horizon, allocation, rebalancing rule, what you will do in a 30% decline, and what would legitimately make you change the plan. Sign and date it.',
            mistake: 'Writing goals without writing the rules, which leaves you improvising in the exact moment when improvising is most expensive.'
          },
          {
            name: 'Automate the decision',
            dose: 'once',
            protocol: 'Set contributions to happen automatically so you decide once rather than twelve times a year under whatever mood the news has put you in.',
            mistake: 'Keeping manual control so you can "buy the dips", which in practice means buying less during dips.'
          },
          {
            name: 'Pre-mortem',
            dose: 'annually',
            protocol: 'Write how this portfolio fails: which assumption breaks, what sequence of events, over what period. Then write the rule that protects against each path.',
            mistake: 'Only imagining a crash. Slow underperformance over a decade is more likely and harder to sit through.'
          },
          {
            name: 'Rebalance mechanically',
            dose: 'when the band is breached',
            protocol: 'Set bands and rebalance when they are breached, not when you feel like it. Doing it once mechanically, when it feels wrong, is the actual exercise.',
            mistake: 'Rebalancing based on a view, which is just trading with extra steps.'
          }
        ],
        standard: 'You know what you will do in a crash because you wrote it down before one.',
        milestone: {
          name: 'Policy gate',
          criteria: [
            'A written policy statement, dated and signed by you',
            'Contributions automated',
            'One rebalance executed mechanically'
          ]
        }
      },
      {
        id: 'analysis',
        name: 'Analysing Something Specific',
        weight: 0.2,
        specialization: 'Security analysis',
        objective: 'Judge an individual opportunity on evidence you wrote down first.',
        competencies: [
          'Reading financial statements, starting with cash flow',
          'Valuation methods and the assumptions inside them',
          'Business quality: durability, capital needs, who management works for',
          'Writing a thesis that can be proven wrong'
        ],
        stages: [
          {
            name: 'Read',
            work: 'Read annual reports properly, starting with the statements and the footnotes.',
            check: 'Four reports read, cash flow first.'
          },
          {
            name: 'Write theses',
            work: 'Write positions down before taking them, with falsification conditions.',
            check: 'Five written theses with exit conditions.'
          },
          {
            name: 'Be wrong on purpose',
            work: 'Close a position because your own written condition triggered.',
            check: 'One thesis closed by its own rule.'
          }
        ],
        drills: [
          {
            name: 'One-page thesis',
            dose: '1 a month',
            protocol: 'What it is, why you think it is mispriced, what has to be true, what would prove you wrong, and the price at which you sell. If it takes more than a page you probably do not understand it.',
            mistake: 'Writing the bull case only, which makes the thesis unfalsifiable and therefore useless.'
          },
          {
            name: 'Statements first',
            dose: '1 report a week',
            protocol: 'Read one annual report starting with the cash flow statement and the footnotes, before the narrative section. The narrative is written to persuade you; the footnotes are written because they have to be.',
            mistake: 'Reading the chief executive\'s letter first and forming a view before seeing the numbers.'
          },
          {
            name: 'Paper positions',
            dose: 'ongoing',
            protocol: 'Record hypothetical positions with a dated thesis before committing money. Review at six months against exactly what you wrote, not what you now remember thinking.',
            mistake: 'Remembering your reasoning generously. This is why it has to be written and dated.'
          },
          {
            name: 'Find the bear case',
            dose: 'per thesis',
            protocol: 'Before buying, find the most credible person arguing the other side and write down their strongest point. If you cannot find one, look harder.',
            mistake: 'Finding a weak bear case and feeling reassured by it.'
          }
        ],
        standard: 'You can be shown wrong by your own notes.',
        milestone: {
          name: 'Analysis gate',
          criteria: [
            'Five written theses with conditions that would prove them wrong',
            'One thesis closed because its own rule triggered',
            'You can read a cash flow statement unaided'
          ]
        }
      },
      {
        id: 'behaviour',
        name: 'Managing Yourself',
        weight: 0.16,
        specialization: 'Investor behaviour',
        objective: 'Survive your own decisions, which is the actual job.',
        competencies: [
          'Keeping a decision journal and reading it back',
          'Recognising what you personally do under stress',
          'Position and portfolio limits set in advance',
          'Avoiding the things that end the game: leverage, concentration, illiquidity'
        ],
        stages: [
          {
            name: 'Record',
            work: 'Journal decisions with expectations and confidence.',
            check: 'Twelve entries.'
          },
          {
            name: 'Review',
            work: 'Read them back and check whether you were right as often as you thought.',
            check: 'One calibration review completed.'
          },
          {
            name: 'Bound the downside',
            work: 'Remove every path to permanent loss.',
            check: 'No position that could end the game.'
          }
        ],
        drills: [
          {
            name: 'Decision journal',
            dose: 'every decision',
            protocol: 'Before acting: what you expect, why, and how confident you are as a percentage. Review quarterly. This is the only reliable way to tell your skill from a good market.',
            mistake: 'Writing it after the fact, which produces a story rather than a record.'
          },
          {
            name: 'Rehearse the decline',
            dose: 'quarterly',
            protocol: 'Write what you will do at -20%, -30% and -40%. Read it during the next decline instead of improvising while your hands are shaking.',
            mistake: 'Writing "hold and buy more" without checking whether you will have income and nerve at the same time.'
          },
          {
            name: 'Ruin check',
            dose: 'quarterly',
            protocol: 'List every path to permanent loss of capital: leverage, one position too large, something you cannot sell, a counterparty. Remove or bound each one.',
            mistake: 'Treating a low probability as if it were zero, when the consequence is that you stop playing.'
          },
          {
            name: 'Do nothing on purpose',
            dose: 'when tempted',
            protocol: 'When you want to act on news, write down what you would do and put the note aside for a week. Then decide. Most of these notes look silly seven days later.',
            mistake: 'Confusing the urge to act with new information.'
          }
        ],
        standard: 'You did what you wrote down, during the worst month.',
        milestone: {
          name: 'Temperament gate',
          criteria: [
            'A decision journal with twelve entries you have reviewed for calibration',
            'You held your written plan through one real decline',
            'No position capable of causing permanent ruin'
          ]
        }
      }
    ],
    metrics: [
      { name: 'Savings rate', method: 'Saved over net income, monthly.' },
      { name: 'Total cost drag', method: 'All-in annual cost of your portfolio as a percentage.' },
      { name: 'Calibration', method: 'From the journal: how often you were right at each confidence level.' },
      { name: 'Actions outside policy', method: 'Things you did that your written plan did not allow. Target zero.' }
    ],
    failureModes: [
      { name: 'Learning by losing money quickly', fix: 'Paper theses with dated reviews before you add size. Slow the capital, not the learning.' },
      { name: 'Mistaking a bull market for skill', fix: 'Benchmark honestly and journal every decision.' },
      { name: 'Complexity for its own sake', fix: 'A boring diversified portfolio beats most sophistication. Justify every added layer in writing.' },
      { name: 'No written plan', fix: 'The policy document is the first thing you produce, not the last.' }
    ],
    arena: [
      'Real money, at a size where mistakes teach without maiming',
      'A written journal you actually reread',
      'Someone who will attack a thesis rather than admire it'
    ],
    library: [
      { title: 'The Psychology of Money', author: 'Morgan Housel', note: 'Behaviour as the dominant variable. Start here.' },
      { title: 'A Random Walk Down Wall Street', author: 'Burton Malkiel', note: 'The baseline any claim of edge has to beat.' },
      { title: 'The Intelligent Investor', author: 'Benjamin Graham', note: 'Chapters 8 and 20 are the ones that matter.' },
      { title: 'Thinking in Bets', author: 'Annie Duke', note: 'Separating decision quality from outcome quality.' }
    ],
    disclaimer:
      'This is educational material, not financial advice, and nothing here is suitable for everyone. ' +
      'Tax and account rules differ by country. For decisions that depend on your own circumstances, ' +
      'talk to someone qualified who can see them.'
  }
]);
