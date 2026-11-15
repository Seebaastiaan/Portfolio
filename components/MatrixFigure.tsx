"use client";

import { useState } from "react";

const N = 9;
const CELL = 20;
const SIZE = N * CELL;
const cells = Array.from({ length: N * N }, (_, k) => ({
  row: Math.floor(k / N),
  col: k % N,
}));

/**
 * Fig. 0 — a dense symmetric matrix reduced to tridiagonal form, the result
 * of a Lanczos iteration (see Fig. 3). Entries far from the diagonal vanish
 * first; only the three-diagonal band survives.
 */
export default function MatrixFigure() {
  const [run, setRun] = useState(0);

  return (
    <figure className="max-w-[340px]">
      <div className="anno flex items-center justify-between">
        <span className="font-medium">Fig. 0</span>
        <span className="text-ink-soft">n = {N}</span>
      </div>

      <div className="frame mt-4 p-6">
        <i className="mark tl" />
        <i className="mark tr" />
        <i className="mark bl" />
        <i className="mark br" />
        <svg
          key={run}
          viewBox={`-10 -6 ${SIZE + 20} ${SIZE + 12}`}
          role="img"
          aria-label="A nine by nine matrix whose entries fade until only the three central diagonals remain."
          className="block w-full text-ink"
        >
          {/* Matrix brackets */}
          <path
            d={`M-2 -4 H-8 V${SIZE + 4} H-2`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d={`M${SIZE + 2} -4 H${SIZE + 8} V${SIZE + 4} H${SIZE + 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          {cells.map(({ row, col }) => {
            const distance = Math.abs(row - col);
            const inBand = distance <= 1;
            return (
              <rect
                key={`${row}-${col}`}
                x={col * CELL + 6.5}
                y={row * CELL + 6.5}
                width="7"
                height="7"
                fill="currentColor"
                className={inBand ? undefined : "mx-off"}
                style={
                  inBand
                    ? undefined
                    : ({ "--d": N - 1 - distance } as React.CSSProperties)
                }
              />
            );
          })}
        </svg>
      </div>

      <figcaption className="mt-5">
        <p className="anno text-ink-soft">
          A → T = QᵀAQ. A dense symmetric matrix reduced to its tridiagonal
          band. Detail in Fig. 3.
        </p>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="anno link mt-4 cursor-pointer"
        >
          ↻ Run again
        </button>
      </figcaption>
    </figure>
  );
}
