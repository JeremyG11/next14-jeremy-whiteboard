"use client";

import type React from "react";
import { useState } from "react";
import { colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import ContentEditable from "react-contenteditable";
import type { NoteLayer } from "@/lib/liveblock/types";

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export function Note({ id, layer, onPointerDown, selectionColor }: NoteProps) {
  const { x, y, width, height, fill, value } = layer;
  const [isEditing, setIsEditing] = useState(false);

  const updateValue = useMutation(
    ({ storage }, newValue: string) => {
      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(id);

      if (layer) {
        layer.update({
          value: newValue,
        });
      }
    },
    [id]
  );

  const handleContentChange = (e: any) => {
    updateValue(e.target.value);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => {
        if (!isEditing) {
          onPointerDown(e, id);
        }
      }}
      style={{
        outline: selectionColor ? `2px solid ${selectionColor}` : "none",
      }}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className="h-full w-full p-2 bg-yellow-100 rounded-md shadow-md overflow-auto"
        style={{
          backgroundColor: fill ? colorToCss(fill) : "#FEF3C7",
          maxWidth: "100%",
        }}
      >
        <ContentEditable
          html={value || "Add a note..."}
          onChange={handleContentChange}
          onBlur={handleBlur}
          className="h-full w-full outline-none"
          style={{
            cursor: isEditing ? "text" : "move",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            maxWidth: "100%",
            display: "block",
          }}
          disabled={!isEditing}
        />
      </div>
    </foreignObject>
  );
}
