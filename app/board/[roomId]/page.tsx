import React from "react";
import Room from "@/components/liveblocks/Room";

export default function BoardRoom({ params }: { params: { roomId: string } }) {
  return (
    <div className="px-2 h-screen relative overflow-hidden">
      {/* <svg
        // className="react-flow__background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        <pattern
          id="pattern-1"
          x="2.703155743628832"
          y="3.488083027234495"
          width="10.000000000000016"
          height="10.000000000000016"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(-0.2500000000000004,-0.2500000000000004)"
        >
          <circle
            cx="0.2500000000000004"
            cy="0.2500000000000004"
            r="0.2500000000000004"
            fill="#91919a"
          ></circle>
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-1)"
        ></rect>
      </svg> */}

      <Room roomId={params.roomId} />
    </div>
  );
}
