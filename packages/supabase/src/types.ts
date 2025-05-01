import { CursorChangeEvent } from "@cursor-chat/core";
import type { SupabaseClient } from "@supabase/supabase-js";

export type SupabaseCursorHandler = {
  initialize: (
    handleCursor: (eventName: string, key: string | null, value: any) => void
  ) => void;
  onCursorPositionChanged: (event: CursorChangeEvent) => void;
};

export type SupabaseApp = {
  roomId: string;
  client: SupabaseClient;
  userId: string;
  onCursorPositionChanged?: (data: any) => void;
  handleCursorPositionBeforeSend?: (
    data: CursorChangeEvent
  ) => CursorChangeEvent;
};
