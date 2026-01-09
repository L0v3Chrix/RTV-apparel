/**
 * Prayer Page Content
 * Sourced from SITE_COPY master file
 * V1 PLACEHOLDER — Move to Shopify Pages in V2
 */

import {SITE_COPY} from './siteCopy';

// Re-export from SITE_COPY for backwards compatibility
export const prayerContent = {
  title: SITE_COPY.pages.prayer.title,
  subtitle: 'Before you shop, can we pray?',
  intro: SITE_COPY.pages.prayer.intro,
  prayerBlockLabel: SITE_COPY.pages.prayer.prayerBlockLabel,

  // Keeping detailed prayer content from original file
  // as SITE_COPY only has the page structure, not full prayer texts
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

  signupSection: {
    title: SITE_COPY.pages.prayer.emailModule.headline,
    description: SITE_COPY.pages.prayer.emailModule.subhead,
    buttonText: SITE_COPY.pages.prayer.emailModule.button,
    consent: SITE_COPY.pages.prayer.emailModule.consent,
    checkboxLabel: 'Send me prayers + drop updates',
    ctaButtonText: SITE_COPY.pages.prayer.cta.text,
    ctaButtonHref: SITE_COPY.pages.prayer.cta.href,
  },
};
