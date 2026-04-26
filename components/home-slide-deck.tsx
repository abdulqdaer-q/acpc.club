"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

type HomeSlide = {
  id: string;
  content: ReactNode;
  stepCount?: number;
};

type HomeSlideDeckProps = {
  overlay?: ReactNode;
  slides: HomeSlide[];
};

type HomeSlideDeckContextValue = {
  activeIndex: number;
  goTo: (index: number) => void;
  isEnabled: boolean;
  slideCount: number;
  steps: number[];
  setStep: (slideIndex: number, step: number) => void;
};

const DESKTOP_MEDIA = "(min-width: 1081px)";
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";
const TRANSITION_MS = 820;
const WHEEL_STEP_THRESHOLD = 88;
const HomeSlideDeckContext = createContext<HomeSlideDeckContextValue | null>(null);

export function useHomeSlideState(slideIndex: number) {
  const context = useContext(HomeSlideDeckContext);

  if (!context) {
    return {
      active: false,
      activeStep: 0,
      isEnabled: false,
      setActiveStep: () => {}
    };
  }

  return {
    active: context.activeIndex === slideIndex,
    activeStep: context.steps[slideIndex] ?? 0,
    isEnabled: context.isEnabled,
    setActiveStep: (step: number) => context.setStep(slideIndex, step)
  };
}

export function useHomeSlideDeck() {
  const context = useContext(HomeSlideDeckContext);

  if (!context) {
    return {
      activeIndex: 0,
      goTo: () => {},
      isEnabled: false,
      slideCount: 0
    };
  }

  return {
    activeIndex: context.activeIndex,
    goTo: context.goTo,
    isEnabled: context.isEnabled,
    slideCount: context.slideCount
  };
}

