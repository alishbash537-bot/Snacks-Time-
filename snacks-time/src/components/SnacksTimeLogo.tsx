import React from 'react';

interface SnacksTimeLogoProps {
  className?: string;
  height?: number | string;
}

export default function SnacksTimeLogo({ className = "h-10", height }: SnacksTimeLogoProps) {
  return (
    <svg
      viewBox="0 0 350 110"
      className={className}
      style={height ? { height } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="snacks-time-logo"
    >
      {/* BURGER ICON */}
      <g id="burger-graphic">
        {/* Top Bun */}
        <path
          d="M16 48 C16 26 34 16 55 16 C76 16 94 26 94 48 H16 Z"
          fill="#F08E2D"
        />
        {/* Top Bun Highlight */}
        <path
          d="M26 32 C32 24 46 22 46 22"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Patty */}
        <rect
          x="15"
          y="56"
          width="80"
          height="12"
          rx="6"
          fill="#BD1C24"
        />

        {/* Cheese Melting down-right */}
        <path
          d="M20 56 H90 L68 67 C64 69 60 66 58 62 L45 56 Z"
          fill="#FFC01E"
        />

        {/* Bottom Bun */}
        <path
          d="M16 74 H94 C94 85 80 92 55 92 C30 92 16 85 16 74 Z"
          fill="#F08E2D"
        />
      </g>

      {/* TYPOGRAPHY */}
      <g id="logo-text">
        <text
          x="110"
          y="53"
          fill="#BD1C24"
          fontSize="42"
          fontWeight="900"
          fontFamily="Epilogue, var(--font-heading), sans-serif"
          letterSpacing="-1"
          style={{ textTransform: 'uppercase' }}
        >
          SNACKS
        </text>
        <text
          x="110"
          y="89"
          fill="#F08E2D"
          fontSize="42"
          fontWeight="900"
          fontFamily="Epilogue, var(--font-heading), sans-serif"
          letterSpacing="-1"
          style={{ textTransform: 'uppercase' }}
        >
          TIME
        </text>
      </g>
    </svg>
  );
}
