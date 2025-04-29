import {
  Cursors,
  CursorsProps,
  MouseEvents,
  useCursors,
  useScrollPosition,
} from "@cursor-chat/core";
import { useEffect, useState } from "react";
import { SupabaseApp, SupabaseCursorHandler } from "../types";
import { createSupabaseHandler } from "../handler";

type Props = MouseEvents<HTMLDivElement> & {
  supabaseApp: SupabaseApp;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
} & Omit<
    CursorsProps<SupabaseCursorHandler>,
    | "currentUserId"
    | "cursorHandler"
    | "scrollPosition"
    | "cursorsOption"
    | "cursors"
  >;

export function CursorChat({
  supabaseApp,
  cursors: cursorsOption = { me: { visible: true } },
  ...props
}: Props) {
  const { cursors, handleCursor } = useCursors();
  const [handler, setHandler] = useState<SupabaseCursorHandler>();
  useEffect(() => {
    (async () => {
      setHandler(createSupabaseHandler(supabaseApp));
    })();
  }, [supabaseApp]);

  useEffect(() => {
    handler?.initialize(handleCursor);
  }, [handler, handleCursor]);

  const { scrollPosition } = useScrollPosition();

  return (
    <>
      {handler && (
        <Cursors
          {...props}
          cursors={cursors}
          cursorsOption={cursorsOption}
          currentUserId={supabaseApp.userId}
          scrollPosition={scrollPosition}
          cursorHandler={handler}
        />
      )}
    </>
  );
}
