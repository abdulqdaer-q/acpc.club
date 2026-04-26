import Link from "next/link";

import { AcpcLogo } from "@/components/acpc-logo";
import { Locale, buildNavigation } from "@/lib/i18n";
import { SiteSettings } from "@/lib/site-content";

type SiteFooterProps = {
  locale: Locale;
  settings: SiteSettings;
};

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
            <Link href="https://wa.me/971547001658">
              {locale === "ar" ? "واتساب" : "WhatsApp"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
