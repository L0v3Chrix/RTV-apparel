/**
 * WhyDropMattersGrid - 8-tile responsive grid
 * Desktop: 4x2 layout
 * Mobile: 2x4 layout
 *
 * Uses custom RTV icons + content from siteCopy
 */

import {Link} from '@remix-run/react';

import {
  IconTorch,
  IconHeartShield,
  IconSunrisePath,
  IconChainBreak,
  IconHandsTogether,
  IconFlagRaised,
  IconCrossHeart,
  IconSoundWave,
} from '~/components/icons';
import {SITE_COPY} from '~/content/siteCopy';

interface GridTile {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{size?: number; className?: string}>;
}

// Combine siteCopy sections with our custom icons
const gridTiles: GridTile[] = [
  {
    number: '01',
    title: SITE_COPY.pages.whyThisDropMatters.sections[0].heading,
    description: SITE_COPY.pages.whyThisDropMatters.sections[0].body,
    icon: IconSunrisePath,
  },
  {
    number: '02',
    title: SITE_COPY.pages.whyThisDropMatters.sections[1].heading,
    description: SITE_COPY.pages.whyThisDropMatters.sections[1].body,
    icon: IconHandsTogether,
  },
  {
    number: '03',
    title: SITE_COPY.pages.whyThisDropMatters.sections[2].heading,
    description: SITE_COPY.pages.whyThisDropMatters.sections[2].body,
    icon: IconTorch,
  },
  {
    number: '04',
    title: SITE_COPY.pages.whyThisDropMatters.sections[3].heading,
    description: SITE_COPY.pages.whyThisDropMatters.sections[3].body,
    icon: IconFlagRaised,
  },
  {
    number: '05',
    title: 'Faith with a heartbeat',
    description:
      'We believe love is not a caption. Love is responsibility. These pieces carry that message.',
    icon: IconCrossHeart,
  },
  {
    number: '06',
    title: 'Stop the chain',
    description:
      'Hurt people hurt people. That is not an excuse—it is a warning. Our job is to break the cycle.',
    icon: IconChainBreak,
  },
  {
    number: '07',
    title: 'Safe for everyone',
    description:
      'If someone has been pushed out, these flags hold the door open. Love without the loopholes.',
    icon: IconHeartShield,
  },
  {
    number: '08',
    title: 'Worship is how we fight',
    description:
      'Praise without becoming what hurt us. Sometimes worship is survival. Sometimes it is how you keep your heart soft.',
    icon: IconSoundWave,
  },
];

export function WhyDropMattersGrid() {
  return (
    <section className="bg-rtv-obsidian py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {SITE_COPY.pages.whyThisDropMatters.headline}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {SITE_COPY.pages.whyThisDropMatters.intro}
          </p>
        </div>

        {/* 8-Tile Grid: 4x2 desktop, 2x4 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {gridTiles.map((tile) => (
            <TileCard key={tile.number} tile={tile} />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 md:mt-16">
          {SITE_COPY.pages.whyThisDropMatters.ctas.map((cta, i) => (
            <Link
              key={cta.href}
              to={cta.href}
              className={`
                inline-flex items-center justify-center
                px-6 py-3 rounded-full
                font-semibold text-sm uppercase tracking-wide
                transition-all duration-300
                ${
                  i === 0
                    ? 'bg-rtv-cyan text-rtv-obsidian hover:shadow-[0_0_20px_rgba(99,179,237,0.4)]'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/15'
                }
              `}
            >
              {cta.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TileCard({tile}: {tile: GridTile}) {
  const IconComponent = tile.icon;

  return (
    <div
      className="
        group relative
        bg-white/[0.04]
        backdrop-blur-[12px]
        border border-white/10
        rounded-xl
        p-4 md:p-6
        transition-all duration-300
        hover:bg-white/[0.08]
        hover:border-white/20
        hover:shadow-[0_0_30px_rgba(99,179,237,0.1)]
      "
    >
      {/* Number Badge */}
      <span className="text-rtv-cyan/50 text-xs font-mono mb-3 block">
        {tile.number}
      </span>

      {/* Icon */}
      <div className="mb-4">
        <div
          className="
            w-10 h-10 md:w-12 md:h-12
            rounded-xl
            bg-white/5
            border border-white/10
            flex items-center justify-center
            text-rtv-cyan/70
            group-hover:text-rtv-cyan
            transition-colors duration-300
          "
        >
          <IconComponent size={20} className="md:w-6 md:h-6" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-sm md:text-base mb-2 leading-tight">
        {tile.title}
      </h3>

      {/* Description - Hidden on mobile, visible on larger screens */}
      <p className="hidden md:block text-white/50 text-sm leading-relaxed">
        {tile.description}
      </p>
    </div>
  );
}

export default WhyDropMattersGrid;
