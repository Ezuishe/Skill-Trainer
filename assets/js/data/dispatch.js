/*
 * dispatch.js — the daily dispatch corpus.
 *
 * Each entry carries:
 *   source     the passage, in a widely reproduced rendering
 *   author     attribution, with the work where one is identifiable
 *   reading    what it means, including where it is commonly misread
 *   practice   one concrete thing to do today
 *   tension    the honest case against taking it too far
 *
 * Selection is worked out from the date, so everyone on a track sees the same
 * passage on the same day and the sequence rotates rather than repeating.
 */

window.DISPATCH_TRACKS = [
  {
    id: 'stoic',
    name: 'Stoicism',
    period: 'Greece and Rome, 3rd century BC to 2nd century AD',
    premise:
      'Work out what you control, act well within that, and accept the rest. Built by exiles, ' +
      'slaves and an emperor, mostly for use under pressure.',
    entries: [
      {
        source: 'You have power over your mind, not outside events. Realise this, and you will find strength.',
        author: 'Marcus Aurelius, Meditations',
        reading:
          'This is triage rather than resignation. Your attention is finite, so spend it where it can change something. Most anxiety is attention leaking toward things it cannot reach.',
        practice:
          'Write the three things on your mind today. Mark each one controllable, influenceable, or neither. Do the first one now. Write one sentence accepting the third.',
        tension:
          'Pushed far enough this becomes an argument for putting up with things that could be changed, often collectively. The line between what you control and what you do not sits further out than the comfortable reading suggests.'
      },
      {
        source: 'We suffer more often in imagination than in reality.',
        author: 'Seneca, Letters to Lucilius',
        reading:
          'Your mind simulates the disaster in high resolution and skips the part where you cope with it. People are reliably bad at predicting how much a bad outcome will actually hurt, and they overshoot.',
        practice:
          'Take whatever you are avoiding. Write down what happens in the worst realistic case, then what recovery looks like. Then do the smallest first step of the thing you were avoiding.',
        tension:
          'Some fears are accurate. There is a difference between rehearsing a catastrophe for no reason and noticing a real risk you have not done anything about.'
      },
      {
        source: 'It is not the man who has too little, but the man who craves more, that is poor.',
        author: 'Seneca, Letters to Lucilius',
        reading:
          'Wealth is a ratio. The bottom half of it, what you believe you need, is the part you can actually adjust, and almost nobody adjusts it deliberately.',
        practice:
          'Write the annual number at which you would stop trading time for money. Then write what you would do on the Monday after. If those two answers do not fit together, you have found something worth thinking about.',
        tension:
          'This gets used to talk people out of asking for fair pay. It is a discipline for someone who already has enough, and a bad argument for accepting too little.'
      },
      {
        source: 'No man is free who is not master of himself.',
        author: 'Epictetus',
        reading:
          'Independence starts on the inside. Someone who cannot govern their own attention ends up governed by whoever can capture it, whether that is an employer, an app, or a habit.',
        practice:
          'Pick the one compulsion costing you the most attention. Remove it at the level of your environment today: logged out, deleted, or in another room. Do not rely on deciding not to.',
        tension:
          'Talk about self-mastery slides easily into blaming people for constraints that are structural. Discipline is necessary and it is not sufficient, and it is not everyone\'s missing ingredient.'
      },
      {
        source: 'Waste no more time arguing what a good man should be. Be one.',
        author: 'Marcus Aurelius, Meditations',
        reading:
          'Written by a man who spent much of his life having that argument with himself, at night, in a notebook nobody was meant to read. It is aimed at philosophy as an identity rather than as behaviour.',
        practice:
          'Name one value you claim and have not acted on this week. Do the smallest version of it today, before you refine the theory any further.',
        tension:
          'Thinking is not always avoidance. Some decisions genuinely need working through, and the trap is only using thought as a substitute for a decision you have already made.'
      },
      {
        source: 'The impediment to action advances action. What stands in the way becomes the way.',
        author: 'Marcus Aurelius, Meditations',
        reading:
          'The obstacle tells you where the real work is. This is a practice of turning friction into the next task, and it is a long way from the claim that everything happens for a reason.',
        practice:
          'Name today\'s biggest obstacle. Finish this sentence: "because of this, the work is now ___". Then do that work.',
        tension:
          'Some obstacles are just losses. Treating every setback as a hidden opportunity is one way of never grieving anything.'
      },
      {
        source: 'Begin at once to live, and count each separate day as a separate life.',
        author: 'Seneca, Letters to Lucilius',
        reading:
          'Seneca kept returning to how much of a life gets spent waiting for it to start. The phase you are in is not the run-up to your life. It is the material.',
        practice:
          'Find one thing you have postponed until some future condition is met, the sort that starts "once this project ships". Move a piece of it into today.',
        tension:
          'Taken literally this argues against anything with a long payoff. Some days are correctly spent building something that will not pay out for years.'
      },
      {
        source: 'Man is disturbed not by things, but by the views he takes of them.',
        author: 'Epictetus, Enchiridion',
        reading:
          'Cognitive therapy rests on this claim, about two thousand years later. Between the event and your reaction there is an interpretation you wrote, and interpretations can be edited.',
        practice:
          'Catch one strong reaction today. Write the event in neutral language, then your interpretation, then a second interpretation that fits the same facts.',
        tension:
          'Some things are genuinely bad and the accurate view of them is upsetting. Reframing is a tool. It is not an obligation to feel fine.'
      },
      {
        source: 'He who fears death will never do anything worthy of a living man.',
        author: 'Seneca, Letters to Lucilius',
        reading:
          'Keeping the end in view is a prioritisation device more than a morbid one. It shrinks social fear back to its correct size, which is much smaller than it feels.',
        practice:
          'Write what you would stop doing if you had five years. Then actually stop one of those things this week, rather than intending to.',
        tension:
          'Thinking hard about mortality pushes people toward grand gestures. Most things worth building are built slowly by people who expect to be around for them.'
      },
      {
        source: 'First say to yourself what you would be; and then do what you have to do.',
        author: 'Epictetus, Discourses',
        reading:
          'Deciding what you are makes the daily choices smaller, because most of them have already been settled by the definition. The order matters: identity first, then tactics.',
        practice:
          'Write twelve words describing the person you are becoming. Name the one daily action only that person takes. Do it today.',
        tension:
          'A fixed identity resists new evidence. Hold it firmly enough to act on and loosely enough to revise when you turn out to be wrong.'
      },
      {
        source: 'How long are you going to wait before you demand the best for yourself?',
        author: 'Epictetus, Enchiridion',
        reading:
          'Aimed at the student who keeps agreeing with the philosophy and postponing the practice. Most of a life gets spent in the gap between agreeing and doing.',
        practice:
          'Name the standard you have quietly accepted that sits below what you are capable of. Raise it today, in one visible way.',
        tension:
          'Demanding your best and demanding it constantly are different things. Standards without recovery produce collapse rather than excellence.'
      },
      {
        source: 'The best revenge is not to be like your enemy.',
        author: 'Marcus Aurelius, Meditations',
        reading:
          'Retaliation makes you take the shape of the thing you are fighting. The practical version is that you should never let an opponent set your standards of conduct, because that is its own kind of losing.',
        practice:
          'Think of someone whose behaviour angered you recently. Write how you will respond in a way that fits your standards instead of theirs.',
        tension:
          'Refusing to retaliate is not the same as refusing to defend yourself. You can decline to become your enemy without agreeing to be their victim.'
      }
    ]
  },

  {
    id: 'eastern',
    name: 'Taoism and Zen',
    period: 'China and Japan, 6th century BC onward',
    premise:
      'Getting things done by working with a situation instead of forcing it. Where the Western ' +
      'traditions push, this one asks what is already happening and moves with it.',
    entries: [
      {
        source: 'A journey of a thousand miles begins beneath one\'s feet.',
        author: 'Laozi, Tao Te Ching, chapter 64',
        reading:
          'Usually rendered as "begins with a single step", but the literal image is better. It begins where you are standing, with the ground under you now, and not with the step you are planning.',
        practice:
          'Take the project you keep planning. Do ten minutes of the actual work before you do any more planning today.',
        tension:
          'Starting is not everyone\'s problem. If you start things constantly, the harder discipline is finishing what is already open.'
      },
      {
        source: 'The sage does not accumulate. The more he does for others, the more he has.',
        author: 'Laozi, Tao Te Ching, chapter 81',
        reading:
          'A fair description of how reputation and relationships behave. They are among the few assets that grow when you spend them, and hoarding knowledge or credit tends to shrink the position it was protecting.',
        practice:
          'Give something away today with no expected return: an introduction, something you learned the hard way, credit for work you contributed to.',
        tension:
          'Generosity without limits gets exploited, and the people who talk most about it are often the ones benefiting from yours.'
      },
      {
        source: 'Knowing others is intelligence; knowing yourself is true wisdom. Mastering others is strength; mastering yourself is true power.',
        author: 'Laozi, Tao Te Ching, chapter 33',
        reading:
          'A hierarchy of difficulty. Self-knowledge is harder because the thing doing the observing is also the thing being observed, and it has an interest in the result.',
        practice:
          'Write down the one thing about how you work that people have told you more than once. Sit with the possibility that they are right.',
        tension:
          'Introspection has real limits, and people are poor at knowing their own motives. Evidence about your behaviour usually beats reflection on it.'
      },
      {
        source: 'When you try to control, you lose control.',
        author: 'A common rendering of Tao Te Ching, chapter 29',
        reading:
          'Over-specification kills anything adaptive: teams, markets, your own learning. Set the direction and the constraints, then leave enough room for the thing to find its own path.',
        practice:
          'Find one thing you are micromanaging. Define the outcome and the constraints, hand over the method completely, and do not check on it today.',
        tension:
          'Under-management fails too, and it usually gets excused as trust. Absence of control is not the same as clarity about who has it.'
      },
      {
        source: 'Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.',
        author: 'Zen proverb',
        reading:
          'Achievement does not change the texture of your days. What changes is your relationship to ordinary work, which means the ordinary work had better be worth doing.',
        practice:
          'Pick a piece of routine work you resent. Do it today with full attention instead of resistance, and notice what the resentment was costing you.',
        tension:
          'Some drudgery should be automated or deleted rather than accepted calmly. Equanimity is not an argument against fixing the situation.'
      },
      {
        source: 'In the beginner\'s mind there are many possibilities; in the expert\'s mind there are few.',
        author: 'Shunryu Suzuki, Zen Mind, Beginner\'s Mind',
        reading:
          'Expertise narrows your options, usually correctly and occasionally fatally. The cost of good pattern recognition is that genuinely new situations get filed under old patterns.',
        practice:
          'Take a problem in your area of expertise. Ask what someone with no background would try, and take it seriously for ten minutes before dismissing it.',
        tension:
          'Beginner\'s mind gets romanticised by people avoiding the work of becoming expert. Most of the time the narrowed option set is simply right.'
      },
      {
        source: 'Muddy water is best cleared by leaving it alone.',
        author: 'Alan Watts, on the Taoist principle',
        reading:
          'Some problems resolve through time and non-interference. Stirring feels like effort and is often the thing preventing the settling.',
        practice:
          'Name one situation you keep stirring: a conversation you reopen, a decision you revisit. Leave it alone for 48 hours on purpose.',
        tension:
          'Some things do not settle, they rot. Tell waiting apart from avoidance by setting the date on which you will act regardless.'
      },
      {
        source: 'Nature does not hurry, yet everything is accomplished.',
        author: 'Laozi, Tao Te Ching',
        reading:
          'A warning about confusing speed with progress. A rate you can hold compounds. A rate you cannot produces a burst and then a collapse that costs more than the burst gained.',
        practice:
          'Look at your current pace on your main project. Set a rate you could hold for a year and work at exactly that today, including stopping when you reach it.',
        tension:
          'Some windows genuinely close. There are moments when sprinting is right, and mistaking one situation for the other is expensive in both directions.'
      },
      {
        source: 'The obstacle is the path.',
        author: 'Zen proverb',
        reading:
          'Where you are stuck is where your model of the problem is wrong. The difficulty is not blocking the lesson, it is showing you where the lesson is.',
        practice:
          'Take the thing you are avoiding because it is hard. Spend your first block on it, at the exact point where it is hardest.',
        tension:
          'Not every wall is a door. Persistent difficulty is sometimes evidence that you picked a bad problem.'
      },
      {
        source: 'To a mind that is still, the whole universe surrenders.',
        author: 'Attributed to Zhuangzi',
        reading:
          'A claim about signal and noise. A settled mind is not a passive one. It notices more, because it is not spending its capacity on internal broadcast.',
        practice:
          'Sit for ten minutes with no input: no phone, no music, no notebook. Note what surfaces. Solutions often arrive in the gap you never leave open.',
        tension:
          'Stillness will not supply information you do not have. Some problems need data, and no amount of sitting quietly will produce it.'
      },
      {
        source: 'Do not seek to follow in the footsteps of the wise; seek what they sought.',
        author: 'Matsuo Bashō',
        reading:
          'Copying someone\'s output copies the surface. What actually transfers is the question they were asking and the standard they held themselves to while asking it.',
        practice:
          'Take someone whose work you admire. Instead of copying their method, write down the question they appear to be answering, then ask it of your own field.',
        tension:
          'Direct imitation is genuinely useful early on. Originality without absorbed craft is usually just inexperience with better branding.'
      },
      {
        source: 'When walking, walk. When eating, eat.',
        author: 'Zen proverb',
        reading:
          'The whole doctrine of attention in six words. Divided attention costs you more than efficiency. None of the divided activities gets properly done or properly experienced.',
        practice:
          'Choose one routine activity today and do only that: no podcast, no second screen. Then try it on your first block of real work.',
        tension:
          'Some combinations genuinely work, and a rigid rule about single-tasking becomes another thing to feel bad about. Test it rather than assuming.'
      }
    ]
  },

  {
    id: 'strategy',
    name: 'Strategy and Power',
    period: 'Sun Tzu to Clausewitz',
    premise:
      'How position, timing and information settle contests before force gets applied. Read as a ' +
      'description of how competitive situations work, not as permission.',
    entries: [
      {
        source: 'Every battle is won before it is ever fought.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Outcomes are mostly settled by preparation, position and picking which fights to have. By the time you are in the room, most of the variables are fixed. This is the strongest available argument for preparing.',
        practice:
          'Take your next important meeting or negotiation. Spend three times as long preparing as it will last, and spend most of that on their interests instead of your script.',
        tension:
          'Believing outcomes are fixed in advance makes people passive in the room. Live situations do turn, and being able to adapt is itself part of preparation.'
      },
      {
        source: 'If you know the enemy and know yourself, you need not fear the result of a hundred battles.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Two intelligence problems, and the second is much harder. Most competitive failure comes from overrating your own capability while underrating the other side\'s constraints.',
        practice:
          'Write an honest assessment of your position: three real strengths, three weaknesses you would rather not name, then the same for whoever you are up against.',
        tension:
          'Framing everything as a contest finds enemies where there were possible collaborators. Most situations are not zero-sum.'
      },
      {
        source: 'The supreme art of war is to subdue the enemy without fighting.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'The best position makes the contest unnecessary: a better offer, a niche nobody wants to attack, an alternative that costs them more than agreeing does. Fighting is a tax you pay for bad positioning.',
        practice:
          'Take a conflict you are in now. Design one option that makes the disagreement irrelevant instead of winning it.',
        tension:
          'Some conflicts have to be fought, and a wish to avoid confrontation often disguises itself as strategic sophistication.'
      },
      {
        source: 'War is the continuation of politics by other means.',
        author: 'Carl von Clausewitz, On War',
        reading:
          'No contest means anything separated from the objective behind it. Tactics detached from purpose produce wins that cost more than they return, which is the usual shape of a work escalation that has got out of hand.',
        practice:
          'Name the objective behind your biggest current effort. If you cannot say it in one sentence, that is today\'s real work.',
        tension:
          'Clausewitz also described how objectives drift once a conflict is under way. Stating the purpose once is not enough; it needs rechecking as things change.'
      },
      {
        source: 'Opportunities multiply as they are seized.',
        author: 'Attributed to Sun Tzu',
        reading:
          'Options come from moving, not from waiting. Each committed action produces information and contact with people, and those produce the next set of options. Sitting still produces none.',
        practice:
          'Take the smallest committed action on your largest ambition today: one email, one publication, one call. Note what options exist by the evening that did not this morning.',
        tension:
          'Moving also closes options. Committing early to the wrong path will generate plenty of opportunities in a direction you did not want.'
      },
      {
        source: 'Everything in war is very simple, but the simplest thing is difficult.',
        author: 'Carl von Clausewitz, On War',
        reading:
          'Clausewitz called the gap between the plan and its execution "friction". Strategy fails less often from bad analysis than from a pile-up of small obstacles, each of which looks trivial on its own.',
        practice:
          'Take a plan that is not moving. List every small friction point in getting it done. Remove the two cheapest ones today.',
        tension:
          'Friction is also a signal. Sometimes a plan is stalled because of a real problem nobody has said out loud yet, and clearing logistics will not touch it.'
      },
      {
        source: 'He who defends everything defends nothing.',
        author: 'Frederick the Great',
        reading:
          'Spreading effort evenly is defeat by dilution. Choosing what to leave undefended is the strategic act, and it is uncomfortable precisely because it is a real decision with a cost.',
        practice:
          'List your current commitments. Choose one to stop defending, and tell the person who needs to know today.',
        tension:
          'Concentration assumes you identified the right thing to concentrate on. Concentrating on the wrong front is worse than spreading thin.'
      },
      {
        source: 'Do not repeat the tactics which gained you one victory, but let your methods be regulated by the infinite variety of circumstances.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'The trap of the successful playbook. What worked was matched to a particular situation, and when the situation changes the same move becomes the reason you lose.',
        practice:
          'Identify a method you use because it worked once. Write the conditions that made it work, then check whether those conditions still hold.',
        tension:
          'Constant novelty stops anything compounding. Repeatable methods are how organisations scale; the discipline is knowing what conditions each one needs.'
      },
      {
        source: 'It is better to be feared than loved, if you cannot be both.',
        author: 'Niccolò Machiavelli, The Prince',
        reading:
          'Probably the most misused sentence in political writing. Machiavelli\'s actual claim is narrower: love depends on the other party\'s continuing goodwill and fear depends on you, so never build a position that requires other people to keep liking you.',
        practice:
          'Find one arrangement that only works while someone continues to feel warmly toward you. Give it a structural basis instead: a contract, a written agreement, a second option.',
        tension:
          'Machiavelli also warned that being hated is fatal, and this line has been used to excuse a great deal of ordinary cruelty. Reliability, not fear, is the usable version.'
      },
      {
        source: 'In the midst of chaos, there is also opportunity.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Disruption reshuffles position. Incumbents are optimised for the conditions that just ended, so the periods everyone experiences as threatening are the periods when position is cheapest to change.',
        practice:
          'Name a disruption currently hitting your field. Write what it makes newly possible for someone with no legacy position to protect.',
        tension:
          'Chaos also destroys the unprepared. We hear from the people who benefited, which makes disruption look far more favourable than it is on average.'
      },
      {
        source: 'The general who advances without coveting fame and retreats without fearing disgrace is the jewel of the kingdom.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Ego distorts both advancing and retreating. Being able to leave a losing position without feeling humiliated is one of the rarest and most valuable capabilities there is.',
        practice:
          'Identify a commitment you are continuing mainly because quitting would look bad. Cost it honestly, then decide on the merits.',
        tension:
          'Reputation is a real asset and treating it as pure ego is naive. The point is to price it properly, not to pretend it does not matter.'
      },
      {
        source: 'Speed is the essence of war.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Tempo is a weapon. Operating on a faster decision cycle than your competition means responding to conditions they have not finished processing. The modern version is simply shipping more often.',
        practice:
          'Take your slowest recurring decision or delivery cycle. Halve it once, deliberately, and see what actually broke. Usually less than you expected.',
        tension:
          'Speed compounds mistakes as efficiently as progress. Fast cycles need fast feedback, or you just arrive at the wrong place sooner.'
      }
    ]
  },

  {
    id: 'mastery',
    name: 'Mastery and Craft',
    period: 'Practitioners across several fields',
    premise:
      'What people who got to the top of demanding fields say about how it actually happened. ' +
      'Usually less romantic and a lot more repetitive than the stories suggest.',
    entries: [
      {
        source: 'I fear not the man who has practised 10,000 kicks once, but I fear the man who has practised one kick 10,000 times.',
        author: 'Bruce Lee',
        reading:
          'Depth beats breadth in anything with a physical or intuitive component. Repetition past the point of boredom is where a skill becomes automatic and stays available under pressure.',
        practice:
          'Identify the single most fundamental movement in your skill. Do twenty deliberate repetitions of only that today.',
        tension:
          'Pure repetition produces brittle skill. The research on expertise favours varied and mixed practice over grinding one thing in isolation.'
      },
      {
        source: 'It is not that I am so smart, it is just that I stay with problems longer.',
        author: 'Albert Einstein',
        reading:
          'Sustained attention on one hard problem is rarer than intelligence and less unevenly distributed. Most people leave the problem well before the useful part.',
        practice:
          'Take your hardest current problem and stay with it for a full uninterrupted hour, past the point where you want to go and check something.',
        tension:
          'Persistence on the wrong problem is expensive. Endurance only becomes a virtue after you have chosen the problem well.'
      },
      {
        source: 'Amateurs sit and wait for inspiration; the rest of us just get up and go to work.',
        author: 'Stephen King, On Writing',
        reading:
          'Professional output runs on a schedule rather than a state of mind. Waiting until you feel ready is the most respectable-looking form of avoidance available.',
        practice:
          'Work at the scheduled time today regardless of how you feel. Predict the quality beforehand, then compare it with what you actually produced.',
        tension:
          'Forcing it every day produces burnout and a lot of mediocre volume. Schedules work when they include real recovery instead of just compliance.'
      },
      {
        source: 'The master has failed more times than the beginner has even tried.',
        author: 'Attributed to Stephen McCranie',
        reading:
          'Expertise is accumulated failure that somebody examined rather than merely survived. The difference is not tolerance for failing, it is the discipline of getting information out of each one.',
        practice:
          'Write your three most recent failures and one specific transferable lesson from each. If you cannot name a lesson, that failure has not been paid for yet.',
        tension:
          'Failure only teaches when there is feedback. Repeated failure without a clear signal about what went wrong teaches helplessness instead.'
      },
      {
        source: 'You do not rise to the level of your goals. You fall to the level of your systems.',
        author: 'James Clear, Atomic Habits',
        reading:
          'Ambition is cheap and common. What decides the outcome is what happens on an ordinary Tuesday when you do not feel like it, which is what a system is for.',
        practice:
          'Take your most important goal. Define the smallest daily action that serves it and put it in the calendar at a fixed time for the next fortnight.',
        tension:
          'Systems without direction produce efficient movement toward nothing in particular. The goal still decides which system is worth building.'
      },
      {
        source: 'Whatever you are, be a good one.',
        author: 'Attributed to Abraham Lincoln',
        reading:
          'Status differences between fields matter much less than position within one. Being excellent travels between domains in a way that the prestige of a field does not.',
        practice:
          'Take the least glamorous part of your current role and do it to an unreasonable standard today. Note who notices.',
        tension:
          'Excellence in a dying field is still limited by the field. Craft matters and it does not replace choosing where to apply it.'
      },
      {
        source: 'Quality is not an act, it is a habit.',
        author: 'Will Durant, summarising Aristotle',
        reading:
          'Almost always misattributed to Aristotle himself, which is oddly appropriate. Standards are made of repeated behaviour rather than of a decision you took once.',
        practice:
          'Choose one recurring output: an email, a commit, a document. Define your standard explicitly and apply it every single time today.',
        tension:
          'Applying the same standard to everything is a misallocation. Some outputs deserve excellence and some deserve to be finished quickly and forgotten.'
      },
      {
        source: 'If you want to master something, teach it.',
        author: 'Attributed to Richard Feynman',
        reading:
          'Explaining something exposes the difference between recognising it and understanding it. You can follow an argument you could not rebuild, and only the rebuilding is usable.',
        practice:
          'Take something you learned this week and write an explanation for someone with no background in it. Every point where you reach for jargon marks a gap.',
        tension:
          'Teaching too early can lock in a shallow model and make it socially awkward to revise. Teach what you have tested, not only what you have read.'
      },
      {
        source: 'It is not enough to be busy; so are the ants. The question is: what are we busy about?',
        author: 'Henry David Thoreau',
        reading:
          'Activity is a comfortable substitute for progress. The busiest stretches of a career are often the least consequential, partly because being busy protects you from this question.',
        practice:
          'List everything you did yesterday. Mark what will still matter in a year. Cut one thing from today that failed the test.',
        tension:
          'Plenty of necessary work does not survive a one-year test and still has to be done. This is about proportion, not purity.'
      },
      {
        source: 'The best time to plant a tree was twenty years ago. The second best time is now.',
        author: 'Proverb, widely attributed',
        reading:
          'Anything that compounds is worth starting late, because the alternative to a late start is not starting. Regret about the timing is one more way of continuing not to start.',
        practice:
          'Take the compounding thing you regret not starting earlier: a skill, a habit, an investment. Start the smallest version today.',
        tension:
          'Not everything compounds, and sunk-cost reasoning likes to wear this proverb as a disguise. Check the mechanism before you commit years to it.'
      },
      {
        source: 'Simplicity is the ultimate sophistication.',
        author: 'Attributed to Leonardo da Vinci',
        reading:
          'Complexity is what a problem looks like before you have understood it. Simplifying is the last and hardest stage of any work, which is why most work never gets there.',
        practice:
          'Take something you built or wrote recently and remove a quarter of it without losing the function or the meaning.',
        tension:
          'Some problems are irreducibly complicated, and simplifying those means falsifying them. Elegance should not be bought with accuracy.'
      },
      {
        source: 'Comparison is the thief of joy.',
        author: 'Attributed to Theodore Roosevelt',
        reading:
          'Comparing yourself to other people is noisy, because you see their output and your own process. Comparing yourself to your past self uses data you actually have.',
        practice:
          'Write down what you could not do twelve months ago that you can do now. Keep the list. It is the only benchmark where you have reliable data.',
        tension:
          'Some comparison is necessary calibration. Knowing where you really stand against a field is how you work out what to train next.'
      }
    ]
  },

  {
    id: 'meaning',
    name: 'Meaning and Existence',
    period: 'Existentialism, absurdism, and what led to them',
    premise:
      'What to do with freedom, mortality, and the absence of an assigned purpose. The tradition ' +
      'that takes the hardest questions seriously instead of dissolving them.',
    entries: [
      {
        source: 'He who has a why to live can bear almost any how.',
        author: 'Friedrich Nietzsche, quoted by Viktor Frankl',
        reading:
          'Frankl carried this line through the camps and built a psychiatry on it. Meaning is not a reward for good conditions. It is the structure that makes bad conditions survivable.',
        practice:
          'Write your why in one sentence, for the specific difficult thing you are doing now. If you cannot, that difficulty may be the wrong one to be enduring.',
        tension:
          'This gets used to make people endure conditions that should be changed. Meaning makes suffering bearable without making it justified.'
      },
      {
        source: 'One must imagine Sisyphus happy.',
        author: 'Albert Camus, The Myth of Sisyphus',
        reading:
          'Camus\'s answer to a universe that hands out no purpose: the struggle itself, chosen consciously, is enough. This is defiance rather than optimism, and it has stopped needing the universe to agree.',
        practice:
          'Identify the repetitive work in your life that will never be finished. Choose it deliberately today instead of enduring it.',
        tension:
          'There is a version of this that romanticises pointless labour. Some boulders should be put down.'
      },
      {
        source: 'Man is condemned to be free.',
        author: 'Jean-Paul Sartre, Being and Nothingness',
        reading:
          'Condemned, because there is nobody else to blame. Sartre thought most claims of having no choice conceal a choice you made and would rather not own, including the choice to keep the constraint.',
        practice:
          'Take one sentence you say that begins "I have no choice but to". Write the choices that do exist, including the ones with costs you have decided not to pay.',
        tension:
          'Sartre badly underweights real constraint. Not every limitation is a disguised choice, and telling people otherwise is a cruelty dressed up as philosophy.'
      },
      {
        source: 'The unexamined life is not worth living.',
        author: 'Socrates, in Plato\'s Apology',
        reading:
          'Said at his trial, with his life as the stake. The claim is that a life run entirely on inherited assumptions is not really being lived by the person living it.',
        practice:
          'Name one belief about how you should live that you inherited and have never tested. Write the case against it honestly.',
        tension:
          'Permanent self-examination is its own disorder. At some point beliefs have to be acted on, and the examining becomes a way of not living.'
      },
      {
        source: 'Everything can be taken from a man but one thing: the last of the human freedoms, to choose one\'s attitude in any given set of circumstances.',
        author: 'Viktor Frankl, Man\'s Search for Meaning',
        reading:
          'Written by someone with the standing to say it. The claim is deliberately minimal and therefore hard to break: whatever the constraints, your response to them is still yours.',
        practice:
          'Take the circumstance you most resent. Without pretending it is good, choose your stance toward it deliberately today and write it down.',
        tension:
          'This gets quoted by people demanding that others accept the unacceptable. It is a resource for the person inside the situation, not an instruction from outside it.'
      },
      {
        source: 'God is dead. And we have killed him.',
        author: 'Friedrich Nietzsche, The Gay Science',
        reading:
          'A warning rather than a celebration. Nietzsche\'s point was that when inherited meaning collapses it leaves a vacuum, and filling it deliberately is the work. Something worse fills it otherwise.',
        practice:
          'Write what actually organises your choices, in plain language. If nothing does, name what you would want to, and act on it once today.',
        tension:
          'Building your own values is much harder than Nietzsche makes it sound. Traditions carry accumulated solutions to problems you have not met yet.'
      },
      {
        source: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
        author: 'Ralph Waldo Emerson',
        reading:
          'The pressure to conform is mostly invisible and mostly economic. Holding a position that is genuinely yours costs something specific, and knowing the price is part of choosing it.',
        practice:
          'Identify one place where you perform a version of yourself for an audience. Decide today whether the trade is worth it. Either answer is fine as long as you choose it.',
        tension:
          'Authenticity is also a marketing position, and often a privilege. Some conformity is just respect for other people, and some of it is how you keep a job you need.'
      },
      {
        source: 'Between stimulus and response there is a space. In that space is our power to choose our response.',
        author: 'Commonly attributed to Viktor Frankl, though the attribution is disputed',
        reading:
          'The source is uncertain and the mechanism is not. Almost all reactive damage, the message you sent and the sentence you said, comes from collapsing that space to nothing.',
        practice:
          'Introduce a deliberate delay today. Whenever a reaction feels urgent, wait sixty seconds before acting. Note what changed in the gap.',
        tension:
          'Not every gap should be filled with deliberation. Some situations need an immediate response and over-processing is its own failure.'
      },
      {
        source: 'The purpose of life is not to be happy. It is to be useful, to be honourable, to be compassionate.',
        author: 'Attributed to Ralph Waldo Emerson',
        reading:
          'Happiness pursued directly is unstable. It turns up much more reliably as a by-product of contribution and connection, which is one of the better-supported findings in wellbeing research.',
        practice:
          'Do one thing today that is useful to a specific person and produces nothing for you. Note what it does to your own state.',
        tension:
          'Usefulness can become a socially approved route to erasing yourself. Serving other people at the cost of your own life is not the trade being recommended.'
      },
      {
        source: 'We must be willing to let go of the life we planned so as to have the life that is waiting for us.',
        author: 'Attributed to Joseph Campbell',
        reading:
          'Plans made by a younger person with less information can turn into prisons that get defended out of consistency. Commitment is a virtue right up until it becomes an excuse.',
        practice:
          'Name a plan you are following mainly because you announced it. Ask what you would choose today, knowing what you now know.',
        tension:
          'Endless openness to change stops anything compounding. Most quitting happens in the difficult middle rather than at a genuine reassessment point.'
      },
      {
        source: 'Tell me, what is it you plan to do with your one wild and precious life?',
        author: 'Mary Oliver, The Summer Day',
        reading:
          'Unanswerable in the abstract and entirely answerable in the concrete. Whatever is in your calendar this week is your current answer to it.',
        practice:
          'Look at your calendar for the next seven days. That is the answer at present. Change one entry so it becomes an answer you would defend.',
        tension:
          'Not every week can be significant. Ordinary maintenance weeks are what make the meaningful ones possible.'
      },
      {
        source: 'The two most important days in your life are the day you are born and the day you find out why.',
        author: 'Attributed to Mark Twain',
        reading:
          'Purpose usually gets discovered through action rather than reflection. You find it by trying things and noticing what you cannot stop doing. Waiting to feel called is a poor search strategy.',
        practice:
          'Note the work you did in the last month that you would have done unpaid. That signal beats any amount of thinking about it.',
        tension:
          'The single-purpose story is a fairly modern invention and it makes a lot of people feel defective. Plenty of good lives have several purposes, or none anyone stated.'
      }
    ]
  },

  {
    id: 'wealth',
    name: 'Money and Leverage',
    period: 'Modern practitioners and classical economics',
    premise:
      'How money, ownership and leverage actually behave, treated as mechanisms rather than as ' +
      'motivation. Descriptive rather than aspirational.',
    entries: [
      {
        source: 'Give me a lever long enough and a place to stand, and I shall move the earth.',
        author: 'Archimedes',
        reading:
          'The founding statement about leverage. The modern forms are capital, labour, code and media, and the last two differ from the first two in one important way: they copy at almost no cost and need nobody\'s permission.',
        practice:
          'Identify which of those four you currently use. Take one concrete step today toward one you do not.',
        tension:
          'Leverage magnifies losses just as efficiently. Applied to a bad position or bad judgement it gets you to the wrong outcome faster.'
      },
      {
        source: 'Play long-term games with long-term people.',
        author: 'Naval Ravikant',
        reading:
          'Compounding needs continuity, in relationships as much as in money. Nearly all outsized returns come from repeated games, where your reputation becomes an asset rather than an expense.',
        practice:
          'Name three people you want to be doing business with in ten years. Do something useful for one of them today with no expectation of return.',
        tension:
          'Loyalty to the wrong long game is expensive. Some relationships and some industries should be left, and sunk cost argues hard against it.'
      },
      {
        source: 'The big money is not in the buying and the selling, but in the waiting.',
        author: 'Charlie Munger',
        reading:
          'Activity feels like work and usually destroys returns through costs, tax and mistimed decisions. The hardest part of most good strategies is doing nothing while you hold them.',
        practice:
          'Take one position you are tempted to change out of restlessness: an investment, a project, a career move. Write the case for doing nothing for another six months.',
        tension:
          'Patience with a deteriorating position is not discipline. Waiting needs a thesis with conditions that would prove it wrong, otherwise it is just inertia.'
      },
      {
        source: 'Earn with your mind, not your time.',
        author: 'Naval Ravikant',
        reading:
          'Income based on hours is linear and capped by the number of hours. Moving to income based on judgement, where output is not tied to time spent, is the largest structural change available in most careers.',
        practice:
          'Work out what proportion of your income depends on hours worked. Design one small piece that would pay without you being present, and start it.',
        tension:
          'This is much easier from an existing base of savings and options. Selling time is how most people fund the transition, and there is nothing embarrassing about that.'
      },
      {
        source: 'Price is what you pay. Value is what you get.',
        author: 'Warren Buffett',
        reading:
          'This goes well beyond markets: hires, tools, and the cheap option that costs three times as much in rework. Optimising for price alone is how people systematically overpay in the currency that matters.',
        practice:
          'Find one decision this year where you optimised for price and it cost you. Write the real total, and use that number in the next decision.',
        tension:
          'Estimates of value are easy to inflate when you want to justify spending. The discipline needs an honest number rather than a comfortable story.'
      },
      {
        source: 'Compound interest is the eighth wonder of the world. He who understands it, earns it; he who does not, pays it.',
        author: 'Attributed to Albert Einstein, almost certainly wrongly',
        reading:
          'The attribution is bogus and the mechanism is real. What makes it worth repeating is that the effect is genuinely unintuitive: people reason in straight lines, so the later years always come as a surprise.',
        practice:
          'Compute one compounding process in your own life over ten years with real numbers: savings, skill hours, audience. Doing the arithmetic changes behaviour more than the principle does.',
        tension:
          'Compounding assumes survival and continuity. Ruin, interruption and career breaks all break the model, and the model rarely mentions them.'
      },
      {
        source: 'Specific knowledge is knowledge you cannot be trained for.',
        author: 'Naval Ravikant',
        reading:
          'Anything teachable as a course can be commoditised and priced down. Durable advantage tends to sit at the intersection of your obsessions and your experience, which by definition is not on a syllabus.',
        practice:
          'Write the intersection of three things you know unusually well. That combination is your defensible position, not any single one of them.',
        tension:
          'Highly specific knowledge can be unsellable if no market exists at that intersection. Check that somebody wants it before building a career on it.'
      },
      {
        source: 'Someone is sitting in the shade today because someone planted a tree a long time ago.',
        author: 'Warren Buffett',
        reading:
          'Two claims at once. What you enjoy now was built by earlier decisions, and what you decide now mostly pays out to a later version of you. Both are easy to forget under short-term pressure.',
        practice:
          'Identify one thing you will plant today that pays out in five years and nothing before then. Do the first hour of it.',
        tension:
          'Permanent deferral is also a failure. Some shade should be enjoyed now, and dying with an unspent portfolio is a real outcome.'
      },
      {
        source: 'The difference between successful people and really successful people is that really successful people say no to almost everything.',
        author: 'Warren Buffett',
        reading:
          'Buffett describes most of his decisions as rejections. Capacity is finite, so the quality of what you accept is capped entirely by how ruthlessly you decline.',
        practice:
          'Decline one good opportunity today specifically because it is not excellent. Write down what accepting it would have cost you.',
        tension:
          'Saying no requires already having options. Early on, saying yes broadly is how you build the option set you will later be able to decline from.'
      },
      {
        source: 'Risk comes from not knowing what you are doing.',
        author: 'Warren Buffett',
        reading:
          'A reframing of risk from volatility to ignorance. What matters is not how much a thing moves, but how well you understand the mechanism producing the movement.',
        practice:
          'Take your largest current exposure, financial or professional. Write the mechanism by which it could fail. Any vagueness in that paragraph is your actual risk.',
        tension:
          'Confidence in your own understanding is exactly the bias that produces disasters. Knowing what you are doing and believing you do are different states.'
      },
      {
        source: 'You do not get rich by spending your time to save money. You get rich by saving your time to make money.',
        author: 'Naval Ravikant',
        reading:
          'Set an hourly rate below which you refuse to do things, and hold it even before the money arrives. The behaviour has to come first, which is the part that makes it hard.',
        practice:
          'Set your rate. Find one recurring task below it and eliminate, automate or delegate it this week.',
        tension:
          'This assumes disposable income, and it ignores that some low-value tasks teach you how your own business works. Founders who outsource everything early often lose the plot.'
      },
      {
        source: 'The four most dangerous words in investing are: this time it is different.',
        author: 'Sir John Templeton',
        reading:
          'Every bubble comes with a story about why the old rules have stopped applying. Occasionally the story is true, which is exactly why the phrase stays persuasive and expensive.',
        practice:
          'Find a belief you hold that depends on current conditions being unprecedented. Write down what the historical base rate says about it.',
        tension:
          'Sometimes it genuinely is different, because technology and institutions do change. Base rates are where you start, not where you finish.'
      }
    ]
  }
];
