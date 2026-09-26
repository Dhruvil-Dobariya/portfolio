import { useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  Braces,
  Check,
  Database,
  Globe2,
  Layers3,
  LockKeyhole,
  Radio,
  Smartphone,
} from "lucide-react";

const layers = [
  {
    label: "Experience",
    title: "Built for people.",
    text: "React on the web. React Native in your hand.",
  },
  {
    label: "Logic",
    title: "Connected by design.",
    text: "Typed APIs, secure access, and reliable business logic.",
  },
  {
    label: "Data",
    title: "Strong foundations.",
    text: "Relational schemas and queries built with care.",
  },
];

export function Workspace({ paused }: { paused: boolean }) {
  const [active, setActive] = useState(0);
  const scene = useRef<HTMLDivElement>(null);
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (paused || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--pointer-x",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 7}deg`,
    );
    scene.current?.style.setProperty(
      "--pointer-y",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * -5}deg`,
    );
  };
  const keyChange = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`layer-${next}`)?.focus();
  };
  return (
    <div
      className="workspace"
      onPointerMove={tilt}
      onPointerLeave={() => {
        scene.current?.style.setProperty("--pointer-x", "0deg");
        scene.current?.style.setProperty("--pointer-y", "0deg");
      }}
    >
      <div className="workspace-caption">
        <span>FIG. 01</span>
        <span>THE CONNECTED STACK</span>
        <ArrowUpRight size={15} />
      </div>
      <div
        className={`workspace-scene layer-active-${active}`}
        ref={scene}
        aria-hidden="true"
      >
        <div className="workspace-grid" />
        <div className="stack-shadow" />
        <div className="stack-assembly">
          <div
            className={`stack-plane data-plane${active === 2 ? " selected" : ""}`}
          >
            <div className="plane-header">
              <Database size={16} />
              <span>DATA / FOUNDATION</span>
              <span>03</span>
            </div>
            <div className="data-content">
              <div className="data-cylinder">
                <i />
                <i />
                <i />
                <Database size={31} />
              </div>
              <div className="data-tables">
                <span>
                  users <i />
                  <i />
                  <i />
                </span>
                <span>
                  transactions <i />
                  <i />
                  <i />
                </span>
                <span>
                  relationships <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
            <div className="plane-footer">
              <span>PostgreSQL</span>
              <span>SCHEMA → QUERY → INSIGHT</span>
            </div>
          </div>
          <div
            className={`stack-plane logic-plane${active === 1 ? " selected" : ""}`}
          >
            <div className="plane-header">
              <Braces size={17} />
              <span>LOGIC / ENGINE</span>
              <span>02</span>
            </div>
            <div className="logic-services">
              <div>
                <LockKeyhole size={24} />
                <span>Auth</span>
              </div>
              <i />
              <div>
                <Braces size={26} />
                <span>API</span>
              </div>
              <i />
              <div>
                <Radio size={24} />
                <span>Events</span>
              </div>
            </div>
            <div className="plane-footer">
              <span>NestJS + GraphQL</span>
              <span>
                <i /> CONNECTED SERVICES
              </span>
            </div>
          </div>
          <div
            className={`stack-plane interface-plane${active === 0 ? " selected" : ""}`}
          >
            <div className="plane-header">
              <Globe2 size={16} />
              <span>EXPERIENCE / INTERFACE</span>
              <span>01</span>
            </div>
            <div className="interface-body">
              <div className="interface-rail">
                <Layers3 size={18} />
                <i />
                <i />
                <i />
              </div>
              <div className="interface-main">
                <div className="interface-title">
                  <span>Built to connect.</span>
                  <ArrowUpRight size={21} />
                </div>
                <div className="interface-chart">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="interface-bottom">
                  <span>
                    <Check size={11} /> Web
                  </span>
                  <span>
                    <Smartphone size={11} /> Mobile
                  </span>
                  <i />
                </div>
              </div>
            </div>
            <div className="plane-footer">
              <span>React + React Native</span>
              <span>ONE CONNECTED EXPERIENCE</span>
            </div>
          </div>
        </div>
        <span className="plane-marker marker-one">
          01 <i /> INTERFACE
        </span>
        <span className="plane-marker marker-two">
          02 <i /> SERVICES
        </span>
        <span className="plane-marker marker-three">
          03 <i /> FOUNDATION
        </span>
        <div className="scene-axis">
          <span>Y</span>
          <i />
          <span>X</span>
        </div>
      </div>
      <div className="workspace-controls">
        <div
          className="layer-tabs"
          role="tablist"
          aria-label="Explore the software layers"
        >
          {layers.map((layer, index) => (
            <button
              role="tab"
              id={`layer-${index}`}
              key={layer.label}
              aria-selected={active === index}
              aria-controls="layer-description"
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => keyChange(event, index)}
            >
              <span>0{index + 1}</span>
              {layer.label}
            </button>
          ))}
        </div>
        <div
          id="layer-description"
          role="tabpanel"
          aria-labelledby={`layer-${active}`}
          tabIndex={0}
          className="layer-description"
        >
          <strong>{layers[active].title}</strong>
          <span>{layers[active].text}</span>
        </div>
      </div>
    </div>
  );
}
