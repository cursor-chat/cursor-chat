import { DOMAttributes } from "react";

export type CursorData = {
  id: string;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  ratioX: number;
  ratioY: number;
  userName?: string;
  comment?: string;
  meta?: Record<string, any>;
};

export type CursorChangeEvent = Omit<CursorData, "offsetX" | "offsetY"> & {
  ratioX: number;
  ratioY: number;
};

export type MouseEvents<T> = Pick<
  DOMAttributes<T>,
  | "onAuxClick"
  | "onAuxClickCapture"
  | "onClick"
  | "onClickCapture"
  | "onContextMenu"
  | "onContextMenuCapture"
  | "onDoubleClick"
  | "onDoubleClickCapture"
  | "onDrag"
  | "onDragCapture"
  | "onDragEnd"
  | "onDragEndCapture"
  | "onDragEnter"
  | "onDragEnterCapture"
  | "onDragExit"
  | "onDragExitCapture"
  | "onDragLeave"
  | "onDragLeaveCapture"
  | "onDragOver"
  | "onDragOverCapture"
  | "onDragStart"
  | "onDragStartCapture"
  | "onDrop"
  | "onDropCapture"
  | "onMouseDown"
  | "onMouseDownCapture"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
  | "onMouseMoveCapture"
  | "onMouseOut"
  | "onMouseOutCapture"
  | "onMouseOver"
  | "onMouseOverCapture"
  | "onMouseUp"
  | "onMouseUpCapture"
>;

export type CursorHandler = {
  onCursorPositionChanged: (event: CursorChangeEvent) => void;
};