export function HomeSlideDeck({ overlay, slides }: HomeSlideDeckProps) {
  const deckRef = useRef<HTMLDivElement | null>(null);
  const slideScrollRefs = useRef<Array<HTMLDivElement | null>>([]);
  const touchStartY = useRef<number | null>(null);
  const transitionLock = useRef(false);
  const wheelIntent = useRef(0);
  const wheelResetTimer = useRef<number | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [steps, setSteps] = useState(() => slides.map(() => 0));
  const stepsRef = useRef(steps);

  const slideCount = slides.length;

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    setSteps((current) =>
      slides.map((slide, index) => {
        const stepCount = slide.stepCount ?? 1;
        return Math.max(0, Math.min(current[index] ?? 0, stepCount - 1));
      })
    );
  }, [slides]);

  const releaseLock = () => {
    window.setTimeout(() => {
      transitionLock.current = false;
    }, TRANSITION_MS);
  };

  const setStep = (slideIndex: number, step: number) => {
    const stepCount = slides[slideIndex]?.stepCount ?? 1;
    const nextStep = Math.max(0, Math.min(step, stepCount - 1));

    setSteps((current) => {
      const next = [...current];
      next[slideIndex] = nextStep;
      return next;
    });
  };

  const scrollActiveSlide = (delta: number) => {
    const activeScroller = slideScrollRefs.current[activeIndex];

    if (!activeScroller) {
      return false;
    }

    const maxScrollTop = activeScroller.scrollHeight - activeScroller.clientHeight;

    if (maxScrollTop <= 2) {
      return false;
    }

    const nextScrollTop = Math.max(0, Math.min(maxScrollTop, activeScroller.scrollTop + delta));

    if (Math.abs(nextScrollTop - activeScroller.scrollTop) < 1) {
      return false;
    }

    activeScroller.scrollTo({
      top: nextScrollTop,
      behavior: "smooth"
    });
    return true;
  };

  const canScrollActiveSlide = (delta: number) => {
    const activeScroller = slideScrollRefs.current[activeIndex];

    if (!activeScroller) {
      return false;
    }

    const maxScrollTop = activeScroller.scrollHeight - activeScroller.clientHeight;

    if (maxScrollTop <= 2) {
      return false;
    }

    if (delta > 0) {
      return activeScroller.scrollTop < maxScrollTop - 1;
    }

    return activeScroller.scrollTop > 1;
  };

  const goTo = (index: number) => {
    transitionLock.current = false;
    setActiveIndex(Math.max(0, Math.min(slideCount - 1, index)));
  };

  const moveBy = (direction: 1 | -1) => {
    if (!isEnabled || transitionLock.current) {
      return;
    }

    const currentStep = stepsRef.current[activeIndex] ?? 0;
    const currentStepCount = slides[activeIndex]?.stepCount ?? 1;

    if (direction === 1 && currentStep < currentStepCount - 1) {
      transitionLock.current = true;
      setStep(activeIndex, currentStep + 1);
      releaseLock();
      return;
    }

    if (direction === -1 && currentStep > 0) {
      transitionLock.current = true;
      setStep(activeIndex, currentStep - 1);
      releaseLock();
      return;
    }

    setActiveIndex((current) => {
      const next = Math.max(0, Math.min(slideCount - 1, current + direction));

      if (next === current) {
        return current;
      }

      transitionLock.current = true;
      releaseLock();
      return next;
    });
  };

  useEffect(() => {
    const desktopMedia = window.matchMedia(DESKTOP_MEDIA);
    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_MEDIA);

    const syncMode = () => {
      const nextEnabled = desktopMedia.matches && !reducedMotionMedia.matches;
      setIsEnabled(nextEnabled);

      if (!nextEnabled) {
        transitionLock.current = false;
        setActiveIndex(0);
      }
    };

    syncMode();

    desktopMedia.addEventListener("change", syncMode);
    reducedMotionMedia.addEventListener("change", syncMode);

    return () => {
      desktopMedia.removeEventListener("change", syncMode);
      reducedMotionMedia.removeEventListener("change", syncMode);
    };
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    const page = deck?.closest("main.page");

    if (!page) {
      return;
    }

    if (isEnabled) {
      page.setAttribute("data-home-deck", "true");
      document.documentElement.setAttribute("data-home-deck", "true");
      document.body.setAttribute("data-home-deck", "true");
    } else {
      page.removeAttribute("data-home-deck");
      document.documentElement.removeAttribute("data-home-deck");
      document.body.removeAttribute("data-home-deck");
    }

    return () => {
      page.removeAttribute("data-home-deck");
      document.documentElement.removeAttribute("data-home-deck");
      document.body.removeAttribute("data-home-deck");
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 24) {
        return;
      }

      const targetNode = event.target instanceof Node ? event.target : null;
      const activeScroller = slideScrollRefs.current[activeIndex];

      if (canScrollActiveSlide(event.deltaY)) {
        if (targetNode && activeScroller?.contains(targetNode)) {
          return;
        }

        event.preventDefault();
        activeScroller?.scrollBy({
          top: event.deltaY,
          behavior: "auto"
        });
        return;
      }

      event.preventDefault();
      wheelIntent.current += event.deltaY;

      if (wheelResetTimer.current !== null) {
        window.clearTimeout(wheelResetTimer.current);
      }

      wheelResetTimer.current = window.setTimeout(() => {
        wheelIntent.current = 0;
      }, 160);

      if (Math.abs(wheelIntent.current) < WHEEL_STEP_THRESHOLD) {
        return;
      }

      const direction = wheelIntent.current > 0 ? 1 : -1;
      wheelIntent.current = 0;
      moveBy(direction);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;

      if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey)
      ) {
        event.preventDefault();

        if (scrollActiveSlide(window.innerHeight * 0.72)) {
          return;
        }

        moveBy(1);
        return;
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey)
      ) {
        event.preventDefault();

        if (scrollActiveSlide(window.innerHeight * -0.72)) {
          return;
        }

        moveBy(-1);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        transitionLock.current = false;
        setActiveIndex(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        transitionLock.current = false;
        setActiveIndex(slideCount - 1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartY.current === null) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - endY;

      touchStartY.current = null;

      if (Math.abs(delta) < 48) {
        return;
      }

      if (scrollActiveSlide(delta)) {
        return;
      }

      moveBy(delta > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      if (wheelResetTimer.current !== null) {
        window.clearTimeout(wheelResetTimer.current);
      }

      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isEnabled, slideCount]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const activeScroller = slideScrollRefs.current[activeIndex];

    if (activeScroller) {
      activeScroller.scrollTop = 0;
    }
  }, [activeIndex, isEnabled]);

  const slideStatus = useMemo(
    () => ({
      current: String(activeIndex + 1).padStart(2, "0"),
      total: String(slideCount).padStart(2, "0")
    }),
    [activeIndex, slideCount]
  );

  const contextValue = useMemo(
    () => ({
      activeIndex,
      goTo,
      isEnabled,
      slideCount,
      steps,
      setStep
    }),
    [activeIndex, isEnabled, slideCount, steps]
  );

  return (
    <HomeSlideDeckContext.Provider value={contextValue}>
      <div className="home-slide-deck" data-enabled={isEnabled} ref={deckRef}>
        <div
          className="home-slide-track"
          style={
            isEnabled
              ? { transform: `translate3d(0, -${activeIndex * 100}svh, 0)` }
              : undefined
          }
        >
          {slides.map((slide, index) => (
            <section
              aria-hidden={isEnabled && activeIndex !== index}
              className="home-slide"
              data-active={activeIndex === index}
              id={slide.id}
              key={slide.id}
            >
              <div
                className="home-slide-scroll"
                ref={(node) => {
                  slideScrollRefs.current[index] = node;
                }}
              >
                {slide.content}
              </div>
            </section>
          ))}
        </div>

        {overlay}

        {isEnabled ? (
          <div className="home-slide-status" aria-hidden="true">
            <span className="mono">{slideStatus.current}</span>
            <span className="home-slide-status-divider" />
            <span className="mono">{slideStatus.total}</span>
          </div>
        ) : null}
      </div>
    </HomeSlideDeckContext.Provider>
  );
}
