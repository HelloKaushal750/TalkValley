import Signup from "./Signup";
import "../Styles/Home.css";
import { useState } from "react";
import Login from "./Login";

function Home() {
  const [boolean, setboolean] = useState(true);
  return (
    <div className="home_page">
      <div className="header">
        <button
          style={boolean ? { backgroundColor: "#C3073F" } : null}
          onClick={() => {
            setboolean(true);
          }}
        >
          Register
        </button>
        <button
          style={!boolean ? { backgroundColor: "#C3073F" } : null}
          onClick={() => {
            setboolean(false);
          }}
        >
          Login
        </button>
      </div>
      {
        boolean ? <Signup /> : <Login />
      }
    </div>
  );
}

export default Home;
