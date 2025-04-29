import React, { CSSProperties, useState } from "react";
import { useMouseMove } from "../hooks/useMouseMove";
import { getCursorPositionRatio } from "../utils";
import {
  CursorChangeEvent,
  CursorData,
  CursorHandler,
  MouseEvents,
} from "../types";
import { MyCursor } from "./MyCursor";
import { OtherCursor, OtherCursorProps } from "./OtherCursor";
import { ROOT_CLASS_NAME } from "../const";

export type CursorsProps<Handler extends CursorHandler> =
  MouseEvents<HTMLDivElement> & {
    userName?: string;
    cursorsOption?: {
      me?: {
        visible?: boolean;
      };
    };
    cursors: Record<string, CursorData>;
    onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    style?: CSSProperties;
    useAbsolutePosition?: boolean;
    offsetX?: number;
    offsetY?: number;
    beforeSaveCurrentPosition?: (event: CursorChangeEvent) => CursorChangeEvent;
    beforeRenderOtherCursor?: OtherCursorProps["beforeRenderOtherCursor"];
    children?: React.ReactNode;
    cursorHandler?: Handler;
    currentUserId: string | null | undefined;
    scrollPosition: {
      x: number;
      y: number;
    };
  };

export function Cursors<Handler extends CursorHandler>({
  userName = "",
  cursorsOption = { me: { visible: true } },
  cursors,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  useAbsolutePosition = false,
  offsetX,
  offsetY,
  beforeSaveCurrentPosition,
  beforeRenderOtherCursor,
  children,
  cursorHandler,
  currentUserId,
  scrollPosition,
  ...props
}: CursorsProps<Handler>) {
  const [myComment, setMyComment] = useState<string>("");
  const { pos, visible, setVisible, setPositionOnMouseMove } = useMouseMove(
    currentUserId,
    (e) => {
      if (beforeSaveCurrentPosition) {
        e = beforeSaveCurrentPosition(e);
      }
      cursorHandler?.onCursorPositionChanged(e);
    },
    userName,
    myComment
  );
  return (
    <div
      className={ROOT_CLASS_NAME}
      {...props}
      onMouseMove={(e) => {
        setPositionOnMouseMove(e);
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        setVisible(false);
        onMouseLeave?.(e);
      }}
      onMouseEnter={(e) => {
        setVisible(true);
        onMouseEnter?.(e);
      }}
    >
      {Object.values(cursors).map((cursor) => (
        <OtherCursor
          key={cursor.id}
          {...cursor}
          useAbsolutePosition={useAbsolutePosition}
          offsetX={scrollPosition.x}
          offsetY={scrollPosition.y}
          beforeRenderOtherCursor={beforeRenderOtherCursor}
        />
      ))}
      {cursorsOption?.me?.visible && currentUserId && (
        <MyCursor
          id={currentUserId}
          x={pos.x}
          y={pos.y}
          offsetX={scrollPosition.x}
          offsetY={scrollPosition.y}
          visible={visible}
          userName={userName}
          onCommentUpdated={(data) => {
            const { ratioX, ratioY } = getCursorPositionRatio(data.x, data.y);
            cursorHandler?.onCursorPositionChanged({
              ...data,
              ratioX,
              ratioY,
            });
            setMyComment(data.comment ?? "");
          }}
        />
      )}
      {children}
    </div>
  );
}
