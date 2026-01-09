import Link from 'next/link';

const footerLinks = {
  shop: [
    { href: '/collections/tees', label: 'Tees' },
    { href: '/collections/hoodies', label: 'Hoodies' },
    { href: '/collections/all', label: 'All Items' },
  ],
  story: [
    { href: '/pages/our-story', label: 'Why' },
    { href: '/pages/why-this-drop-matters', label: 'Why This Drop Matters' },
    { href: '/pages/prayer', label: 'Prayer' },
  ],
  help: [
    { href: '/pages/faq', label: 'FAQ' },
    { href: 'mailto:hello@raizethevibe.com', label: 'Contact' },
    { href: '/pages/faq', label: 'Shipping & Returns' },
  ],
};

const socialLinks = [
  { href: 'https://instagram.com/raizethevibe', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://facebook.com/raizethevibe', label: 'Facebook', icon: FacebookIcon },
  { href: 'https://tiktok.com/@raizethevibe', label: 'TikTok', icon: TikTokIcon },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rtv-ink border-t border-rtv-charcoal">
      <div className="container-wide py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rtv-teal to-rtv-tealDark flex items-center justify-center shadow-teal transition-transform group-hover:scale-105">
                <span className="text-white text-sm font-bold">R</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Raize The Vibe
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Premium streetwear that speaks louder than words. Defiant faith in every thread.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-rtv-teal transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-rtv-teal">
              Shop
            </h3>
            <nav className="space-y-3">
              {footerLinks.shop.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Story Links */}
          <div>
            <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-rtv-teal">
              Story
            </h3>
            <nav className="space-y-3">
              {footerLinks.story.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-rtv-teal">
              Help
            </h3>
            <nav className="space-y-3">
              {footerLinks.help.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="block text-white/60 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Sign Off */}
        <div className="text-center py-8 border-t border-white/5">
          <p className="text-white/40 text-sm mb-2">Thank you for being here.</p>
          <p className="text-white/70 font-semibold text-lg">Your vibe attracts your tribe.</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30 text-center md:text-left">
            &copy; {currentYear} Raize The Vibe Apparel. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <Link href="/policies/privacy-policy" className="hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/policies/terms-of-service" className="hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}
