import { Fragment } from "react";
import { marqueeRows } from "@/data/content";

/** Two counter-scrolling bands of the stack. Pauses on hover. */
export function Marquee() {
  return (
    <section className="marquee" aria-label="Technologies I work with">
      {marqueeRows.map((row, rowIndex) => (
        <div key={rowIndex} className={`marquee-row${rowIndex % 2 ? " reverse" : ""}`}>
          {/* The track is rendered twice so the loop is seamless. */}
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-track" aria-hidden={copy === 1}>
              {row.map((item, i) => (
                <Fragment key={item}>
                  <span className={i % 2 ? "outline" : undefined}>{item}</span>
                  <i aria-hidden="true">✦</i>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
