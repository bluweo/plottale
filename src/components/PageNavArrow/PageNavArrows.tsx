"use client";

import { usePathname } from "next/navigation";
import { PageNavArrow } from "./PageNavArrow";

const NAV_MAP: Record<string, { direction: "left" | "right"; href: string }[]> = {
  "/admin": [{ direction: "right", href: "/showcase" }],
  "/showcase": [
    { direction: "left", href: "/admin" },
    { direction: "right", href: "/home/design-system" },
  ],
  "/home/design-system": [{ direction: "left", href: "/showcase" }],
};

export function PageNavArrows() {
  const pathname = usePathname();
  const arrows = NAV_MAP[pathname];

  if (!arrows) return null;

  return (
    <>
      {arrows.map((a) => (
        <PageNavArrow key={a.direction} direction={a.direction} href={a.href} />
      ))}
    </>
  );
}
