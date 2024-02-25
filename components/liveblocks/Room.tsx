"use client";
import React from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import Canvas from "./Canvas";
import Loading from "./Loading";
import { Layer } from "@/lib/liveblock/types";
import { RoomProvider } from "@/liveblocks.config";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";

export default function Room({ roomId }: { roomId: string }) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        selection: [],
        cursor: null,
        pencilDraft: null,
        penColor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <div className="h-full">
        <ClientSideSuspense fallback={<Loading />}>
          {() => <Canvas roomId={roomId} />}
        </ClientSideSuspense>
      </div>
    </RoomProvider>
  );
}
