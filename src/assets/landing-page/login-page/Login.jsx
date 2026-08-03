import { useState } from "react";
import Modal from "./Modal";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Login
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Login</h2>

        <input placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p>
          Don't have an account? <a href="/">Create Account</a>
        </p>
      </Modal>
    </>
  );
}