"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function PostModalWrapper({
  children,
  modalWidth = 1100,
  modalHeight,
  isLoading = false,
}: {
  children: ReactNode;
  modalWidth?: number;
  modalHeight?: number | null;
  isLoading?: boolean;
}) {
  const router = useRouter();
  const close = useCallback(() => router.back(), [router]);

  /* Scroll lock + Escape key */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [close]);

  return createPortal(
    <div
      className="fixed inset-0 z-[900] flex items-center justify-center p-0 md:p-6"
      onClick={close}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(var(--glass-blur-overlay))",
          WebkitBackdropFilter: "blur(var(--glass-blur-overlay))",
        }}
      />

      {/* Modal panel */}
      <div
        className="relative w-full h-full md:h-auto overflow-hidden flex flex-col md:flex-row"
        style={{
          maxWidth: `${modalWidth}px`,
          transition:
            "max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          animation: "panelEnter 0.3s var(--ease-spring) both",
          borderRadius: "var(--glass-radius-lg)",
          background: "var(--glass-bg-strong)",
          backdropFilter:
            "blur(var(--glass-blur-strong)) saturate(var(--glass-saturation))",
          WebkitBackdropFilter:
            "blur(var(--glass-blur-strong)) saturate(var(--glass-saturation))",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          /* Loading spinner while image dimensions are being detected */
          <div className="flex items-center justify-center w-full min-h-[300px]">
            <div
              className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-white/20"
              style={{
                borderTopColor: "var(--glass-accent, #f59e0b)",
                animation: "spin 0.8s linear infinite",
              }}
            />
          </div>
        ) : (
          children
        )}
      </div>
    </div>,
    document.body,
  );
}
