import { useState } from "react";
import "./App.css";

function App() {
  // "signup" or "login" - controls which form is shown
  const [mode, setMode] = useState("signup");

  // Form field values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Message shown to the user (success or error)
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Switch between Sign Up and Log In views
  function switchMode() {
    setMode(mode === "signup" ? "login" : "signup");
    setEmail("");
    setPassword("");
    setMessage("");
    setIsError(false);
  }

  // Called when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    // Decide which API endpoint to call based on the current mode
    const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Server responded with an error (e.g. wrong password, email taken)
        setIsError(true);
        setMessage(data.message || "Something went wrong");
        return;
      }

      // Success
      setIsError(false);
      setMessage(
        mode === "signup"
          ? "Account created! You can now log in."
          : `Welcome back, ${data.user.email}!`
      );

      // Stay on the same screen so the success message is visible;
      // the user can click "Log In" themselves when ready.
      setEmail("");
      setPassword("");

    } catch (error) {
      setIsError(true);
      setMessage("Could not reach the server. Is the backend running?");
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>{mode === "signup" ? "Sign Up" : "Log In"}</h1>

        <p className="switch-text">
          {mode === "signup" ? "Already a member? " : "New here? "}
          <span className="switch-link" onClick={switchMode}>
            {mode === "signup" ? "Log In" : "Sign Up"}
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <p className={isError ? "message error" : "message success"}>
              {message}
            </p>
          )}

          <button type="submit">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
