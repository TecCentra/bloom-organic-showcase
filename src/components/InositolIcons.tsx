import type { ReactNode } from "react";

/**
 * Inline SVG icons taken 1:1 from the Inositol+ PDP mockup (24x24 grid unless noted).
 * Stroke icons inherit `currentColor`, so colour is set in InositolProductPage.css.
 */
type IconProps = { size?: number; strokeWidth?: number; className?: string };

type StrokeProps = IconProps & { viewBox?: string; children: ReactNode };

const Stroke = ({ size = 20, strokeWidth = 2, className, viewBox = "0 0 24 24", children }: StrokeProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 018 0v3" />
  </Stroke>
);

export const LeafIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" />
    <path d="M5 19c3-5 6-8 10-10" />
  </Stroke>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Stroke>
);

export const BoxIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
    <path d="M3 7l9 4 9-4M12 11v10" />
  </Stroke>
);

export const TruckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 6h11v10H3z" />
    <path d="M14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Stroke>
);

export const CardIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </Stroke>
);

export const PhoneIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </Stroke>
);

export const ClockIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Stroke>
);

export const GiftIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="9" width="18" height="11" rx="1.5" />
    <path d="M3 13h18M12 9v11M12 9c-3 0-5-1-5-3s3-2.5 5 1c2-3.5 5-3 5-1s-2 3-5 3z" />
  </Stroke>
);

export const CheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Stroke>
);

export const CrossIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
);

export const VerifiedIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.7 2.7L16 9.5" />
  </Stroke>
);

export const WavesIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" />
  </Stroke>
);

export const BoltIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M13 3L5 14h6l-1 7 8-11h-6z" />
  </Stroke>
);

export const CalendarIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 3v4M16 3v4" />
  </Stroke>
);

export const CalendarCheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 3v4M16 3v4M9 15l2 2 4-4" />
  </Stroke>
);

export const BatteryIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="8" width="16" height="9" rx="2" />
    <path d="M21 11v3M7 12.5h5" />
  </Stroke>
);

export const MirrorIcon = (p: IconProps) => (
  <Stroke {...p}>
    <ellipse cx="12" cy="10" rx="6" ry="7" />
    <path d="M12 17v4M9 21h6M9 7.5c1-1.2 2.2-1.6 3.5-1.5" />
  </Stroke>
);

export const MoonIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
  </Stroke>
);

export const SparkleIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  </Stroke>
);

export const HairIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M8 4c-2 4 2 6 0 10M12 4c-2 4 2 6 0 10M16 4c-2 4 2 6 0 10" />
  </Stroke>
);

export const HeartIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
  </Stroke>
);

export const DropIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3C8 8 6 11 6 14a6 6 0 0012 0c0-3-2-6-6-11z" />
  </Stroke>
);

/** Down arrow used between the three root-cause steps (24x28 grid). */
export const ArrowDownIcon = ({ size = 24, strokeWidth = 2.2, className }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={(size * 28) / 24}
    viewBox="0 0 24 28"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 4v18M6 16l6 6 6-6" />
  </svg>
);

/** Filled sage circle with a white tick, used for the four hero bullets. */
export const CheckDotIcon = ({ size = 20, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="12" fill="#2C5E43" />
    <path d="M7 12l3.5 3.5 6.5-7" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StarFilledIcon = ({ size = 16, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="#E0A526" aria-hidden="true" focusable="false">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);

export const QuoteIcon = ({ size = 22, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="#C9B8AC" aria-hidden="true" focusable="false">
    <path d="M4 18v-5c0-4 2-7 6-8l.6 1.6C8.6 7.4 8 9 8 11h3v7zm9 0v-5c0-4 2-7 6-8l.6 1.6C17.6 7.4 17 9 17 11h3v7z" />
  </svg>
);
