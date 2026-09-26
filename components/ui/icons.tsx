import React from "react";

export type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const Svg: React.FC<IconProps & { children: React.ReactNode }> = ({
  className = "h-5 w-5",
  strokeWidth = 1.75,
  children,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

export const IconHome: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M3.2 10.6L12 3.4l8.8 7.2" />
    <path d="M5.4 9.6v10.9h13.2V9.6" />
    <path d="M9.8 20.5v-5.6h4.4v5.6" />
  </Svg>
);

export const IconCocktail: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M4.5 4.5h15L12 12.4z" />
    <path d="M12 12.4v6.6" />
    <path d="M8.3 19.5h7.4" />
  </Svg>
);

export const IconReport: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M14 3.5H7.5a2 2 0 00-2 2v13a2 2 0 002 2h9a2 2 0 002-2V8z" />
    <path d="M14 3.5V8h4.5" />
    <path d="M9 13h6M9 16.5h4" />
  </Svg>
);

export const IconChart: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M4 20h16" />
    <path d="M7.5 20v-7M12 20V5.5M16.5 20v-4.5" />
  </Svg>
);

export const IconBanknote: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="6.5" width="19" height="11" rx="2.2" />
    <circle cx="12" cy="12" r="2.4" />
    <path d="M6 12h.01M18 12h.01" />
  </Svg>
);

export const IconCoins: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <ellipse cx="12" cy="6.6" rx="6.8" ry="2.9" />
    <path d="M5.2 6.6v5c0 1.6 3 2.9 6.8 2.9s6.8-1.3 6.8-2.9v-5" />
    <path d="M5.2 11.6v5c0 1.6 3 2.9 6.8 2.9s6.8-1.3 6.8-2.9v-5" />
  </Svg>
);

export const IconCard: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.4" />
    <path d="M2.5 10h19" />
    <path d="M6 14.5h3" />
  </Svg>
);

export const IconReceipt: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M6 3.5h12v17l-3-1.8-3 1.8-3-1.8-3 1.8z" />
    <path d="M9.2 8.5h5.6M9.2 12.5h5.6" />
  </Svg>
);

export const IconCalculator: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="5" y="3" width="14" height="18" rx="2.4" />
    <path d="M8.5 7.5h7" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" />
  </Svg>
);

export const IconUserPlus: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="10" cy="8" r="3.6" />
    <path d="M3.6 20.2a6.6 6.6 0 0112.8 0" />
    <path d="M18.6 8v5M16.1 10.5h5" />
  </Svg>
);

export const IconUser: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="8.4" r="3.7" />
    <path d="M4.8 20.4a7.4 7.4 0 0114.4 0" />
  </Svg>
);

export const IconLogout: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M14.5 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3" />
    <path d="M9.5 8.2L5.7 12l3.8 3.8" />
    <path d="M5.7 12h8.3" />
  </Svg>
);

export const IconMenu: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconClose: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
  </Svg>
);

export const IconChevronDown: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M6 9.5l6 6 6-6" />
  </Svg>
);

export const IconChevronRight: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M9.5 6l6 6-6 6" />
  </Svg>
);

export const IconSearch: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="M15.8 15.8L20.5 20.5" />
  </Svg>
);

export const IconPlus: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Svg>
);

export const IconMinus: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M5.5 12h13" />
  </Svg>
);

export const IconCalendar: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.4" />
    <path d="M8 3.5v3.2M16 3.5v3.2M3.5 10h17" />
  </Svg>
);

export const IconFilter: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M4 6h16l-6.2 7.2v5.3l-3.6 1.8v-7.1z" />
  </Svg>
);

export const IconCheckCircle: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M8.2 12.4l2.6 2.6 5-5.4" />
  </Svg>
);

export const IconXCircle: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" />
  </Svg>
);

export const IconInfo: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 11.2v5M12 8h.01" />
  </Svg>
);

export const IconWarning: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M12 4l8.6 15.5H3.4z" />
    <path d="M12 10v4M12 17h.01" />
  </Svg>
);

export const IconPencil: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M4 20h4L19 9l-4-4L4 16z" />
    <path d="M14.5 5.5l4 4" />
  </Svg>
);

export const IconTrash: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M4 7h16" />
    <path d="M9.5 7V4.5h5V7" />
    <path d="M6.5 7l.9 13h9.2l.9-13" />
  </Svg>
);

export const IconMail: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
    <path d="M3.2 6.6L12 13l8.8-6.4" />
  </Svg>
);

export const IconLock: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="5" y="10.4" width="14" height="10.1" rx="2.4" />
    <path d="M8.4 10.4V8a3.6 3.6 0 017.2 0v2.4" />
  </Svg>
);

export const IconClock: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3.2 2" />
  </Svg>
);

export const IconArrowRight: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </Svg>
);

export const IconImage: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="3.5" y="5" width="17" height="14" rx="2.4" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M4.5 17l4.8-4.4 3.4 3 2.6-2.2 4.2 3.6" />
  </Svg>
);

export const IconNote: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M5 4.5h14v15H5z" />
    <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4" />
  </Svg>
);

export const IconTag: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M12.6 3.5H20.5v7.9L11.4 20.5 3.5 12.6z" />
    <path d="M16.6 7.4h.01" />
  </Svg>
);
