import type { CSSProperties } from "react";

export const LOADING_EXIT_MS = 350;

interface LoadingScreenProps {
  exiting?: boolean;
  elapsedMs?: number;
}

export function LoadingScreen({ exiting = false, elapsedMs = 0 }: LoadingScreenProps) {
  return (
    <div
      className="portfolio-loader"
      data-exiting={exiting || undefined}
      style={
        {
          "--portfolio-loader-offset": `${-elapsedMs}ms`,
          "--portfolio-loader-exit-duration": `${LOADING_EXIT_MS}ms`,
        } as CSSProperties
      }
    >
      <div className="portfolio-loader__identity">
        <svg className="portfolio-loader__mark" viewBox="0 0 160 112" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter">
            <path className="portfolio-loader__stroke" pathLength="1" d="M12 96 46 16 80 96" />
            <path className="portfolio-loader__stroke portfolio-loader__stroke--crossbar" pathLength="1" d="M29 64H80" />
            <path className="portfolio-loader__stroke portfolio-loader__stroke--stem" pathLength="1" d="M80 96V16" />
            <path className="portfolio-loader__stroke portfolio-loader__stroke--bowl" pathLength="1" d="M80 16H104C160 16 160 96 104 96H80" />
            <path className="portfolio-loader__join" pathLength="1" d="M68 64H92" />
          </g>
        </svg>
        <p className="portfolio-loader__name">Andika Dinata</p>
        <p className="portfolio-loader__status" role="status" aria-live="polite">
          <span className="portfolio-loader__indicator" aria-hidden="true" />
          Loading portfolio
        </p>
      </div>
    </div>
  );
}
