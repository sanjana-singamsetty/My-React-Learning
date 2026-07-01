import React from "react";
import {
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
} from "@xyflow/react";

const DUR = "2s";
const SPLINE_PROPS = {
  calcMode: "spline" as const,
  keyTimes: "0;1",
  keySplines: "0.42 0 0.58 1",
};

export default function AnimatedPacketEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    animated,
    label,
  } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const dotColor = animated ? "#6366f1" : "#94a3b8";

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />

      {animated && (
        <>
          {/* Expanding ripple ring */}
          <circle r={0} fill="none" stroke={dotColor} strokeWidth={2.5}>
            <animate attributeName="r" values="0;22" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.65;0" dur="1.2s" repeatCount="indefinite" />
            <animateMotion dur={DUR} repeatCount="indefinite" {...SPLINE_PROPS}>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <mpath xlinkHref={`#${id}`} />
            </animateMotion>
          </circle>

          {/* Soft glow halo */}
          <circle r={11} fill={dotColor} opacity={0.14}>
            <animateMotion dur={DUR} repeatCount="indefinite" {...SPLINE_PROPS}>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <mpath xlinkHref={`#${id}`} />
            </animateMotion>
          </circle>

          {/* Main dot with bloom */}
          <circle r={6.5} fill={dotColor} style={{ filter: `drop-shadow(0 0 8px ${dotColor}) drop-shadow(0 0 3px ${dotColor})` }}>
            <animateMotion dur={DUR} repeatCount="indefinite" {...SPLINE_PROPS}>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <mpath xlinkHref={`#${id}`} />
            </animateMotion>
          </circle>

          {/* White inner spark */}
          <circle r={2.5} fill="#fff">
            <animateMotion dur={DUR} repeatCount="indefinite" {...SPLINE_PROPS}>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <mpath xlinkHref={`#${id}`} />
            </animateMotion>
          </circle>
        </>
      )}

      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 10.5,
              fontWeight: 600,
              background: animated ? "#ede9fe" : "#f8fafc",
              border: `1px solid ${animated ? "#a5b4fc" : "#e2e8f0"}`,
              padding: "2px 8px",
              borderRadius: 999,
              color: animated ? "#4f46e5" : "#64748b",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {label as string}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
