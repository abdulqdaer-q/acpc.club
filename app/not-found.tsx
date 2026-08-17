import localFont from "next/font/local";
import Link from "next/link";

import "./globals.css";

/**
 * Root 404 for paths that match no route.
 *
 * It carries its own html/body because app/[locale]/layout.tsx is the root
 * layout, and an unmatched path never enters that segment — so there is no
 * chrome to inherit. Without this file Next serves a bare white English-only
 * page, which is jarring on a dark bilingual site.
 *
 * Copy is bilingual by design: an unmatched path tells us nothing about which
 * language the visitor wanted.
 */

const cairo = localFont({
  src: [
    { path: "./fonts/Cairo-Regular.ttf", style: "normal", weight: "400" },
    { path: "./fonts/Cairo-Bold.ttf", style: "normal", weight: "700" }
  ],
  display: "swap",
  variable: "--font-cairo"
});

export default function NotFound() {
  return (
    <html lang="en">
      <body className={`${cairo.className} ${cairo.variable}`}>
        <div className="locale-root" data-dir="ltr">
          <div className="site-frame">
            <main className="shell page">
              <section className="section not-found">
                <p className="section-kicker mono">404</p>

                <h1>Page not found</h1>
                <p className="item-copy">
                  This address does not match anything on the site. It may have
                  moved, or the link may be mistyped.
                </p>

                <h2 lang="ar" dir="rtl">
                  الصفحة غير موجودة
                </h2>
                <p className="item-copy" lang="ar" dir="rtl">
                  هذا العنوان لا يطابق أي صفحة في الموقع. قد تكون الصفحة نُقلت أو
                  أن الرابط غير صحيح.
                </p>

                <div className="cta-row">
                  <Link className="button button-primary" href="/en">
                    English home
                  </Link>
                  <Link className="button button-secondary" href="/ar">
                    الصفحة الرئيسية
                  </Link>
                </div>
              </section>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
