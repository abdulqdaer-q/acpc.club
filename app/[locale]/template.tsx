import type { ReactNode } from "react";

export default function LocaleTemplate({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="page-transition-shell">{children}</div>;
}
