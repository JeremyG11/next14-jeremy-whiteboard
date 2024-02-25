import React from "react";
import Room from "@/components/liveblocks/Room";

export default function BoardRoom({ params }: { params: { roomId: string } }) {
  return (
    <div className="px-2 h-screen relative overflow-hidden">
      {/* <ToolsBar /> */}
      <Room roomId={params.roomId} />
    </div>
  );
}
