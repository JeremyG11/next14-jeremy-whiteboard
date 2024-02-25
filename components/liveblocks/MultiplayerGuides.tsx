import React from "react";
import { shallow } from "@liveblocks/client";
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import Path from "./Path";
import { colorToCss } from "@/lib/utils";
import { Cursor } from "./Cursors";

function Cursors() {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
}

function Drafts() {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );
  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#CCC"}
            />
          );
        }
        return null;
      })}
    </>
  );
}

export default React.memo(function MultiplayerGuides() {
  return (
    <>
      <Cursors />
      <Drafts />
    </>
  );
});
