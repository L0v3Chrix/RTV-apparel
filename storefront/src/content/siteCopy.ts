/**
 * SITE_COPY - Master Copy Map
 * Ported from Hydrogen storefront
 * All copy should be pulled from this file - no hardcoded strings in components
 *
 * V1: Static TypeScript export
 * V2: Move to Shopify metafields for CMS editing
 */

// ============================================================================
// GLOBAL
// ============================================================================

export const SITE_COPY = {
  brand: {
    name: 'Raize The Vibe',
    oneLiner: 'Raize The Vibe. Save Your Tribe.',
    shortIntro:
      'We make wearable flags for love, faith, and healing. The kind of shirts you put on when you are done passing pain down.',
    tagline: 'Faith-forward apparel for families who believe.',
  },

  cta: {
    primary: 'Shop the Drop',
    secondary: {
      ourStory: 'Read Our Story',
      whyDrop: 'Why This Drop Matters',
      prayer: 'Read a Prayer',
    },
  },

  announcement: {
    optionA: 'Drop Day is January 11. Eight shirts. Eight hoodies. Eight flags.',
    optionB: 'New here. Welcome home. Drop Day January 11.',
    optionC: 'Limited first run. When a size is gone, it is gone.',
    optionD:
      'Small family-run shop. Thank you for your patience while we print and ship.',
    // Active announcement - change this to switch
    active: 'optionA' as 'optionA' | 'optionB' | 'optionC' | 'optionD',
  },

  nav: {
    home: 'Home',
    tees: 'Tees',
    hoodies: 'Hoodies',
    why: 'Why',
    prayer: 'Prayer',
    faq: 'FAQ',
    cart: 'Cart',
  },

  trustBadges: [
    { icon: 'shield', label: 'Secure checkout' },
    { icon: 'users', label: 'Printed to order by real humans' },
    { icon: 'star', label: 'Premium soft fabric and fit' },
    { icon: 'palette', label: 'Original artwork, always' },
    { icon: 'refresh', label: 'Easy size exchanges' },
  ],

  smallShopNote:
    'We are a family-run, bootstrapped shop. During launch week, orders can take a little longer than you are used to. Thank you for your patience and your patronage. We promise to communicate clearly and deliver a product we are proud of.',

  emailCapture: {
    headline: 'Get drop updates and good medicine',
    subhead:
      'We will send launch reminders, restocks, and a little hope for your week.',
    button: 'Join the Tribe',
    consent:
      'By subscribing, you agree to receive emails from Raize The Vibe. Unsubscribe anytime.',
  },

  errors: {
    soldOut:
      'This one is gone for now. Join the list and we will tell you if it comes back.',
    sizeUnavailable:
      'That size is out. Try a different size or join the list for restocks.',
    cartEmpty:
      "Your cart is empty, but your story is not. Let's fix the first part.",
  },

  // ============================================================================
  // HOME PAGE
  // ============================================================================

  home: {
    hero: {
      headline: 'Wear the flag. Raise the vibe.',
      subheadline: 'Eight pieces. One message. Love people on purpose.',
      primaryCta: { text: 'Shop Tees', href: '/collections/tees' },
      secondaryCta: { text: 'Shop Hoodies', href: '/collections/hoodies' },
      note: 'Drop Day January 11. First run is limited.',
    },

    featuredDrop: {
      sectionTitle: 'Featured Drop',
      tabs: ['Tees', 'Hoodies', 'All'],
      quickAdd: 'Quick Add',
      fromLabel: 'From',
    },

    familyProof: {
      headline: 'Not merch. A marker.',
      subheadline:
        'Every piece is a reminder that we can stop the chain, tell the truth, and live different.',
      cta: { text: 'Read Our Story', href: '/pages/our-story' },
    },

    whyWeRaize: {
      headline: 'Why we raize the vibe',
      body: 'Raize The Vibe is for the people who have been misunderstood, mislabeled, or pushed out. It is for parents learning a new way. It is for the ones who came back from the dark and decided to love louder than fear.',
      cta: { text: 'Read Our Story', href: '/pages/our-story' },
    },

    storyTeaser: {
      headline: 'Why we raize the vibe',
      excerpt:
        'Two years ago we were living in our car in Arkansas. Then a stranger offered kindness. Then God started answering prayers we never prayed. This is the story that became our flag.',
      cta: { text: 'Read Our Story', href: '/pages/our-story' },
    },

    stickyCta: {
      headline: 'Start here',
      buttons: [
        { text: 'Shop Featured Drop', href: '/collections/all' },
        { text: 'Explore All Items', href: '/products' },
        { text: 'Read a Prayer', href: '/pages/prayer' },
      ],
    },
  },

  // ============================================================================
  // COLLECTION PAGE
  // ============================================================================

  collection: {
    header: {
      title: 'The Drop',
      description: 'Pick your flag. Choose your fit. Wear the message.',
    },
    filterChips: [
      'All',
      'Love and Safety',
      'Faith and Fire',
      'Tribe and Healing',
      'Bold Statements',
      'Soft Statements',
    ],
    sortLabels: {
      default: 'Sort: Featured',
      featured: 'Featured',
      newest: 'Newest',
      priceLowHigh: 'Price low to high',
      priceHighLow: 'Price high to low',
    },
    emptyState:
      'No matches for those filters yet. Try "All" or clear filters.',
  },

  // ============================================================================
  // PRODUCT DETAIL PAGE
  // ============================================================================

  pdp: {
    buttons: {
      addToCart: 'Add to Cart',
      buyNow: 'Buy it Now',
    },
    sizeHelp: 'True to size for a classic fit. Want it oversized? Size up one.',
    shippingMicrocopy:
      'Printed to order. Most orders ship in a few business days. During launch week it can take a little longer. Thank you for your patience. We will keep you posted with tracking as soon as it moves.',
    returnsMicrocopy:
      'Wrong size? No shame. We will help you exchange it.',
    whatItMeans: {
      headline: 'What it means',
      bodyTemplate:
        'This design is a flag for people choosing love over fear. Wear it as a reminder that you do not have to be perfect to be part of the tribe. You just have to be willing.',
    },
    goodies: {
      headline: 'Goodies',
      bullets: [
        'Limited first run. When a size is gone, it is gone.',
        'Bundle and save with a tee and hoodie.',
        'Join the email list for early access to restocks.',
      ],
    },
    storyLink: {
      headline: 'Read the story behind this piece',
      teaser:
        'This is not a slogan to us. It is a memory. A marker. A prayer we are wearing out loud.',
      cta: { text: 'Read Our Story', href: '/pages/our-story' },
    },
    relatedProducts: {
      headline: 'More flags',
    },
    originalArtNote:
      'All artwork is original. We chose premium blanks because comfort matters. Thank you for supporting a small, family-run brand.',
  },

  // ============================================================================
  // PRODUCT DESCRIPTIONS (8 Tees)
  // ============================================================================

  products: {
    raizeTheVibe: {
      shortHook: 'The original flag.',
      description:
        'This is the logo that started it all. A torch and a horizon line. A reminder that light travels. Wear it when you want to be the kind of person who makes the room feel safer. Soft, clean, and loud in the quiet way.',
      whatItMeans: 'Wear the mission on your chest. Love people on purpose.',
    },
    imOnYourSide: {
      shortHook: 'A quiet ally statement.',
      description:
        'For the moments when someone is scanning the world for one safe face. This one does not argue. It reassures. Simple. Direct. Human. If you have ever needed a person to stand next to you, this is your flag.',
      whatItMeans:
        'For the moments when someone needs to know they are not alone.',
    },
    stillTheWayCross: {
      shortHook: 'Simple faith. Strong spine.',
      description:
        'Minimal. Modern. Unapologetically centered. For the days when you do not have fancy words, you just need the reminder that the Way still works. The cross holds the message and the message holds you.',
      whatItMeans: 'A reminder that your feet can come back to the path.',
    },
    stillTheWayHeart: {
      shortHook: 'Soft on purpose.',
      description:
        'This one is for the tender warriors. The ones who decided to stop hardening. Faith with a heartbeat. Love that refuses to become cruel. It looks like a doodle, but it is a decision.',
      whatItMeans: 'Faith with a heartbeat. Love that refuses to harden.',
    },
    jesusKnowsPronouns: {
      shortHook: 'Rainbow love. Jesus level.',
      description:
        'A love first statement for people who are tired of fear pretending to be faith. This is not a debate jersey. This is a safety signal. If somebody has ever been pushed out, this one holds the door open.',
      whatItMeans:
        'A love first statement for people who are tired of fear pretending to be faith.',
    },
    godKnowsPronouns: {
      shortHook: 'Love without the loopholes.',
      description:
        'Sometimes the boldest thing you can do is tell the truth with a smile. This piece is for the people who have been mislabeled, misunderstood, and still chose to stay close to God. It is a flag for dignity.',
      whatItMeans:
        'A flag for truth and tenderness. God is not afraid of your story.',
    },
    worshipIsMyWeapon: {
      shortHook: 'Praise with grit.',
      description:
        'Worship is how we fight without becoming what hurt us. This design carries a heartbeat waveform through the cross, because praise is not always pretty. Sometimes it is survival. Sometimes it is how you keep your hands clean and your heart soft.',
      whatItMeans: 'When life gets loud, you get louder with worship.',
    },
    loveThyNeighbor: {
      shortHook: 'The whole assignment.',
      description:
        'Seven hearts. One sentence. No loopholes. This is the shirt you wear when you are done qualifying who deserves kindness. It is for the people learning to love louder than fear, and for anyone who wants to be a safe place.',
      whatItMeans: 'The whole assignment. Love people like you mean it.',
    },
  },

  // ============================================================================
  // CART
  // ============================================================================

  cart: {
    title: 'Your cart',
    empty: {
      message: "Your cart is empty. Let's find your flag.",
      cta: { text: 'Shop the Drop', href: '/collections/all' },
    },
    discountCode: {
      label: 'Discount code',
      helper: 'If you have a code, drop it here.',
    },
    checkoutButton: 'Checkout',
    missionBlock: {
      headline: 'Our mission',
      body: 'Raize The Vibe exists to raise love and lower fear. Thank you for supporting art that points people home. A portion of proceeds from this drop will be given to our local church, because that is where we are called to give this year.',
    },
  },

  // ============================================================================
  // WHY THIS DROP MATTERS PAGE
  // ============================================================================

  pages: {
    whyThisDropMatters: {
      headline: 'Why this drop matters',
      intro:
        'This is not a random merch drop. This is a marker in the road. A way of saying we came back, and we are not going quiet about love.',
      sections: [
        {
          heading: 'Two years restored',
          body: 'Two years ago we were sleeping in parking lots. Today we are raising kids, rebuilding trust, and learning to live from faith instead of fear. We did not earn this kind of restoration. We received it.',
        },
        {
          heading: 'Many paths lead home',
          body: 'We believe people heal in different ways. We believe harm reduction saves lives. We believe love, truth, safety, and community are part of how God brings people back.',
        },
        {
          heading: 'Why 8 shirts and 8 hoodies',
          body: 'Eight flags for eight years it took us to find our way through the darkness. Not as a flex. As a witness. If you are still fighting, do not quit.',
        },
        {
          heading: 'These pieces are flags',
          body: 'You are not just buying a shirt. You are wearing a message. You are telling the world that love belongs here.',
        },
      ],
      ctas: [
        { text: 'Enter the Drop', href: '/collections/all' },
        { text: 'Read Our Story', href: '/pages/our-story' },
        { text: 'Read a Prayer', href: '/pages/prayer' },
      ],
    },

    // ============================================================================
    // PRAYER PAGE
    // ============================================================================

    prayer: {
      title: 'A prayer for you',
      intro:
        'If you needed a sign today, let this be it. You are not alone. God is not done with you.',
      prayerBlockLabel: 'Prayer',
      prayers: [
        {
          title: 'For Your Family',
          text: `Lord, we lift up the family reading this right now.

Whether they're together or scattered, close or distant, we ask for restoration. For conversations that heal instead of hurt. For patience when patience runs thin.

May this family become a tribe — bound not just by blood but by purpose. And may every meal, every car ride, every ordinary moment become holy ground.

Amen.`,
        },
        {
          title: 'For Your Faith',
          text: `Father, meet this person exactly where they are.

If they're confident in their faith, deepen it. If they're questioning, give them permission to question without fear. If they're returning after time away, welcome them home without shame.

Let their faith be real, not performed. Messy, not polished. Yours, not borrowed.

Amen.`,
        },
        {
          title: 'For Your Day',
          text: `God of the ordinary moments,

Bless this person's today. The meetings and the school pickups. The deadlines and the dishes. The conversations they're dreading and the ones they don't know are coming.

Give them eyes to see You in the mundane. Ears to hear You in the noise. And courage to raize the vibe wherever they go.

Amen.`,
        },
      ],
      emailModule: {
        headline: 'Want prayers and drop updates?',
        subhead: 'One email at a time. No spam. Just good medicine.',
        button: 'Send me the prayers',
        consent: 'By subscribing, you agree to receive emails. Unsubscribe anytime.',
      },
      cta: { text: 'Shop the Drop', href: '/collections/all' },
    },

    // ============================================================================
    // FAQ PAGE
    // ============================================================================

    faq: {
      title: 'FAQ',
      intro:
        'If you have questions, we have answers. If you still have questions, hit us up and we will help.',
      categories: [
        {
          name: 'Shipping',
          questions: [
            {
              q: 'How long does shipping take?',
              a: 'Most items ship in a few business days. During launch week, it can take a little longer because we are a small family-run operation, not a multinational corporation. Thank you for your patience. You will get tracking as soon as it goes out.',
            },
            {
              q: 'Do you ship international?',
              a: 'Not yet. For this first drop we are shipping within the USA.',
            },
          ],
        },
        {
          name: 'Returns and exchanges',
          questions: [
            {
              q: 'What if I ordered the wrong size?',
              a: 'It happens. Email us and we will help you exchange it.',
            },
            {
              q: 'Can I return an item?',
              a: 'If there is a print issue or damage, we will make it right. If you just changed your mind, reach out and we will do our best to help.',
            },
          ],
        },
        {
          name: 'Product and care',
          questions: [
            {
              q: 'What blanks do you use?',
              a: 'Premium, soft blanks that hold up. We chose these on purpose. If you want a snug fit, order true to size. If you like it roomy, size up. All artwork is original. Thank you for supporting a bootstrapped family brand.',
            },
            {
              q: 'How do I wash it?',
              a: 'Cold wash, inside out. Tumble low or hang dry to keep the print fresh.',
            },
          ],
        },
        {
          name: 'Mission',
          questions: [
            {
              q: 'What is Raize The Vibe?',
              a: 'A family brand built on faith, love, and healing. Wearable flags for people choosing to stop the chain.',
            },
            {
              q: 'Is this drop limited?',
              a: 'Yes. First run is limited. When a size is gone, it is gone.',
            },
          ],
        },
      ],
    },

    // ============================================================================
    // OUR STORY / CHAPTER ONE PAGE
    // Full content from rtv-why-we-raize-the-vibe.md
    // ============================================================================

    ourStory: {
      title: 'Our Story',
      subtitle: 'Why We Raize The Vibe',
      intro: "Hi. We're Chrix and Sarah.",
      introBody: 'Before we tell you how this started, we want to tell you where we are now.',
      sections: [
        {
          heading: 'Who We Are Now',
          paragraphs: [
            "By day, we run a small vibecoding studio called Raize The Vibe, where we help people untangle the internet and build digital systems that reflect who they are and what they're trying to create. It's creative work. It's technical work. And it's grounded in truth.",
            'Raize The Vibe Apparel is different.',
            'This is our mission.',
            'This drop is about our freedom, about loving and protecting our kids, and about showing up for our community without hiding.',
            "Sarah and I have been clean since January 11, 2024. That date marks the beginning of a life we never thought we'd get back. That's why this drop happens on the 11th.",
            "Now, here's how we got here.",
          ],
        },
        {
          heading: 'The Walmart Parking Lot',
          paragraphs: [
            "Two years ago, we were living in our car in Arkansas—about a thousand miles from home—which is still funny to say out loud because who goes to Arkansas on purpose?",
            "We didn't. We ended up there.",
            'I can still feel that season in my body if I sit still long enough. The kind of cold that makes your bones argue with you. The kind of hunger that turns a dollar into a plan. The kind of exhaustion where tomorrow feels like a rumor somebody else gets to believe.',
            'We were lost in darkness, and meth was tangled up in that darkness. Not as a headline. Not as a story to shock you. Just the truth.',
            'One night, we woke up in a Walmart parking lot. Windows fogged, phone almost dead, the world outside still dark. You take inventory in moments like that. How much gas. How much time. How much dignity you think you have left. You tell yourself you are going to move, you are going to work, you are going to keep going. Not because you feel strong, but because you do not see another option.',
          ],
        },
        {
          heading: 'A Stranger Did Something Holy',
          paragraphs: [
            'And then a stranger did something holy.',
            'At a gas station in Arkansas, someone offered us kindness like it was normal. No lecture. No judgment. No performance. Just compassion, like we were still human.',
            'It did not solve everything. It did not teleport us home. But it cracked a door.',
            'It reminded us we were still people.',
            'So we stayed in that car for thirty days. We delivered food through DoorDash. We drove until the miles blurred. We split meals. We slept wherever we could. We tried to provide our own way, not because we were proud, but because we finally understood something hard. If someone cleaned up our mess again, we would just end up with a mess again.',
            'We were learning responsibility. One day at a time. The next right thing.',
          ],
        },
        {
          heading: 'One Hundred Days of Grace',
          paragraphs: [
            'Then grace showed up in a way we did not even know to ask for.',
            "After those thirty days, we were invited to my mother's home, at first just to take a shower and have a meal. That small opening became what we now call our hundred days of grace.",
            'If you have never taken a real shower after living in your car, you might not understand what it feels like when the water hits your skin and you realize you are safe for a minute. Not fixed. Not finished. Just safe.',
            'Those hundred days gave Sarah and me space to breathe, to soften, and to heal in ways we never even asked for. Our nervous systems stopped screaming long enough for our souls to breathe. We slept. We ate. We started telling the truth.',
            'That is a big theme in our story.',
            'Prayers being answered that we never prayed.',
            'God moving obstacles that were bigger than us.',
          ],
        },
        {
          heading: 'Meeting Tabitha',
          paragraphs: [
            'Not long after that, we drove to the airport to pick up my youngest daughter, Tabitha.',
            'I was there when she was born, but I had been gone so long that it was not a memory she carried. For her, this was not a simple pickup.',
            'This was the first time she was meeting her dad.',
            'We picked her up three days before her eleventh birthday. And because God has a way of writing poetry with real life, we took her to Harry Potter World on her eleventh birthday, just like Harry.',
            'She got her Hogwarts day on her eleventh, and we got a miracle we did not deserve. Our daughter holding our hands. Her laughter. Her eyes taking it all in. A brand new memory replacing a decade of absence.',
            'From there we went to an Airbnb, and we began what we can only call a reuniting adventure. That adventure turned into a road trip to Texas where Tabitha met her brothers and sisters for the first time.',
          ],
        },
        {
          heading: 'Good Medicine',
          paragraphs: [
            'And then God kept writing the story with the kind of mercy that makes you laugh through tears.',
            'Because we did not raise our hand and say we were ready to be everyday parents.',
            'God put a little girl in our arms whose mom was serving the same darkness that overcame us for so long.',
            'I get to hold her as she cries herself to sleep asking why her mom is not the mom she needs.',
            'That is good medicine.',
            'Not because we enjoy pain. Because it keeps us honest.',
            'It keeps us humble.',
            'It reminds us that love is not a caption.',
            'Love is responsibility.',
          ],
        },
        {
          heading: 'Living Repentance',
          paragraphs: [
            'After we arrived in Texas, we did something that mattered more than it sounds on paper.',
            'We moved close, two and a half blocks away from my ex wife.',
            'Not to ask for anything.',
            'Not to take.',
            'Not to demand what we had not earned.',
            'We moved close to carry weight. To be useful. To show up in the unglamorous places where real repentance lives. School drop offs. Pickups after drama. Schedules. Early mornings. Late nights. Even a 4 a.m. drive to get a kid where they needed to be for a debate competition.',
            'We were trying to live our repentance, not perform it.',
          ],
        },
        {
          heading: 'Welcomed Back In',
          paragraphs: [
            'And God did something that still does not make sense unless you have lived it.',
            'We were welcomed back in.',
            'Friday night pizza and a movie became routine. Ordinary family moments became normal again. The kind of restoration that feels impossible when you know exactly why people had to protect themselves from you.',
            'That is the miracle.',
            'And it is also where Raize The Vibe truly began.',
          ],
        },
        {
          heading: 'Coming Home Changed Us',
          paragraphs: [
            'Because coming home to your children changes you.',
            'When we returned, our older kids were not the babies we left behind. They had grown. They had become. Some of our kids are gender nonconforming. Names changed. Identities evolved.',
            'In that moment, something unexpected happened inside me.',
            'My opinions melted.',
            'Not because I suddenly had every answer, but because the real question was not political or ideological.',
            'It was parental.',
            'These are my children.',
            'The children God entrusted to me.',
            'And my only desire became clear.',
            'That my children would know they are loved, and they are safe.',
          ],
        },
        {
          heading: 'Our Refusal',
          paragraphs: [
            'Raize The Vibe is our refusal to pass pain down.',
            'It is our choice to stop generational hurt instead of baptizing it with excuses.',
            "It is our choice to not hide behind the sentence, that's just how my parents did it.",
            'It is our willingness to ask the most dangerous question a grown adult can ask.',
            'Who would I be today if I was not hurt the way I was hurt.',
            'Then it is our responsibility to live like that answer is true.',
            'Because hurt people hurt people.',
            'That is not an excuse. That is a warning.',
            'And our job now, our Christian job, our human job, is to stop the chain.',
            'My job is to hurt no one.',
          ],
        },
        {
          heading: 'How Jesus Walked',
          paragraphs: [
            "That is how Jesus walked. That is what He asked. He did not tell us to win arguments. He did not tell us to dominate other people's identities. He told us to love.",
            'And love is not demanding the world take care of your fears.',
            'Love is taking responsibility for your fears and refusing to use them as weapons.',
          ],
        },
        {
          heading: 'Finding a Church Home',
          paragraphs: [
            'We learned that lesson again when we went looking for a church home.',
            'Some places made it clear our family did not fit. Some places carried fear like it was faith. But we also found glimpses of God in real people, love that felt like shelter. And the place that felt safest for our kids was not the loudest about being right.',
            'That experience burned something into us.',
            'We do not want a faith that makes people unsafe.',
            'We want a faith that looks like Jesus.',
          ],
        },
        {
          heading: 'Trauma, Addiction, and Healing',
          paragraphs: [
            'That is also why we speak the way we speak about trauma, addiction, and healing.',
            'We do not believe we are sick. We do not believe our story is best explained by a permanent disease label.',
            'What we do believe is this.',
            'When someone is a victim of trauma, especially complex trauma, the first thing that matters is coping. Drugs and alcohol can become refuge that most people will never need to understand because most people never had to survive what a trauma victim survived.',
            'When you tell the truth about that, you can actually help somebody.',
            'Because if you remove drugs and alcohol from a trauma victim without offering a healing solution, you are asking them to feel all the pain that makes them want to die, with no tools and no support. Too often people are told they are not doing it right, when the truth might be they need a different approach, a different level of care, a different path home.',
            'We believe many paths lead home.',
            'We believe harm reduction saves lives.',
            'We believe keeping people alive long enough to come home is holy work.',
          ],
        },
        {
          heading: 'What Raize The Vibe Means',
          paragraphs: [
            'So this is what Raize The Vibe means.',
            'It does not matter if you have been wrapped up in meth.',
            'It does not matter if you are trans.',
            'It does not matter if you are Christian.',
            'It does not matter if you are Black, white, or anything in between.',
            'We are all part of the same tribe.',
            'We have all been hurt.',
            'We have all hurt each other.',
            'And the way out is not by demanding our fears be taken care of.',
            'The way out is taking care of our fears, and inserting love into our lives on purpose, until love becomes how we live.',
          ],
        },
        {
          heading: 'Our Flag',
          paragraphs: [
            "This story is God's.",
            "This brand is God's.",
            'These shirts are not the point. They are a platform. They are art with a purpose. They are flags we were asked to raise.',
            'We are simply serving the Lord the way He called us to, by telling the truth, by making something beautiful, and by welcoming people who have felt pushed out into the same tribe.',
            'That is our story.',
            'That is our flag.',
            "And if you're here... you're welcome in it.",
          ],
        },
      ],
      thankYou: {
        heading: 'Thank You',
        paragraphs: [
          'Thank you for taking the time to read our story.',
          'Thank you for your attention, your care, and your willingness to sit with something real.',
          'If you choose to support Raize The Vibe Apparel, thank you for the opportunity to earn your business.',
          'And if this story meant something to you, the greatest compliment you could give us is to share it with someone who would appreciate it.',
        ],
        signOff: 'Your vibe attracts your tribe.',
      },
      closingCta: { text: 'Shop The Collection', href: '/collections/all' },
    },
  },

  // ============================================================================
  // FOOTER
  // ============================================================================

  footer: {
    columns: [
      {
        title: 'Shop',
        links: [
          { text: 'Tees', href: '/collections/tees' },
          { text: 'Hoodies', href: '/collections/hoodies' },
          { text: 'All Items', href: '/collections/all' },
        ],
      },
      {
        title: 'Story',
        links: [
          { text: 'Our Story', href: '/pages/our-story' },
          { text: 'Why This Drop Matters', href: '/pages/why-this-drop-matters' },
          { text: 'Prayer', href: '/pages/prayer' },
        ],
      },
      {
        title: 'Help',
        links: [
          { text: 'FAQ', href: '/pages/faq' },
          { text: 'Contact', href: '/pages/contact' },
          { text: 'Shipping and Returns', href: '/pages/faq' },
        ],
      },
    ],
    signOff: {
      line1: 'Thank you for being here.',
      line2: 'Your vibe attracts your tribe.',
    },
    legal: `© ${new Date().getFullYear()} Raize The Vibe Apparel. All rights reserved.`,
  },
};

// Helper to get active announcement
export function getActiveAnnouncement(): string {
  const key = SITE_COPY.announcement.active;
  return SITE_COPY.announcement[key];
}

// Type exports for components
export type SiteCopy = typeof SITE_COPY;
