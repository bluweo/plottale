"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface PageNavArrowProps {
  direction: "left" | "right";
  href: string;
}

export function PageNavArrow({ direction, href }: PageNavArrowProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const isRight = direction === "right";

  const handleClick = useCallback(() => {
    const html = document.documentElement;
    const content = document.querySelector("[data-page-content]") as HTMLElement;

    // Suppress entry animations on the destination page
    html.setAttribute("data-navigated", "");

    if (content) {
      // Step 1: Slide current content out
      content.style.transition = "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)";
      content.style.transform = isRight ? "translateX(-8%)" : "translateX(8%)";
      content.style.opacity = "0";

      // Step 2: After slide-out, navigate and slide new content in
      setTimeout(() => {
        router.push(href);

        // Step 3: Position new content off-screen on the opposite side, then slide in
        requestAnimationFrame(() => {
          content.style.transition = "none";
          content.style.transform = isRight ? "translateX(8%)" : "translateX(-8%)";
          content.style.opacity = "0";

          // Force reflow so the position change is applied before animating
          content.offsetHeight;

          content.style.transition = "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)";
          content.style.transform = "translateX(0)";
          content.style.opacity = "1";
        });
      }, 300);
    } else {
      router.push(href);
    }
  }, [router, href, isRight]);

  return (
    <div
      className="fixed top-0 bottom-0 z-[200] w-[80px]"
      style={{ [isRight ? "right" : "left"]: 0 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <button
        onClick={handleClick}
        className="page-nav-arrow"
        style={{
          position: "absolute",
          top: "50%",
          [isRight ? "right" : "left"]: "12px",
          transform: "translateY(-50%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
        aria-label={`Navigate ${isRight ? "next" : "previous"} page`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="w-5 h-5"
          style={{ transform: isRight ? "none" : "scaleX(-1)" }}
        >
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
