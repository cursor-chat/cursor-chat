import { SupabaseApp, SupabaseCursorHandler } from "./types";

export const createSupabaseHandler: (
  app: SupabaseApp
) => SupabaseCursorHandler = (options) => {
  const { userId, client, roomId = "cursor-chat" } = options;
  const channel = client.channel(roomId);
  return {
    initialize: (
      handleCursor: (eventName: string, key: string | null, value: any) => void
    ) => {
      channel
        .on("broadcast", { event: "cursor-pos" }, (payload) => {
          if (userId !== payload.data.id) {
            handleCursor("change", payload.data.id, payload.data);
          }
          options.onCursorPositionChanged?.(payload.data);
        })
        .subscribe();
    },
    onCursorPositionChanged: async (data) => {
      let sendData = data;
      if (options.handleCursorPositionBeforeSend) {
        sendData = options.handleCursorPositionBeforeSend(sendData);
      }
      channel.send({
        type: "broadcast",
        event: "cursor-pos",
        data: sendData,
      });
    },
  };
};
