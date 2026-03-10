"use client";

import { BackgroundSystem } from "@/components/BackgroundSystem/BackgroundSystem";
import { CursorGlow } from "@/components/CursorGlow/CursorGlow";
import { LiquidGlassFilter } from "@/components/LiquidGlassFilter/LiquidGlassFilter";
import { ContextMenu } from "@/components/ContextMenu/ContextMenu";
import { BackgroundPicker } from "@/components/BackgroundPicker/BackgroundPicker";
import { AppearanceModal } from "@/components/AppearanceModal/AppearanceModal";
import { BackgroundProvider } from "@/context/BackgroundContext";
import { AppearanceProvider } from "@/context/AppearanceContext";
import { LanguageProvider } from "@/context/LanguageContext";
import type { Locale } from "@/lib/i18n";

export function AppShellProviders({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <LanguageProvider initialLocale={locale}>
      <BackgroundProvider>
        <AppearanceProvider>
          <LiquidGlassFilter />
          <BackgroundSystem />
          <CursorGlow />
          <ContextMenu />
          <BackgroundPicker />
          <AppearanceModal />
          <div data-page-content>{children}</div>
        </AppearanceProvider>
      </BackgroundProvider>
    </LanguageProvider>
  );
}
