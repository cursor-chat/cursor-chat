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
    return <Auth supabaseClient={supabase} providers={[]} />;
  }

  return (
    <div className="App">
      <CursorChat
        supabaseApp={{
          client: supabase,
          roomId: "myRoom",
          userId: user.id,
        }}
        userName={user.email}
        style={{
          backgroundColor: "white",
          padding: "2rem",
        }}
      >
        <button onClick={() => console.log("Clicked")}>Click me</button>
      </CursorChat>
    </div>
  );
}

export default App;
