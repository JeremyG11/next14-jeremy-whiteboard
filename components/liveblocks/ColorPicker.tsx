"use client";

import { useState } from "react";
import { colorToCss } from "@/lib/utils";
import { Color } from "@/lib/liveblock/types";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  const colors = [
    { r: 244, g: 82, b: 45 },
    { r: 255, g: 249, b: 177 },
    { r: 68, g: 202, b: 99 },
    { r: 49, g: 142, b: 247 },
    { r: 155, g: 105, b: 245 },
    { r: 252, g: 142, b: 42 },
    { r: 0, g: 0, b: 0 },
    { r: 255, g: 255, b: 255 },
  ];

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const handleChange = (color: Color) => {
    setCurrentColor(color);
    onChange(color);
  };

  return (
    <Menubar className="w-10 h-q0 flex  items-center shadow-none justify-center border-0 hover:bg-gray-100 transition-all duration-400">
      <MenubarMenu>
        <MenubarTrigger className="p-1 rounded-full border-2">
          <ColorButton color={currentColor} onClick={handleChange} />
        </MenubarTrigger>
        <MenubarContent className="flex flex-wrap shadow-sm">
          {colors.map((color, index) => (
            <MenubarItem key={index}>
              <ColorButton color={color} onClick={() => handleChange(color)} />
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-4 h-4 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-4 w-4 rounded-full border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
};
