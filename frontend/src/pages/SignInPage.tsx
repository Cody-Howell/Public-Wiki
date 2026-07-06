import { useState } from "react";
import { useAuth } from "../context/auth/AuthContext";

export function SignInPage() {
  const { auth, isSignedIn, signIn, updatePassword } = useAuth();
  const [username, setUsername] = useState(auth.username);
  const [password, setPassword] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    
    if (isSignedIn) {
      if (!password) return;
      await updatePassword(password);
    } else {
      if (!username || !password) return;
      await signIn(username, password);
    }
    window.location.reload();
  };

  return (
    <div>
      {isSignedIn ? (
        <div>
          <p>You are signed in as user: {auth.username}</p>
          <form onSubmit={submit}>
            <label>
              Update password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <p>You are not signed in. </p>
          <form onSubmit={submit}>
            <label>
              Username:
              <input
                type="string"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
