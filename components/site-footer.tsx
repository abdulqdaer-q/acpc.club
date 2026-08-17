import type { ReactNode } from "react";
import Link from "next/link";

import { AcpcLogo } from "@/components/acpc-logo";
import { Locale, buildNavigation } from "@/lib/i18n";
import { SiteSettings } from "@/lib/site-content";

type SiteFooterProps = {
  locale: Locale;
  settings: SiteSettings;
};

function SocialIconLink({
  href,
  label,
  icon
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      aria-label={label}
      className="social-icon-link"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {icon}
    </Link>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <rect height="14" rx="4" stroke="currentColor" strokeWidth="1.8" width="14" x="5" y="5" />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="7.5" fill="currentColor" r="1.05" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <rect height="14" rx="3" stroke="currentColor" strokeWidth="1.8" width="14" x="5" y="5" />
      <path d="M9 10v5.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <circle cx="9" cy="8.25" fill="currentColor" r="1" />
      <path
        d="M12.5 15.5V10m0 1.4c.6-.95 1.34-1.4 2.22-1.4 1.48 0 2.28 1 2.28 2.82v2.68"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 12.1 16.2 8.8c.38-.16.74.22.58.59l-3 7.23c-.1.25-.44.3-.61.1l-1.82-2.05-1.45 1.42c-.21.2-.56.07-.58-.22l-.2-2.63-1.9-.68c-.31-.11-.31-.54 0-.66Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 5a6.9 6.9 0 0 0-5.98 10.35L5 19l3.83-1a6.99 6.99 0 1 0 3.17-13Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.95 9.4c.2-.45.43-.46.6-.46h.52c.17 0 .4.05.48.25l.67 1.52c.08.2.04.44-.1.58l-.43.44a.48.48 0 0 0-.1.54c.27.55.76 1.15 1.3 1.62.42.37.9.7 1.32.86.18.07.39.02.52-.11l.5-.52c.14-.14.34-.18.52-.1l1.45.66c.22.1.28.33.24.52l-.11.54c-.04.17-.12.38-.44.57-.52.3-1.12.4-1.67.24-.81-.24-1.8-.83-2.7-1.68-1.02-.96-1.7-2-1.92-2.89-.16-.63-.05-1.18.25-1.58Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter({ locale, settings }: SiteFooterProps) {
  const navigation = buildNavigation(locale);

  return (
    <footer className="footer">
      <div className="shell footer-grid footer-grid-minimal">
        <div className="footer-block footer-brand-block">
          <AcpcLogo className="footer-brand" size="md" />
          <h3 className="footer-heading">
            {locale === "ar"
              ? "نادي البرمجة التنافسية في جامعة حلب"
              : "Competitive Programming Club at the University of Aleppo"}
          </h3>
          <p className="footer-copy">{settings.tagline}</p>
        </div>

        <div className="footer-block">
          <div className="footer-inline">
            {navigation.map((item) => (
              <Link key={item.slug} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-inline footer-inline-muted">
            <span>{settings.location}</span>
            <Link href={`mailto:${settings.email}`}>{settings.email}</Link>
            <div
              aria-label={locale === "ar" ? "روابط التواصل" : "Social links"}
              className="footer-socials"
            >
              <SocialIconLink
                href="https://wa.me/971547001658"
                icon={<WhatsAppIcon />}
                label={locale === "ar" ? "واتساب" : "WhatsApp"}
              />
              {settings.socialLinks.instagram ? (
                <SocialIconLink
                  href={settings.socialLinks.instagram}
                  icon={<InstagramIcon />}
                  label="Instagram"
                />
              ) : null}
              {settings.socialLinks.linkedin ? (
                <SocialIconLink
                  href={settings.socialLinks.linkedin}
                  icon={<LinkedInIcon />}
                  label="LinkedIn"
                />
              ) : null}
              {settings.socialLinks.telegram ? (
                <SocialIconLink
                  href={settings.socialLinks.telegram}
                  icon={<TelegramIcon />}
                  label={locale === "ar" ? "مجموعة التدريب" : "Training Group"}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="shell footer-legal">
        <p>
          {locale === "ar"
            ? "نادي طلابي جامعي مستقل يخدم طلبة جامعة حلب. ويشير استخدام ICPC إلى مجال المسابقة البرمجية الجامعية، ولا يعني تمثيل المنظمة الدولية أو التحدث باسمها."
            : "An independent university student club serving University of Aleppo students. The use of “ICPC” denotes the collegiate programming contest domain and does not imply representation of, or affiliation with, the international ICPC organization."}
        </p>
      </div>
    </footer>
  );
}
