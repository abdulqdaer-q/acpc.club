"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { isLocale, pageOrder, routeSegments, type PageSlug } from "@/lib/i18n";

/**
 * Drives real cross-document morphing via the View Transitions API.
 *
 * globals.css already describes the whole choreography — a direction-aware
 * shared-axis move for `page-shell`, plus morphs for `club-header-mark` and
 * `club-hero-media` — gated behind html[data-vt="native"]. Nothing ever set that
 * value, so those 20-odd rules never ran and navigation instead showed a
 * hand-rolled overlay that also delayed every click by 240ms. This calls
 * startViewTransition so the CSS does the work, and navigation starts
 * immediately.
 *
 * Browsers without the API (Firefox, as of writing) get plain instant
 * navigation, which is the correct fallback for a fully static site.
 */

type ViewTransition = {
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition;
};

// A slow route must never leave the captured frame on screen indefinitely.
const COMMIT_TIMEOUT_MS = 900;

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
  const commitRef = useRef<(() => void) | null>(null);

  // startViewTransition holds the old frame until its callback settles. Next's
  // router.push is async, so the transition is resolved from here — once the new
  // pathname has actually committed.
  useEffect(() => {
    const commit = commitRef.current;

    if (commit) {
      commitRef.current = null;
      commit();
    }
  }, [pathname]);

  useEffect(() => {
    const doc = document as ViewTransitionDocument;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supported = typeof doc.startViewTransition === "function";

    // Gates the ::view-transition rules. "fallback" keeps the CSS entry
    // animation on .page-transition-shell instead.
    document.documentElement.dataset.vt =
      supported && !prefersReducedMotion ? "native" : "fallback";

    if (!supported || prefersReducedMotion) {
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

      // Read by the direction-aware shared-axis rules in globals.css.
      document.documentElement.dataset.navDirection = getDirection(currentPath, nextPath);

      const transition = doc.startViewTransition!(
        () =>
          new Promise<void>((resolve) => {
            const guard = window.setTimeout(resolve, COMMIT_TIMEOUT_MS);

            commitRef.current = () => {
              window.clearTimeout(guard);
              resolve();
            };

            router.push(nextPath);
          })
      );

      // Clicking a second link mid-transition skips the first one. A skipped
      // transition rejects `ready` with InvalidStateError — `finished` still
      // resolves, which is why catching only that one left the rejection
      // unhandled. Being skipped is expected here, so all three are swallowed.
      const ignore = () => {};
      transition.ready.catch(ignore);
      transition.updateCallbackDone.catch(ignore);
      transition.finished.catch(ignore);
    };

    document.addEventListener("click", onClick, { capture: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, [router]);

  return null;
}
