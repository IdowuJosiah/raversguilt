import type { CSSProperties } from "react";

interface Circle {
  cx: number;
  cy: number;
  r: number;
}

interface LiquidFieldProps {
  style?: CSSProperties;
  fill: string;
  opacity: number;
  circles: Circle[];
  /** CSS animation-delay, e.g. "-7s" */
  delay?: string;
  className?: string;
}

/**
 * One goo-filtered blob group. Renders an SVG absolutely positioned
 * within a `position:relative` parent. Gate drift animation via
 * the global `.liquid` CSS class.
 */
export default function LiquidField({
  style,
  fill,
  opacity,
  circles,
  delay,
  className = "liquid",
}: LiquidFieldProps) {
  return (
    <svg
      className={className}
      style={{ ...style, animationDelay: delay }}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <g filter="url(#goo)" fill={fill} opacity={opacity}>
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
        ))}
      </g>
    </svg>
  );
}
