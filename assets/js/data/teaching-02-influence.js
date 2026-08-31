/*
 * teaching-02-influence.js — see teaching-01-communication.js for the schema.
 */

window.PILLAR_TEACHING = Object.assign(window.PILLAR_TEACHING || {}, {

  /* --------------------------------------------------- NEGOTIATION */

  'negotiation/prep': {
    idea: 'Negotiations are mostly decided before anyone speaks. What you know about their alternatives, what your own alternative is worth, and which issues you are willing to trade determine the range. Talent in the room moves things at the margin; preparation moves the range.',
    why: 'Your leverage is not how badly you want the deal, it is how good your next-best option is. Improving that option changes what you can credibly refuse, and credible refusal is the whole mechanism. This is why the work happens weeks before the meeting.',
    misread: 'That preparation means deciding your target number. A number without a walk-away point behind it collapses the moment it is tested. The walk-away is the preparation; the target is a hope.',
    tell: 'Before any negotiation, write your BATNA in one sentence with a value attached. If you cannot put a number or a concrete alternative on it, you have not prepared, you have rehearsed.',
    terms: [
      { term: 'BATNA', meaning: 'Best Alternative To a Negotiated Agreement — what you actually do if this deal dies. It sets your reservation price, and improving it is the only real way to gain leverage.' },
      { term: 'ZOPA', meaning: 'Zone Of Possible Agreement: the overlap between what they will accept and what you will accept. If there is none, no technique creates one.' },
      { term: 'Reservation price', meaning: 'The point past which walking away beats agreeing. Decided in advance, in writing, because it is not decidable under pressure.' }
    ]
  },

  'negotiation/anchor': {
    idea: 'The first credible number reframes the whole discussion, including for people who know it is doing that. Making it, and justifying it with something external, is worth more than any amount of clever conceding afterwards.',
    why: 'Anchoring works by making the first number the reference point that later numbers are judged against. Knowing about the effect reduces it but does not remove it. The defence is not resisting the anchor, it is having your own number written down beforehand.',
    misread: 'That anchoring means opening absurdly high. An anchor with no justification is discounted and costs credibility. An aggressive number attached to a real comparable is a different object entirely.',
    tell: 'After a negotiation, write down who named the first number and where the final number sat relative to it. Do that ten times and the pattern will convince you faster than any argument.',
    terms: [
      { term: 'Anchor', meaning: 'The first number on the table, which becomes the reference point everything else is measured against.' },
      { term: 'Concession pattern', meaning: 'The shrinking sizes of your moves. Moves of 10, 5, 2 signal you are approaching a limit; equal moves signal there is more where that came from.' },
      { term: 'Justified number', meaning: 'A figure attached to an external standard — a comparable, a formula, a market rate. It is what makes a number hard to simply reject.' }
    ]
  },

  'negotiation/creating': {
    idea: 'Most negotiations are treated as splitting one number when they are actually several issues that the two sides value differently. Finding those differences and trading across them makes both sides better off, and it is where nearly all the unclaimed value sits.',
    why: 'If you care more about timing and they care more about price, a trade on those two axes creates value that pure haggling cannot. This requires knowing their priorities, which requires asking, which is why the people who create value are the ones asking questions.',
    misread: 'That "win-win" means being accommodating. It is the opposite: it takes more information, more preparation and harder questions than splitting the difference. Being nice and conceding is not integrative bargaining, it is losing politely.',
    tell: 'Count the issues you discussed. If it was one, you were dividing a fixed pie whether or not there was one, and you will never know what you left behind.',
    terms: [
      { term: 'Integrative bargaining', meaning: 'Trading across issues valued differently by each side, so the total on the table grows. As opposed to distributive bargaining, which splits a fixed amount.' },
      { term: 'MESO', meaning: 'Multiple Equivalent Simultaneous Offers: three packages you value equally, offered together. Their preference among them tells you what they care about without anyone conceding.' },
      { term: 'Logrolling', meaning: 'Conceding on what you value less in exchange for what you value more. Requires knowing both ranking orders.' }
    ]
  },

  'negotiation/tactics': {
    idea: 'In the room, the highest-value behaviours are unglamorous: ask a question instead of answering one, restate their position until they agree you have it, and be comfortable with silence. Most concessions are given away by people filling a pause.',
    why: 'Talking transfers information; listening acquires it. Since leverage comes from knowing their constraints, the side asking questions is accumulating the asset while the other spends it. Silence after an offer is uncomfortable precisely because it works.',
    misread: 'That live technique is about detecting deception or applying pressure tricks. Those are low-yield and damage the relationship you usually need afterwards. Calibrated questions and accurate summarising are boring and far more effective.',
    tell: 'Record or reconstruct a negotiation and calculate your share of the talking. Above half and you were transmitting when you should have been collecting.',
    terms: [
      { term: 'Calibrated question', meaning: 'An open question that makes the other side solve your problem: "How am I supposed to do that?" rather than "That is impossible."' },
      { term: 'Labelling', meaning: 'Naming the emotion or position you observe — "It sounds like the timeline is the real constraint." Cheap, defusing, and it surfaces information.' },
      { term: 'The nibble', meaning: 'A small extra ask after agreement is reached. Effective, common, and worth pre-empting by agreeing that terms are final when they are final.' }
    ]
  },

  'negotiation/complex': {
    idea: 'Once more than two parties are involved, the negotiation is about coalitions and sequence, not argument. Who you talk to first, and what they have already agreed to, decides more than what you say to any of them.',
    why: 'Each party has its own alternatives and its own internal approvers. A deal that dies almost always dies inside one party rather than between them, so the real question is what your counterpart has to tell their own side to get it through.',
    misread: 'That the person across the table is the decision. In organisations they are usually a messenger with limited authority, and negotiating hard with someone who cannot say yes wastes leverage you needed for someone else.',
    tell: 'Draw the map: every party, what they get, who has to approve it. If any box is empty you have found where the deal will stall.',
    terms: [
      { term: 'Blocking coalition', meaning: 'The smallest group that can stop the deal. Identify it early, because it is rarely the same as the group that wants the deal.' },
      { term: 'Sequencing', meaning: 'The deliberate order you approach parties in, so that each conversation is easier because of the last.' },
      { term: 'Ratification risk', meaning: 'The chance that the deal your counterpart agreed to is rejected by their own side. Ask what they need to get it approved before you finish.' }
    ]
  },

  /* --------------------------------------------------------- SALES */

  'sales/offer': {
    idea: 'An offer is a specific promise to a specific person about a specific outcome, at a price and with a reason to act now. Most things called offers are descriptions of a product, which is a different object and does not convert.',
    why: 'Buying is a comparison against doing nothing, and doing nothing is free. An offer wins by making the cost of inaction concrete and the outcome credible. Features do neither; a named outcome with proof behind it does both.',
    misread: 'That a weak offer can be fixed with better copy or more outreach. Volume applied to a bad offer produces a lot of accurate rejections. If conversion is near zero, the offer is wrong and no amount of activity fixes it.',
    tell: 'Say your offer out loud in one sentence: who it is for, what changes, what it costs. If it needs a second sentence to make sense, prospects are not going to build it for you.',
    terms: [
      { term: 'Value proposition', meaning: 'The specific change the buyer gets, in their language, not yours. "Cuts month-end close from nine days to three" rather than "streamlines finance operations".' },
      { term: 'Cost of inaction', meaning: 'What staying as they are costs, quantified. Most deals are lost to no-decision, not to competitors.' },
      { term: 'Risk reversal', meaning: 'Moving the risk of being wrong from buyer to seller — a guarantee, a pilot, a staged payment. Usually a bigger lever than a discount.' }
    ]
  },

  'sales/pipeline': {
    idea: 'Outbound is arithmetic before it is craft. Number contacted, number who reply, number who take a call, number who buy. Until you know your four numbers, every opinion about messaging is unfounded, including yours.',
    why: 'Response rates are low and variable, so small samples tell you nothing. Fifty sends is noise. The only way to learn what works is to hold volume steady, change one variable, and compare rates over a large enough batch to mean anything.',
    misread: 'That outbound is about persistence and volume alone. Volume against a badly chosen list produces nothing but a reputation. The choice of who you contact usually outweighs what you say to them.',
    tell: 'Open your tracker. If you cannot state this month\'s reply rate as a number, you do not have a pipeline, you have activity.',
    terms: [
      { term: 'ICP', meaning: 'Ideal Customer Profile: the specific, checkable characteristics of accounts that actually buy and stay. Written as filters, not adjectives.' },
      { term: 'Conversion rate', meaning: 'The share moving from one stage to the next. Diagnose here, because a pipeline problem is always in a specific transition.' },
      { term: 'Trigger event', meaning: 'A change that makes a buyer receptive right now — a funding round, a new hire, a regulation. Relevance beats persistence.' }
    ]
  },

  'sales/discovery': {
    idea: 'Discovery is diagnosis. The goal is to find out whether there is a real problem, what it costs them, and who decides — not to present. A call where you spoke for most of it was a pitch that happened too early.',
    why: 'People are persuaded by conclusions they reached themselves. Questions that make a buyer quantify their own problem do work that no assertion of yours can, because the number came from them and they cannot dismiss it.',
    misread: 'That discovery is a qualification checklist to get through before the demo. Running it as a form produces answers shaped like the form. The useful version follows the problem wherever it goes and is willing to end with "this is not for you".',
    tell: 'After a call, write the buyer\'s problem in their own words, with their number attached. If you cannot, you did not do discovery, whatever the call was labelled.',
    terms: [
      { term: 'Qualification', meaning: 'Deciding whether this is worth pursuing. Disqualifying fast is the highest-return habit in selling, and the hardest to build.' },
      { term: 'Champion', meaning: 'Someone inside who wants this to happen and has standing. Deals without one do not close, however friendly the meetings are.' },
      { term: 'Implication question', meaning: 'A question about the consequences of the problem — "What does that delay cost you a month?" It converts a nuisance into a business case.' }
    ]
  },

  'sales/closing': {
    idea: 'Objections at the end are usually the surfacing of something you failed to establish earlier. "Too expensive" almost always means the value was never quantified, and the fix is upstream rather than in a clever rebuttal.',
    why: 'A buyer with a quantified problem and an internal champion does not need to be closed, they need the path made easy. Closing technique is what you reach for when the earlier work was not done, which is why the most-taught part of selling is the least load-bearing.',
    misread: 'That closing is about creating pressure. Manufactured urgency works occasionally and poisons the relationship and the referral. Real urgency comes from the cost of inaction, which is discovered rather than invented.',
    tell: 'For every loss, write the one thing you would have had to establish earlier to have won it. Repeat entries in that list are your actual weakness.',
    terms: [
      { term: 'No-decision', meaning: 'The most common outcome in complex sales: nobody buys anything. Your real competitor, and it is beaten in discovery.' },
      { term: 'Mutual action plan', meaning: 'A written, dated list of what both sides do next. Replaces "following up" with a shared process, and exposes stalled deals early.' },
      { term: 'Negative reverse', meaning: 'Naming the reason they might not proceed, out loud, before they do. It surfaces the real objection instead of a polite one.' }
    ]
  },

  'sales/systems': {
    idea: 'Revenue becomes predictable when what worked is written down as a repeatable process with numbers attached. The difference between a good salesperson and a sales system is that the second survives the person leaving.',
    why: 'Individual deals are noisy; process metrics are not. Once you can see stage-to-stage conversion and cycle time, you can find the one broken transition instead of exhorting everyone to try harder. Everything else is guesswork with confidence.',
    misread: 'That a CRM is the system. The tool records the process; it does not constitute one. A well-kept CRM with no defined stage criteria produces tidy, meaningless data.',
    tell: 'Ask whether someone new could run your process from what is written down. If it lives in your head, you have a job rather than a system.',
    terms: [
      { term: 'Sales cycle', meaning: 'Median time from first contact to closed. Shortening it usually beats increasing volume, and it is measurable from day one.' },
      { term: 'Stage criteria', meaning: 'The observable, agreed condition for a deal to move stages. Without them, forecasts are optimism with decimal places.' },
      { term: 'Win/loss review', meaning: 'A structured post-mortem on closed deals, both directions. The only reliable source of what is actually happening in the market.' }
    ]
  },

  /* ----------------------------------------- PRODUCT & DISTRIBUTION */

  'product-distribution/problem': {
    idea: 'The problem you choose determines almost everything downstream. Building well for a problem nobody has is the most expensive mistake available, and it is usually made in the first fortnight and discovered in the first year.',
    why: 'People are unreliable about what they would do and reliable about what they have already done. So evidence comes from past behaviour — what they have tried, paid for, or built themselves — rather than from enthusiasm about your idea.',
    misread: 'That customer discovery means asking people whether they would use your product. They will say yes to be kind. The question that works is about the last time they had the problem and what they did about it.',
    tell: 'For each conversation, write what they have already spent time or money on to solve this. Blank entries mean the problem is not painful, whatever they said.',
    terms: [
      { term: 'Problem interview', meaning: 'A conversation about their existing behaviour, with no mention of your solution. Mentioning it contaminates everything after.' },
      { term: 'Existing alternative', meaning: 'What they use today, including spreadsheets and doing nothing. If there is none, you are usually looking at a non-problem.' },
      { term: 'Hair-on-fire', meaning: 'A problem urgent enough that people are already improvising solutions. The only reliable early signal.' }
    ]
  },

  'product-distribution/build': {
    idea: 'The first version exists to answer one question you cannot answer any other way. Everything not needed to answer it is delay, and delay is the main cost — you are paying in time to learn something you could have learned in a week.',
    why: 'The value of a first version is information, not revenue. Shipping something narrow to ten real users produces evidence; six months of building produces a bigger thing to be wrong about. The cost of being wrong scales with how long you were wrong for.',
    misread: 'That "minimum viable" means low quality. It means narrow. One workflow done properly beats five done badly, because the second teaches you nothing except that people dislike unfinished software.',
    tell: 'Write the question your first version answers. If the answer is "whether people like it", it is too vague to build against.',
    terms: [
      { term: 'MVP', meaning: 'The smallest thing that tests the riskiest assumption with real users. Narrow, not shoddy.' },
      { term: 'Riskiest assumption', meaning: 'The belief that, if wrong, kills the idea. Test that one first, however inconvenient it is.' },
      { term: 'Concierge version', meaning: 'Delivering the outcome manually before automating it. Often answers the question faster than any code.' }
    ]
  },

  'product-distribution/distribution': {
    idea: 'Distribution is a skill, not a phase. One channel worked properly beats five sampled, and finding which one requires running each long enough to see a real number rather than abandoning them after a fortnight.',
    why: 'Channels have different mechanics, audiences and time constants. Content compounds slowly; paid buys immediate signal; partnerships are slow and lumpy. Judging them all on two weeks of data guarantees you conclude that nothing works.',
    misread: 'That a good product spreads by itself. Almost nothing does. Word of mouth is a channel with its own mechanics and it needs designing like any other.',
    tell: 'For your main channel, state cost per acquired customer and how it moved this month. No number means you are doing marketing rather than distribution.',
    terms: [
      { term: 'CAC', meaning: 'Customer Acquisition Cost: everything spent to acquire, divided by customers acquired. Meaningless without the lifetime value beside it.' },
      { term: 'Channel-market fit', meaning: 'The match between how your customers make decisions and how a channel reaches them. Enterprise buyers and TikTok are a mismatch regardless of execution.' },
      { term: 'Compounding channel', meaning: 'One where past effort keeps paying — search, content, referrals. Slow to start and hard to displace once built.' }
    ]
  },

  'product-distribution/retention': {
    idea: 'Retention is the number that decides whether anything else matters. Acquisition into a leaking product is spending to fill a bucket with a hole in it, and every growth tactic makes the leak more expensive.',
    why: 'Retention compounds in both directions. Good retention means each cohort adds to a base; bad retention means each cohort replaces the last, and growth stops the moment spending does. This is arithmetic, not strategy.',
    misread: 'That retention is fixed with re-engagement emails and notifications. Those move the number a little and briefly. Retention is mostly determined by whether the product solved a recurring problem, which is a positioning question.',
    tell: 'Look at a cohort chart. If the curve keeps falling rather than flattening, you have not found a recurring problem, and no campaign changes that.',
    terms: [
      { term: 'Cohort retention', meaning: 'The share of users who signed up in one period and are still active later. The only honest way to read retention.' },
      { term: 'Retention curve flattening', meaning: 'When the curve levels off, meaning a stable core exists. If it never flattens, there is no product.' },
      { term: 'Expansion revenue', meaning: 'More money from existing customers over time. Turns good retention into growth without acquisition.' }
    ]
  },

  'product-distribution/ownership': {
    idea: 'The difference between a job you invented and an asset is whether it runs without you. That is a matter of written processes, delegated decisions, and numbers someone else can read — not of working fewer hours.',
    why: 'Anything that lives only in your head has to be re-derived every time and cannot be improved by anyone else. Writing it down converts your judgement into something that compounds instead of something that is spent.',
    misread: 'That systemising is premature until you are large. The habit is what is being built, and it is far cheaper to build at five customers than at fifty, when the cost of not having it is already being paid daily.',
    tell: 'Pick the thing you did most often this month. Is it written down well enough for someone else to do it? If not, that is next week\'s work.',
    terms: [
      { term: 'Standard operating procedure', meaning: 'A written, followable description of a recurring task. Boring, and the foundation of anything that outlives your attention.' },
      { term: 'Unit economics', meaning: 'Profit on one customer, one order, one unit. If it is negative, scale makes things worse rather than better.' },
      { term: 'Owner-dependency', meaning: 'The share of the operation that requires you specifically. What a buyer discounts for and what a holiday exposes.' }
    ]
  }
});
