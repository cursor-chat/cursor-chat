import { useEffect, useState } from "react";
import "./App.css";
import "@cursor-chat/core/styles/cursor-chat.css";
import { createClient, User } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { CursorChat } from "@cursor-chat/supabase";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function App() {
  const [user, setUser] = useState<User>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    init();
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      setUser(session?.user);
    });
  }, []);

  if (!user) {
    return (
      <div className="App">
        <Auth supabaseClient={supabase} providers={[]} />
      </div>
    );
  }

  return (
    <div className="App">
      <CursorChat
        supabaseApp={{
          client: supabase,
          roomId: "myRoom",
          userId: user.id,
          handleCursorPositionBeforeSend: (data) => {
            return {
              ...data,
              meta: {
                message: `Hello from ${user.email}`,
              },
            };
          },
          onCursorPositionChanged: (data) => {
            console.log("Cursor position changed", data);
          },
        }}
        userName={user.email}
        style={{
          backgroundColor: "white",
          padding: "2rem",
        }}
      >
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <p>Count: {count}</p>
      </CursorChat>
    </div>
  );
}

export default App;
