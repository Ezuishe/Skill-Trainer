/*
 * dispatch.js — the daily dispatch corpus.
 *
 * Each track is a coherent tradition, not a quote dump. An entry carries:
 *   source      the passage, in a widely reproduced rendering
 *   author      attribution, with the work where it is identifiable
 *   reading     what it actually means, including where it is commonly misread
 *   practice    one concrete thing to do today
 *   tension     an honest counterweight — the case against taking it too far
 *
 * Selection is deterministic by date, so a given day shows the same entry to
 * everyone on that track, and the sequence rotates rather than repeating.
 */

window.DISPATCH_TRACKS = [
  {
    id: 'stoic',
    name: 'Stoicism',
    period: 'Greece & Rome, 3rd c. BCE – 2nd c. CE',
    premise:
      'Separate what you control from what you do not; act well within the first and accept the second. A philosophy built by exiles, slaves and emperors, for use under pressure.',
    entries: [
      {
        source: 'You have power over your mind — not outside events. Realise this, and you will find strength.',
        author: 'Marcus Aurelius, Meditations',
        reading:
          'The dichotomy of control is not resignation. It is triage: your effort is finite, so spend it where it can act. Anxiety is almost always effort leaking toward things outside the boundary.',
        practice:
          'List the three things occupying your mind today. Mark each controllable, influenceable, or neither. Do the controllable one first; write one sentence accepting the third.',
        tension:
          'Taken too far this becomes an excuse for passivity about conditions that could be changed collectively. The boundary is wider than the comfortable reading suggests.'
      },
      {
        source: 'We suffer more often in imagination than in reality.',
        author: 'Seneca, Letters to Lucilius',
        reading:
          'The mind simulates disaster in high resolution and skips the part where you cope. Most dreaded events are survivable, and your prediction of your own future distress is systematically overstated.',
        practice:
          'Take the thing you are avoiding. Write what actually happens in the worst realistic case, then the recovery. Then do the smallest first step of the avoided thing.',
        tension:
          'Some fears are accurate signals. Distinguish rehearsing a catastrophe from noticing a real risk you have not yet mitigated.'
      },
      {
        source: 'It is not the man who has too little, but the man who craves more, that is poor.',
        author: 'Seneca, Letters to Lucilius',
        reading:
          'Wealth is a ratio, not a sum. The denominator — what you believe you need — is the variable you actually control, and it is the one almost nobody manages deliberately.',
        practice:
          'Write the annual number at which you would stop trading time for money. Then write what you would do the following Monday. If the answers are incompatible, you have found the real problem.',
        tension:
          'This can be used to talk people out of legitimate ambition or fair pay. Contentment is a discipline for the person who has enough, not an argument for accepting too little.'
      },
      {
        source: 'No man is free who is not master of himself.',
        author: 'Epictetus',
        reading:
          'Autonomy is internal before it is external. Someone who cannot govern their own attention or appetite is governed by whoever can capture them — an employer, an algorithm, a habit.',
        practice:
          'Pick the one compulsion that costs you most attention. Remove it at the environment level today — logged out, deleted, in another room — not by willpower.',
        tension:
          'Self-mastery rhetoric can slide into blaming people for constraints that are structural. Discipline is necessary; it is not sufficient, and it is not everyone’s missing ingredient.'
      },
      {
        source: 'Waste no more time arguing what a good man should be. Be one.',
        author: 'Marcus Aurelius, Meditations',
        reading:
          'Written by a man who spent his life in that argument, to himself, in the middle of the night. The instruction is against philosophy as identity and for philosophy as behaviour.',
        practice:
          'Identify one value you claim and have not acted on this week. Do the smallest version of it today, before you refine the theory further.',
        tension:
          'Deliberation is not always avoidance. Some decisions genuinely require thinking through; the trap is thinking as a substitute for a decision already made.'
      },
      {
        source: 'The impediment to action advances action. What stands in the way becomes the way.',
        author: 'Marcus Aurelius, Meditations',
        reading:
          'The obstacle is information about where the real work is. This is not the claim that everything happens for a reason — it is the practice of converting friction into the next task.',
        practice:
          'Name today’s biggest obstacle. Write the sentence: "Because of this, the work is now ___." Then do that work.',
        tension:
          'Some obstacles are simply losses. Reframing every setback as an opportunity can become a way of never grieving anything.'
      },
      {
        source: 'Begin at once to live, and count each separate day as a separate life.',
        author: 'Seneca, Letters to Lucilius',
        reading:
          'The Stoic argument against deferral. Life is not the thing after the current phase ends; the current phase is the whole of what you have.',
        practice:
          'Find one thing you have postponed to a future condition ("once this project ships"). Move a piece of it into today.',
        tension:
          'Taken literally this defeats long-horizon investment. Days are lives; some of them are correctly spent building things that only pay out much later.'
      },
      {
        source: 'Man is disturbed not by things, but by the views he takes of them.',
        author: 'Epictetus, Enchiridion',
        reading:
          'The founding claim of cognitive therapy, two thousand years early. Between event and reaction sits an interpretation you author, and interpretation is trainable.',
        practice:
          'Catch one strong emotional reaction today. Write the event in neutral language, then your interpretation, then one alternative interpretation that also fits the facts.',
        tension:
          'Some things are genuinely bad and the correct view of them is distressing. Reframing is a tool, not a duty to feel fine.'
      },
      {
        source: 'He who fears death will never do anything worthy of a living man.',
        author: 'Seneca, Letters to Lucilius',
        reading:
          'Memento mori is not morbidity; it is a prioritisation device. Awareness of a fixed endpoint clarifies what is worth doing and shrinks social fear to its correct size.',
        practice:
          'Write what you would stop doing if you had five years. Then stop one of them this week — genuinely stop, do not merely intend to.',
        tension:
          'Mortality salience can push people toward dramatic gestures over patient work. Most consequential things are built slowly by people who expect to be around.'
      },
      {
        source: 'First say to yourself what you would be; and then do what you have to do.',
        author: 'Epictetus, Discourses',
        reading:
          'Identity precedes tactics. Deciding what you are makes the daily choices smaller, because most of them are already settled by the definition.',
        practice:
          'Write the twelve-word description of the person you are becoming. Name the single daily action that only that person takes. Do it today.',
        tension:
          'Fixed identity resists updating. Hold the description firmly enough to act and loosely enough to revise when evidence arrives.'
      },
      {
        source: 'How long are you going to wait before you demand the best for yourself?',
        author: 'Epictetus, Enchiridion',
        reading:
          'Directed at the student who keeps agreeing with the philosophy and postponing the practice. The gap between assent and action is where most lives are spent.',
        practice:
          'Name the standard you have quietly accepted below what you are capable of. Raise it in one concrete, visible way today.',
        tension:
          'Demanding the best of yourself and demanding it constantly are different. Standards without recovery produce collapse, not excellence.'
      },
      {
        source: 'The best revenge is not to be like your enemy.',
        author: 'Marcus Aurelius, Meditations',
        reading:
          'Retaliation makes you adopt the shape of what you oppose. The practical version: never let an opponent set your standards of conduct, because that is a form of losing.',
        practice:
          'Think of someone whose behaviour angered you recently. Write how you will respond in a way that is consistent with your standards rather than theirs.',
        tension:
          'Refusing to retaliate is not the same as refusing to defend. Not becoming your enemy does not require becoming their victim.'
      }
    ]
  },

  {
    id: 'eastern',
    name: 'Taoism & Zen',
    period: 'China & Japan, 6th c. BCE onward',
    premise:
      'Effectiveness through alignment rather than force. Where the Western traditions push, this one asks what the situation is already doing and moves with it.',
    entries: [
      {
        source: 'A journey of a thousand miles begins beneath one’s feet.',
        author: 'Laozi, Tao Te Ching, ch. 64',
        reading:
          'Usually rendered "begins with a single step", but the literal image is better: it begins where you are standing. Not with the step you plan to take, with the ground under you now.',
        practice:
          'Take the project you keep planning. Do the first ten minutes of actual work before any further planning today.',
        tension:
          'Starting is not the hard part for everyone. For chronic starters, the harder discipline is finishing what is already underway.'
      },
      {
        source: 'The sage does not accumulate. The more he does for others, the more he has.',
        author: 'Laozi, Tao Te Ching, ch. 81',
        reading:
          'A description of how reputation and network capital behave: they are the rare assets that grow through expenditure. Hoarding knowledge or credit shrinks the position it protects.',
        practice:
          'Give something away today with no expected return — an introduction, a piece of hard-won knowledge, credit for work you contributed to.',
        tension:
          'Generosity without boundaries is exploitable, and the people who talk most about it are often the ones benefiting from yours.'
      },
      {
        source: 'Knowing others is intelligence; knowing yourself is true wisdom. Mastering others is strength; mastering yourself is true power.',
        author: 'Laozi, Tao Te Ching, ch. 33',
        reading:
          'A hierarchy of difficulty. Self-knowledge is harder because the instrument doing the observing is the thing being observed, and it has motives.',
        practice:
          'Write the one thing about your working style that others have told you more than once and you have not accepted. Sit with the possibility that it is true.',
        tension:
          'Introspection has real limits — people are poor at knowing their own motives. External evidence about your behaviour often beats internal reflection about it.'
      },
      {
        source: 'When you try to control, you lose control.',
        author: 'Attributed in the Taoist tradition; a common rendering of Tao Te Ching ch. 29',
        reading:
          'Over-specification kills adaptive systems: teams, markets, learning. Set direction and constraints, then leave room for the system to find the path.',
        practice:
          'Find one thing you are micromanaging. Define the outcome and the constraints, hand over the method entirely, and do not check in today.',
        tension:
          'Under-management is also a failure mode, and it is usually the one that gets excused as trust. Absence of control is not the same as clarity about it.'
      },
      {
        source: 'Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.',
        author: 'Zen proverb',
        reading:
          'Achievement does not change the texture of days. What changes is your relationship to the ordinary work — which means the ordinary work had better be worth doing.',
        practice:
          'Identify a piece of routine work you resent. Do it today with full attention rather than resistance, and notice what the resentment was actually costing.',
        tension:
          'Some drudgery should be automated or eliminated, not accepted mindfully. Equanimity is not an argument against fixing the situation.'
      },
      {
        source: 'In the beginner’s mind there are many possibilities; in the expert’s mind there are few.',
        author: 'Shunryu Suzuki, Zen Mind, Beginner’s Mind',
        reading:
          'Expertise compresses the option space — usually correctly, occasionally fatally. The cost of pattern recognition is that novel situations get filed under old patterns.',
        practice:
          'Take a problem in your area of expertise. Ask what someone with no background would try, and take that idea seriously for ten minutes before dismissing it.',
        tension:
          'Beginner’s mind is romanticised by people avoiding the work of expertise. Most of the time the expert’s narrowed option set is simply right.'
      },
      {
        source: 'Muddy water is best cleared by leaving it alone.',
        author: 'Alan Watts, on the Taoist principle',
        reading:
          'Some problems resolve through time and non-interference. Agitation feels like effort but is often the thing preventing the settling.',
        practice:
          'Name one situation you keep stirring — a conversation you keep reopening, a decision you keep revisiting. Deliberately leave it untouched for 48 hours.',
        tension:
          'Some things do not settle; they rot. Distinguish waiting from avoidance by setting the date on which you will act regardless.'
      },
      {
        source: 'Nature does not hurry, yet everything is accomplished.',
        author: 'Laozi, Tao Te Ching',
        reading:
          'Against the confusion of speed with progress. Sustainable rates compound; unsustainable ones produce a burst followed by a collapse that costs more than the burst gained.',
        practice:
          'Look at your current pace on your main project. Set a rate you could hold for a year, and work at exactly that rate today — including stopping when you hit it.',
        tension:
          'Some windows really do close. There are moments where sprinting is correct, and mistaking one for the other is expensive in both directions.'
      },
      {
        source: 'The obstacle is the path.',
        author: 'Zen proverb',
        reading:
          'Where you are stuck is precisely where your current model of the problem is wrong. The difficulty is not blocking the lesson; it is the lesson’s location.',
        practice:
          'Take the thing you are avoiding because it is hard. Spend the first block of your day on it, at the point where it is hardest.',
        tension:
          'Not every wall is a door. Persistent difficulty is sometimes evidence of a bad problem choice rather than a needed lesson.'
      },
      {
        source: 'To a mind that is still, the whole universe surrenders.',
        author: 'Attributed to Zhuangzi',
        reading:
          'A claim about signal and noise. A settled mind is not passive; it perceives more, because it is not spending capacity on internal broadcast.',
        practice:
          'Sit for ten minutes with no input — no phone, no music, no notebook. Note what surfaces. Solutions frequently arrive in the gap you never leave.',
        tension:
          'Stillness is not a substitute for information. Some problems require data you do not have and cannot introspect your way to.'
      },
      {
        source: 'Do not seek to follow in the footsteps of the wise; seek what they sought.',
        author: 'Matsuo Bashō',
        reading:
          'Imitating outcomes copies the surface. What is transferable is the question they were asking, and the standard they held themselves to while asking it.',
        practice:
          'Take someone whose work you admire. Instead of copying their method, write down the question they appear to be answering, and ask it of your own field.',
        tension:
          'Direct imitation is genuinely useful early on. Originality without absorbed craft is usually just inexperience with better branding.'
      },
      {
        source: 'When walking, walk. When eating, eat.',
        author: 'Zen proverb',
        reading:
          'The whole doctrine of attention in six words. The cost of divided attention is not just inefficiency — it is that none of the divided activities is fully experienced or fully done.',
        practice:
          'Choose one routine activity today and do only it — no podcast, no second screen. Extend the practice to your first deep work block.',
        tension:
          'Some combinations genuinely work, and a rigid single-tasking rule can become another way to feel bad. Test rather than assume.'
      }
    ]
  },

  {
    id: 'strategy',
    name: 'Strategy & Power',
    period: 'Sun Tzu to Clausewitz',
    premise:
      'How position, timing and information decide contests before force is applied. Read as description of how competitive situations actually work, not as permission.',
    entries: [
      {
        source: 'Every battle is won before it is ever fought.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Outcomes are mostly determined by preparation, position and selection — by the time of engagement, the variables are largely fixed. This is the strongest argument for preparation over performance.',
        practice:
          'Take your next important meeting or negotiation. Spend three times as long preparing as it will last, on their interests rather than your script.',
        tension:
          'Determinism about preparation can breed fatalism in the room. Live situations do turn, and the ability to adapt is itself preparation.'
      },
      {
        source: 'If you know the enemy and know yourself, you need not fear the result of a hundred battles.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Two intelligence problems, and the second is harder. Most competitive failure comes from overestimating your own capability and underestimating the other side’s constraints.',
        practice:
          'Write an honest assessment of your position: three genuine strengths, three weaknesses you would rather not name, and the same for your main competitor.',
        tension:
          'Framing everything as adversarial finds enemies where there were potential collaborators. Most situations are not zero-sum.'
      },
      {
        source: 'The supreme art of war is to subdue the enemy without fighting.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'The best position is the one that makes the contest unnecessary — a superior offer, an unassailable niche, an alternative that costs the other side more than agreement. Fighting is a tax on bad positioning.',
        practice:
          'Take a conflict you are currently in. Design one option that makes the disagreement irrelevant rather than winning it.',
        tension:
          'Some conflicts must be fought, and the desire to avoid confrontation often disguises itself as strategic sophistication.'
      },
      {
        source: 'War is the continuation of politics by other means.',
        author: 'Carl von Clausewitz, On War',
        reading:
          'No contest has meaning apart from the objective behind it. Tactics detached from purpose produce victories that cost more than they return — the common shape of the pointless work escalation.',
        practice:
          'Name the objective behind your current biggest effort. If you cannot state it in one sentence, that is today’s real work.',
        tension:
          'Clausewitz also documented how objectives drift once conflict starts. Stating the purpose once is not enough; it needs re-checking as conditions change.'
      },
      {
        source: 'Opportunities multiply as they are seized.',
        author: 'Attributed to Sun Tzu',
        reading:
          'Optionality is generated by motion, not by waiting. Each committed action creates information and contact surface that produce the next options; stillness produces none.',
        practice:
          'Take the smallest committed action on your largest ambition today — one email, one publication, one call. Note what new options exist by evening.',
        tension:
          'Motion also forecloses options. Committing early to the wrong path generates plenty of opportunities in a direction you did not want.'
      },
      {
        source: 'Everything in war is very simple, but the simplest thing is difficult.',
        author: 'Carl von Clausewitz, On War',
        reading:
          'Clausewitz called the gap between plan and execution "friction". Strategy fails less often from bad analysis than from the accumulation of small, individually trivial obstacles.',
        practice:
          'Take a plan that is not moving. List every small friction point in its execution. Remove the two cheapest ones today.',
        tension:
          'Friction is also a signal. Sometimes the plan is not stalled by logistics but by a real problem nobody has said out loud.'
      },
      {
        source: 'He who defends everything defends nothing.',
        author: 'Frederick the Great',
        reading:
          'Undifferentiated effort is defeat by dilution. Choosing what to leave undefended is the strategic act — and it is uncomfortable precisely because it is a real decision.',
        practice:
          'List your current commitments. Choose one to explicitly stop defending, and tell the person who needs to know today.',
        tension:
          'Concentration assumes you have correctly identified what matters. Concentrating on the wrong front is worse than spreading thin.'
      },
      {
        source: 'Do not repeat the tactics which gained you one victory, but let your methods be regulated by the infinite variety of circumstances.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'The trap of the successful playbook. What worked was matched to a situation; when the situation changes, the same move becomes the reason for failure.',
        practice:
          'Identify a method you use because it worked once. Write what conditions made it work, and check whether those conditions still hold.',
        tension:
          'Constant novelty prevents compounding. Repeatable methods are how organisations scale; the discipline is knowing which conditions each one requires.'
      },
      {
        source: 'It is better to be feared than loved, if you cannot be both.',
        author: 'Niccolò Machiavelli, The Prince',
        reading:
          'The most misused sentence in political writing. Machiavelli’s actual claim is narrower: love depends on the other party’s continuing goodwill, fear depends on you — so never build a position that requires other people to keep liking you.',
        practice:
          'Find one arrangement that only works while someone continues to feel positively toward you. Give it a structural basis — a contract, a written agreement, a second option.',
        tension:
          'Machiavelli also warned that being hated is fatal, and this line has excused a great deal of ordinary cruelty. Reliability, not fear, is the usable version.'
      },
      {
        source: 'In the midst of chaos, there is also opportunity.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Disruption reshuffles position. Incumbents are optimised for the old conditions, which means the periods everyone experiences as threatening are the periods when position is cheapest to change.',
        practice:
          'Name a disruption currently affecting your field. Write what it makes newly possible for someone with no legacy position to defend.',
        tension:
          'Chaos also destroys the unprepared, and survivorship bias makes disruption look far more favourable than it is in the aggregate.'
      },
      {
        source: 'The general who advances without coveting fame and retreats without fearing disgrace is the jewel of the kingdom.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Ego is a strategic liability: it distorts advance and retreat alike. The ability to withdraw from a losing position without shame is one of the rarest and most valuable competences.',
        practice:
          'Identify a commitment you are continuing mainly because quitting would look bad. Cost it honestly, and decide on the merits.',
        tension:
          'Reputation is a real asset, and treating it as pure ego is naive. The point is to price it, not to ignore it.'
      },
      {
        source: 'Speed is the essence of war.',
        author: 'Sun Tzu, The Art of War',
        reading:
          'Tempo is a weapon. Operating on a faster decision cycle than your competition means responding to conditions they have not yet processed — the modern version of this is simply shipping more often.',
        practice:
          'Take your slowest recurring decision or delivery cycle. Halve it once, deliberately, and observe what actually broke — usually less than expected.',
        tension:
          'Speed compounds errors as efficiently as progress. Fast cycles require fast feedback, or you simply arrive at the wrong place sooner.'
      }
    ]
  },

  {
    id: 'mastery',
    name: 'Mastery & Craft',
    period: 'Practitioners across disciplines',
    premise:
      'What people who reached the top of demanding fields say about how it actually happened — usually less romantic and more repetitive than the stories suggest.',
    entries: [
      {
        source: 'I fear not the man who has practised 10,000 kicks once, but I fear the man who has practised one kick 10,000 times.',
        author: 'Bruce Lee',
        reading:
          'Depth beats breadth in any skill with a physical or intuitive component. Repetition past the point of boredom is where competence turns into something automatic and available under pressure.',
        practice:
          'Identify the single most fundamental movement in your skill. Do twenty deliberate repetitions of only that today.',
        tension:
          'Repetition without variation produces brittleness. The research on expertise favours varied, interleaved practice over pure massed repetition.'
      },
      {
        source: 'It is not that I am so smart, it is just that I stay with problems longer.',
        author: 'Albert Einstein',
        reading:
          'Sustained attention on a single hard problem is rarer than intelligence and less distributed by luck. Most people leave the problem long before the useful part.',
        practice:
          'Take your hardest current problem and stay with it for a full uninterrupted hour — past the point where you want to check something else.',
        tension:
          'Persistence on the wrong problem is expensive. Endurance is only a virtue after problem selection has been done well.'
      },
      {
        source: 'Amateurs sit and wait for inspiration; the rest of us just get up and go to work.',
        author: 'Stephen King, On Writing',
        reading:
          'Professional output is a schedule, not a state. Waiting for readiness is the most common and most respectable-looking form of avoidance.',
        practice:
          'Work on your craft at the scheduled time today regardless of how you feel. Log the quality afterwards; compare it to your prediction.',
        tension:
          'Chronic forcing produces burnout and mediocre volume. Schedules work best when they include real recovery, not just compliance.'
      },
      {
        source: 'The master has failed more times than the beginner has even tried.',
        author: 'Attributed to Stephen McCranie',
        reading:
          'Expertise is accumulated failure that was examined rather than merely survived. The differentiator is not tolerance for failure but the discipline of extracting information from each one.',
        practice:
          'Write your three most recent failures and one specific, transferable lesson from each. If you cannot name a lesson, the failure has not been paid for yet.',
        tension:
          'Failure is only educational under feedback. Repeated failure without a clear signal about what went wrong teaches helplessness instead.'
      },
      {
        source: 'You do not rise to the level of your goals. You fall to the level of your systems.',
        author: 'James Clear, Atomic Habits',
        reading:
          'Ambition is common and cheap; the operative variable is what happens on an ordinary Tuesday when motivation is absent. Systems are what execute in the absence of feeling.',
        practice:
          'Take your most important goal. Define the smallest daily action that serves it, and put it in your calendar at a fixed time for the next two weeks.',
        tension:
          'Systems without direction produce efficient movement toward nothing. Goals still choose which system to build.'
      },
      {
        source: 'Whatever you are, be a good one.',
        author: 'Attributed to Abraham Lincoln',
        reading:
          'Status hierarchies between fields matter far less than position within one. Excellence is portable in a way that field prestige is not, and it is available in any domain.',
        practice:
          'Take the least glamorous part of your current role and do it to an unreasonable standard today. Note who notices.',
        tension:
          'Excellence in a dying field is still constrained by the field. Craft is necessary; it is not a substitute for choosing where to apply it.'
      },
      {
        source: 'Quality is not an act, it is a habit.',
        author: 'Will Durant, summarising Aristotle',
        reading:
          'Almost always misattributed to Aristotle himself, which is fitting: what survives is the practice, not the source. Standards are constituted by repeated behaviour, not declared once.',
        practice:
          'Choose one recurring output — an email, a commit, a document. Define your standard explicitly and apply it every single time today.',
        tension:
          'Uniform standards across all work is a misallocation. Some outputs deserve excellence; some deserve to be finished quickly and forgotten.'
      },
      {
        source: 'If you want to master something, teach it.',
        author: 'Attributed to Richard Feynman',
        reading:
          'Explanation exposes the difference between recognition and understanding. You can follow an argument you cannot reconstruct — and only reconstruction is usable.',
        practice:
          'Take something you learned this week and write an explanation for someone with no background. Every point where you reach for jargon marks a gap.',
        tension:
          'Teaching too early can lock in a shallow model and make it socially costly to revise. Teach what you have tested, not only what you have read.'
      },
      {
        source: 'It is not enough to be busy; so are the ants. The question is: what are we busy about?',
        author: 'Henry David Thoreau',
        reading:
          'Activity is a comfortable proxy for progress and a poor one. The busiest periods of a career are frequently the least consequential, because busyness resists the question this quote asks.',
        practice:
          'List everything you did yesterday. Mark what would still matter in a year. Cut one item from today that failed the test.',
        tension:
          'Much necessary work does not survive a one-year test and still has to be done. The point is proportion, not purity.'
      },
      {
        source: 'The best time to plant a tree was twenty years ago. The second best time is now.',
        author: 'Proverb, widely attributed',
        reading:
          'Every compounding process is worth starting late, because the alternative to a late start is never starting. Regret about the timing is itself a way of continuing not to start.',
        practice:
          'Take the compounding thing you regret not starting earlier — a skill, a habit, an investment. Start the smallest version of it today.',
        tension:
          'Not everything compounds, and sunk-cost reasoning wears this proverb as a disguise. Check the mechanism before committing years.'
      },
      {
        source: 'Simplicity is the ultimate sophistication.',
        author: 'Attributed to Leonardo da Vinci',
        reading:
          'Complexity is what a problem looks like before it is understood. Simplification is the final and hardest stage of work, which is why most work never reaches it.',
        practice:
          'Take something you built or wrote recently and remove a quarter of it without losing function or meaning.',
        tension:
          'Some problems are irreducibly complex and simplifying them is falsification. Elegance must not be bought with accuracy.'
      },
      {
        source: 'Comparison is the thief of joy.',
        author: 'Attributed to Theodore Roosevelt',
        reading:
          'Comparison to others is noisy — you see their output and your process. Comparison to your own past self uses data you actually have and can act on.',
        practice:
          'Write what you could not do twelve months ago that you can do now. Keep this list; it is the only benchmark with reliable data.',
        tension:
          'Some comparison is essential calibration. Knowing where you actually stand against a field is how you find out what to train next.'
      }
    ]
  },

  {
    id: 'meaning',
    name: 'Meaning & Existence',
    period: 'Existentialism, absurdism, and their antecedents',
    premise:
      'What to do with freedom, mortality and the absence of assigned purpose. The tradition that takes the hardest questions seriously rather than dissolving them.',
    entries: [
      {
        source: 'He who has a why to live can bear almost any how.',
        author: 'Friedrich Nietzsche, quoted by Viktor Frankl',
        reading:
          'Frankl carried this line through the camps and built a psychiatry on it. Meaning is not a reward for good conditions; it is the load-bearing structure that makes bad conditions survivable.',
        practice:
          'Write your why in one sentence, for the specific difficult thing you are doing now. If you cannot, that difficulty may be the wrong one to be enduring.',
        tension:
          'This can be weaponised to make people endure conditions that should be changed. Meaning makes suffering bearable; it does not make it justified.'
      },
      {
        source: 'One must imagine Sisyphus happy.',
        author: 'Albert Camus, The Myth of Sisyphus',
        reading:
          'Camus’s answer to a universe that offers no inherent purpose: the struggle itself, consciously chosen, is sufficient. Not optimism — defiance that has stopped needing the universe to agree.',
        practice:
          'Identify the repetitive work in your life that will never be finished. Choose it deliberately today rather than enduring it.',
        tension:
          'There is a version of this that romanticises pointless labour. Some boulders should be put down.'
      },
      {
        source: 'Man is condemned to be free.',
        author: 'Jean-Paul Sartre, Being and Nothingness',
        reading:
          'Condemned, because there is no one to blame. Every claim that you have no choice conceals a choice you have made and prefer not to own — including the choice to keep the constraint.',
        practice:
          'Take one sentence you say beginning "I have no choice but to…". Write the choices that actually exist, including the ones with costs you have declined to pay.',
        tension:
          'Sartre substantially underweights real constraint. Not every limitation is a disguised choice, and telling people otherwise is a cruelty dressed as philosophy.'
      },
      {
        source: 'The unexamined life is not worth living.',
        author: 'Socrates, in Plato’s Apology',
        reading:
          'Said at his trial, with his life as the stake. The claim is that a life run entirely on inherited assumptions is not fully being lived by the person living it.',
        practice:
          'Name one belief about how you should live that you inherited and have never tested. Write the case against it, honestly.',
        tension:
          'Perpetual examination is its own pathology. At some point beliefs must be acted on, and the examination becomes a way of not living.'
      },
      {
        source: 'Everything can be taken from a man but one thing: the last of the human freedoms — to choose one’s attitude in any given set of circumstances.',
        author: 'Viktor Frankl, Man’s Search for Meaning',
        reading:
          'Written by someone with the standing to say it. The claim is minimal and therefore unbreakable: whatever the constraints, the response to them remains authored.',
        practice:
          'Take the circumstance you most resent. Without pretending it is good, choose your stance toward it deliberately today and write it down.',
        tension:
          'This is frequently quoted by people demanding others accept the unacceptable. It is a resource for the person inside the situation, not an instruction from outside it.'
      },
      {
        source: 'God is dead. And we have killed him.',
        author: 'Friedrich Nietzsche, The Gay Science',
        reading:
          'Not a celebration — a warning. Nietzsche’s point was that the collapse of inherited meaning leaves a vacuum, and that filling it deliberately is the central task, or something worse fills it.',
        practice:
          'Write what actually organises your choices, in plain language. If nothing does, name the thing you would want to, and act on it once today.',
        tension:
          'Constructing values alone is harder than Nietzsche makes it sound. Traditions carry accumulated solutions, and discarding all of them is rarely the strong move.'
      },
      {
        source: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
        author: 'Ralph Waldo Emerson',
        reading:
          'The pressure toward conformity is mostly invisible and mostly economic. Holding a position that is genuinely yours costs something specific, and knowing the price is part of choosing it.',
        practice:
          'Identify one place you are performing a version of yourself for an audience. Decide today whether the trade is worth it — either answer is fine, but choose it.',
        tension:
          'Authenticity is also a marketing position and often a privilege. Some conformity is respect for others, and some is simply how you keep a job you need.'
      },
      {
        source: 'Between stimulus and response there is a space. In that space is our power to choose our response.',
        author: 'Commonly attributed to Viktor Frankl',
        reading:
          'The attribution is disputed, the mechanism is not. Almost all reactive damage — the sent message, the said sentence — comes from collapsing that space to zero.',
        practice:
          'Introduce a deliberate delay today: for any reaction that feels urgent, wait sixty seconds before acting. Note what changed in the interval.',
        tension:
          'Not every gap should be filled with deliberation. Some situations require immediate response, and over-processing is its own failure.'
      },
      {
        source: 'The purpose of life is not to be happy. It is to be useful, to be honourable, to be compassionate.',
        author: 'Attributed to Ralph Waldo Emerson',
        reading:
          'Happiness pursued directly is unstable; it appears reliably as a by-product of contribution and connection. This is one of the better-supported findings in wellbeing research.',
        practice:
          'Do one thing today that is useful to a specific person and produces nothing for you. Note the effect on your own state.',
        tension:
          'Usefulness can be a socially approved route to self-erasure. Serving others at the cost of your own life is not the trade this recommends.'
      },
      {
        source: 'We must be willing to let go of the life we planned so as to have the life that is waiting for us.',
        author: 'Attributed to Joseph Campbell',
        reading:
          'Plans made by a younger person with less information can become prisons defended out of consistency. Commitment is a virtue right up until it becomes an excuse.',
        practice:
          'Name a plan you are following mainly because you announced it. Ask what you would choose today with current information.',
        tension:
          'Endless openness to change prevents anything from compounding. Most quitting happens at the difficult middle, not at a genuine reassessment point.'
      },
      {
        source: 'Tell me, what is it you plan to do with your one wild and precious life?',
        author: 'Mary Oliver, The Summer Day',
        reading:
          'The question is deliberately unanswerable in the abstract and completely answerable in the concrete: what is on your calendar this week is your current answer.',
        practice:
          'Look at your calendar for the next seven days. That is your answer at present. Change one entry so it becomes an answer you would defend.',
        tension:
          'Not every week can be significant. Ordinary maintenance weeks are what make the meaningful ones possible.'
      },
      {
        source: 'The two most important days in your life are the day you are born and the day you find out why.',
        author: 'Attributed to Mark Twain',
        reading:
          'Purpose is usually discovered through action rather than introspection: you find it by trying things and noticing what you cannot stop doing. Waiting to feel called is a poor search strategy.',
        practice:
          'Note the work you did in the last month that you would have done unpaid. That signal is more reliable than any amount of reflection.',
        tension:
          'The single-purpose narrative is a modern invention and it makes many people feel defective. Plenty of good lives have several purposes, or none stated.'
      }
    ]
  },

  {
    id: 'wealth',
    name: 'Wealth & Leverage',
    period: 'Modern practitioners and classical economics',
    premise:
      'How money, ownership and leverage actually behave — as mechanisms rather than motivation. Descriptive, not aspirational.',
    entries: [
      {
        source: 'Give me a lever long enough and a place to stand, and I shall move the earth.',
        author: 'Archimedes',
        reading:
          'The founding statement of leverage. Modern forms — capital, labour, code, media — differ in one crucial respect: the last two replicate at near-zero marginal cost and require no one’s permission.',
        practice:
          'Identify which of the four leverages you currently use. Take one concrete step today toward one you do not.',
        tension:
          'Leverage magnifies losses identically. Applied to a bad position or bad judgement, it accelerates the wrong outcome.'
      },
      {
        source: 'Play long-term games with long-term people.',
        author: 'Naval Ravikant',
        reading:
          'Compounding requires continuity — in relationships as much as in capital. Almost all outsized returns come from repeated games where reputation is an asset rather than an expense.',
        practice:
          'Name three people you want to be doing business with in ten years. Do something for one of them today with no expectation of return.',
        tension:
          'Loyalty to the wrong long-term game is expensive. Some relationships and industries should be exited, and sunk cost argues hard against it.'
      },
      {
        source: 'The big money is not in the buying and the selling, but in the waiting.',
        author: 'Charlie Munger',
        reading:
          'Activity feels like work and usually destroys returns through costs, taxes and mistimed decisions. The hardest part of most good strategies is doing nothing while holding them.',
        practice:
          'Take one position — an investment, a project, a career move — you are tempted to change out of restlessness. Write the case for doing nothing for six more months.',
        tension:
          'Patience with a deteriorating position is not discipline. Waiting requires a thesis with falsification conditions, or it is just inertia.'
      },
      {
        source: 'Earn with your mind, not your time.',
        author: 'Naval Ravikant',
        reading:
          'Time-based income is linear and capped by hours. The transition to judgment-based income — where output is decoupled from hours — is the single largest structural change available in most careers.',
        practice:
          'Compute what proportion of your income depends on hours worked. Design one small piece that would pay without your presence, and start it.',
        tension:
          'This is easier from an existing base of savings and options. Selling time is how most people fund the transition, and there is no shame in it.'
      },
      {
        source: 'Price is what you pay. Value is what you get.',
        author: 'Warren Buffett',
        reading:
          'Applies far beyond markets: to hires, to tools, to the cheap option that costs three times in rework. Optimising for price alone is how people systematically overpay in the currency that matters.',
        practice:
          'Find one decision where you optimised for price this year and it cost you. Write the actual total cost, and use it in the next decision.',
        tension:
          'Value estimates are easy to inflate to justify spending. The discipline requires an honest number, not a comfortable story.'
      },
      {
        source: 'Compound interest is the eighth wonder of the world. He who understands it, earns it; he who does not, pays it.',
        author: 'Attributed to Albert Einstein',
        reading:
          'The attribution is almost certainly false and the mechanism is entirely real. What matters is that the effect is unintuitive: humans reason linearly, so the late years always surprise.',
        practice:
          'Compute one compounding process in your life with actual numbers over ten years — savings, skill hours, audience. The arithmetic changes behaviour more than the principle does.',
        tension:
          'Compounding assumes survival and continuity. Ruin, interruption and career discontinuity break the model, and the model rarely mentions them.'
      },
      {
        source: 'Specific knowledge is knowledge you cannot be trained for.',
        author: 'Naval Ravikant',
        reading:
          'If it can be taught in a course, it can be commoditised and priced down. Durable advantage comes from the intersection of your obsessions and your experience — which is by definition not on a syllabus.',
        practice:
          'Write the intersection of three things you know unusually well. That combination, not any single one, is your defensible position.',
        tension:
          'Highly specific knowledge can be unsellable if no market exists at that intersection. Check that someone wants it before building a career on it.'
      },
      {
        source: 'Someone is sitting in the shade today because someone planted a tree a long time ago.',
        author: 'Warren Buffett',
        reading:
          'Two claims: the returns you enjoy were built by earlier decisions, and the decisions you make now mostly pay out to a later version of yourself. Both are easy to forget under short-term pressure.',
        practice:
          'Identify one thing you will plant today that pays out in five years and nothing before. Do the first hour of it.',
        tension:
          'Perpetual deferral is also a failure. Some shade should be enjoyed now, and dying with an unspent portfolio is a real outcome.'
      },
      {
        source: 'The most important thing is to be able to say no.',
        author: 'Attributed to Warren Buffett',
        reading:
          'Buffett describes almost all of his decisions as rejections. Capacity is finite, so the quality of what you accept is bounded entirely by the ruthlessness of what you decline.',
        practice:
          'Decline one good opportunity today specifically because it is not excellent. Write what accepting it would have cost.',
        tension:
          'Saying no requires an existing supply of options. Early in any field, saying yes broadly is how the option set gets built.'
      },
      {
        source: 'Risk comes from not knowing what you are doing.',
        author: 'Warren Buffett',
        reading:
          'A reframing of risk from volatility to ignorance. The measure is not how much a thing moves, but how well you understand the mechanism generating the movement.',
        practice:
          'Take your largest current exposure — financial or professional. Write the mechanism by which it could fail. Vagueness in that paragraph is your actual risk.',
        tension:
          'Confidence in your own understanding is exactly the bias that produces disasters. Knowing what you are doing is not the same as believing you do.'
      },
      {
        source: 'You do not get rich by spending your time to save money. You get rich by saving your time to make money.',
        author: 'Naval Ravikant',
        reading:
          'Set an hourly rate at which you refuse to do things, and hold it even when the money is not yet arriving. The behaviour has to precede the income, which is what makes it hard.',
        practice:
          'Set your rate. Find one recurring task below it and eliminate, automate or delegate it this week.',
        tension:
          'This assumes disposable income and ignores that some low-value tasks build understanding. Founders who outsource everything early often lose the plot of their own business.'
      },
      {
        source: 'The four most dangerous words in investing are: this time it is different.',
        author: 'Sir John Templeton',
        reading:
          'Every bubble is justified by a story about a structural break. Occasionally the story is true, which is exactly why the phrase remains persuasive and expensive.',
        practice:
          'Find a belief you hold that depends on current conditions being unprecedented. Write what the historical base rate says.',
        tension:
          'Sometimes it genuinely is different — technology and institutions do change. Base rates are the starting point, not the verdict.'
      }
    ]
  }
];
