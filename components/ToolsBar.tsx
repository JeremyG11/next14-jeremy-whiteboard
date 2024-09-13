import {
  Circle,
  Pencil,
  Redo2,
  Square,
  Type,
  Undo2,
  StickyNote,
  MousePointer2,
} from "lucide-react";
import { ToolButton } from "./ToolButton";
import { Separator } from "@/components/ui/separator";
import { CanvasMode, CanvasState, LayerType } from "@/lib/liveblock/types";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const ToolsBar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white border rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-2xl xl:flex-row">
      <ToolButton
        label="Select"
        icon={MousePointer2}
        onClick={() =>
          setCanvasState({
            mode: CanvasMode.None,
          })
        }
        isActive={
          canvasState.mode === CanvasMode.None ||
          canvasState.mode === CanvasMode.Translating ||
          canvasState.mode === CanvasMode.SelectionNet ||
          canvasState.mode === CanvasMode.Pressing ||
          canvasState.mode === CanvasMode.Resizing
        }
      />
      <ToolButton
        label="Text"
        icon={Type}
        onClick={() =>
          setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Text,
          })
        }
        isActive={
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Text
        }
      />
      <ToolButton
        label="Sticky note"
        icon={StickyNote}
        onClick={() =>
          setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Note,
          })
        }
        isActive={
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Note
        }
      />
      <ToolButton
        label="Rectangle"
        icon={Square}
        onClick={() =>
          setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Rectangle,
          })
        }
        isActive={
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Rectangle
        }
      />
      <ToolButton
        label="Ellipse"
        icon={Circle}
        onClick={() =>
          setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Ellipse,
          })
        }
        isActive={
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Ellipse
        }
      />
      <ToolButton
        label="Pen"
        icon={Pencil}
        onClick={() =>
          setCanvasState({
            mode: CanvasMode.Pencil,
          })
        }
        isActive={canvasState.mode === CanvasMode.Pencil}
      />
      <Separator className="py-2.5 " orientation="vertical" />
      <ToolButton
        label="Undo"
        icon={Undo2}
        onClick={undo}
        isDisabled={!canUndo}
      />
      <ToolButton
        label="Redo"
        icon={Redo2}
        onClick={redo}
        isDisabled={!canRedo}
      />
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-red-600 h-[360px] w-[52px] shadow-md rounded-md" />
  );
};
