import { useState } from "react";
import db from "../api/db";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    await db.read();
    db.data.mangadex = {
      username: username,
      password: password
    };
    await db.write();
    document.location.replace("/");
  };
  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center">
        <div className="text-center space-y-2 p-4 bg-gray-200 rounded-md">
          <div className="space-y-4 w-72">
            <p className="mt-2 font-semibold text-2xl">e-Manga</p>
            <input
              type="text"
              className="p-1 rounded-md"
              placeholder="Mangadex Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="p-1 rounded-md"
              placeholder="Mangadex Password"
            />
            <button
              className="bg-emerald-200 p-2 pt-1 pb-1 rounded-md"
              onClick={login}
            >
              Log In
            </button>
            <p>powered by Mangadex</p>
          </div>
        </div>
      </div>
    </>
  );
}
