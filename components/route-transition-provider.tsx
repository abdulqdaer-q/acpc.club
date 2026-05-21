"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AcpcLogo } from "@/components/acpc-logo";
import { isLocale, pageOrder, routeSegments, type PageSlug } from "@/lib/i18n";

function shouldHandleAnchor(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") {
    return false;
  }

  if (anchor.hasAttribute("download") || anchor.dataset.transition === "off") {
    return false;
  }

  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  return true;
}

const routeEntries = Object.entries(routeSegments) as Array<
  [Exclude<PageSlug, "home">, string]
>;

function resolvePageSlug(pathname: string): PageSlug {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return "home";
  }

  const [, segment] = isLocale(parts[0]) ? parts : [undefined, parts[0]];

  if (!segment) {
    return "home";
  }

  if (segment === "events") {
    return "volunteers";
  }

  const match = routeEntries.find(([, value]) => value === segment);

  return match?.[0] ?? "home";
}

function getDirection(currentPath: string, nextPath: string) {
  const currentSlug = resolvePageSlug(currentPath);
  const nextSlug = resolvePageSlug(nextPath);
  const currentIndex = pageOrder.indexOf(currentSlug);
  const nextIndex = pageOrder.indexOf(nextSlug);

  if (currentIndex === -1 || nextIndex === -1 || currentIndex === nextIndex) {
    return "forward";
  }

  return nextIndex > currentIndex ? "forward" : "backward";
}

export function RouteTransitionProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMorphing, setIsMorphing] = useState(false);
  const clearTimerRef = useRef<number | null>(null);

  const clearMorph = () => {
    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current);
    }

    clearTimerRef.current = window.setTimeout(() => {
      setIsMorphing(false);
      document.documentElement.dataset.morphing = "false";
    }, 760);
  };

  useEffect(() => {
    if (isMorphing) {
      clearMorph();
    }

    return () => {
      if (clearTimerRef.current) {
        window.clearTimeout(clearTimerRef.current);
      }
    };
    // The morph should complete after the routed page has committed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.vt = prefersReducedMotion ? "fallback" : "custom";

    if (prefersReducedMotion) {
      return;
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");

      if (!(anchor instanceof HTMLAnchorElement) || !shouldHandleAnchor(anchor)) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      const nextPath = `${url.pathname}${url.search}${url.hash}`;
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (nextPath === currentPath) {
        return;
      }

      event.preventDefault();
      document.documentElement.dataset.navDirection = getDirection(currentPath, nextPath);
      document.documentElement.style.setProperty("--morph-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--morph-y", `${event.clientY}px`);
      document.documentElement.dataset.morphing = "true";
      setIsMorphing(true);

      window.setTimeout(() => {
        router.push(nextPath);
      }, 240);

      window.setTimeout(() => {
        document.documentElement.dataset.navDirection =
          document.documentElement.dataset.navDirection || "forward";
        clearMorph();
      }, 1120);
    };

    document.addEventListener("click", onClick, { capture: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, [router]);

  return (
    <div className="route-morph-layer" aria-hidden="true" data-active={isMorphing}>
      <div className="route-morph-mark">
        <AcpcLogo size="md" />
      </div>
      <svg className="route-morph-circuit" viewBox="0 0 1200 760">
        <path d="M96 512H252V420H408V336H584" pathLength="100" />
        <path d="M1102 208H920V304H752V424H616" pathLength="100" />
        <path d="M180 160H356V244H496V520H828V620H1016" pathLength="100" />
        <circle cx="96" cy="512" r="9" />
        <circle cx="408" cy="336" r="9" />
        <circle cx="616" cy="424" r="9" />
        <circle cx="1016" cy="620" r="9" />
      </svg>
    </div>
  );
}
