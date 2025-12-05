"use client";

import type React from "react";
import { colorToCss } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import type { TextLayer } from "@/lib/liveblock/types";
import { useMutation } from "@/liveblocks.config";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export function Text({ id, layer, onPointerDown, selectionColor }: TextProps) {
  const { x, y, width, height, fill, value } = layer;
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [localValue, setLocalValue] = useState(value || "Text");

  // Minimum dimensions for the text container
  const MIN_WIDTH = 100;
  const MIN_HEIGHT = 50;
  const MAX_WIDTH = 800;

  const updateLayer = useMutation(
    ({ storage }, updates: Partial<TextLayer>) => {
      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(id);

      if (layer) {
        layer.update(updates);
      }
    },
    [id]
  );

  const updateValue = useMutation(
    ({ storage }, newValue: string) => {
      setLocalValue(newValue);
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

  // Function to measure and update container size
  const updateContainerSize = () => {
    if (!contentRef.current) return;

    // Create a hidden div to measure text dimensions
    const measureDiv = document.createElement("div");
    measureDiv.style.position = "absolute";
    measureDiv.style.visibility = "hidden";
    measureDiv.style.width = `${Math.min(width, MAX_WIDTH)}px`; // Use current width as constraint
    measureDiv.style.whiteSpace = "pre-wrap";
    measureDiv.style.wordBreak = "break-word";
    measureDiv.style.overflowWrap = "break-word";
    measureDiv.style.fontSize = `${Math.max(
      Math.min(width, height) / 5,
      12
    )}px`;
    measureDiv.innerHTML = localValue || "Text";

    document.body.appendChild(measureDiv);

    // Get the content dimensions
    const contentWidth = Math.max(measureDiv.offsetWidth, MIN_WIDTH);
    const contentHeight = Math.max(measureDiv.offsetHeight, MIN_HEIGHT);

    // Remove the measuring div
    document.body.removeChild(measureDiv);

    // Only update if dimensions have changed significantly
    if (Math.abs(contentHeight - height) > 10) {
      updateLayer({
        height: contentHeight + 20, // Add padding
      });
    }
  };

  // Update container size when value changes
  useEffect(() => {
    if (isEditing) {
      updateContainerSize();
    }
  }, [localValue, isEditing]);

  const handleContentChange = (e: any) => {
    updateValue(e.target.value);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateContainerSize(); // Final size adjustment when done editing
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
        ref={contentRef}
        className="h-full w-full flex flex-col items-center justify-center"
        style={{
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <ContentEditable
          html={localValue}
          onChange={handleContentChange}
          onBlur={handleBlur}
          className="w-full outline-none drop-shadow-md px-2 text-center"
          style={{
            fontSize: `${Math.max(Math.min(width, height) / 5, 12)}px`,
            color: fill ? colorToCss(fill) : "#000",
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
