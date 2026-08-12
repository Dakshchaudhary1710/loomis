import { useState } from "react";
import "./header.css";
import Modal from "./login-page/Modal";
import { FaCrown } from "react-icons/fa";


const landpageTop=[
  {
id:1,
title:"Home"
  },
  {
    id:2,
title:"Features"
  },
 { 
  id:3, 
title:"How It Works"
 }
 ,{
  id:4,
title:"About Us"
 },{id:5,
  title:"Contact"
 },
]

export default function Header(){
  const[showLogin,setShowLogin]=useState(false);
const[isLogin,setIsLogin]=useState(true);
  
  return(
    <>
        <div className="full-head">
<div className="left-part">
  <div className="left-title-icon">
    <svg
              width="70"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" fill="#1E1B4B" />
              <path
                d="M 35 28 V 55 A 8 8 0 0 0 43 63 H 47 A 8 8 0 0 0 55 55 V 45 A 8 8 0 0 1 63 37 H 65 A 8 8 0 0 1 73 45 V 68"
                stroke="#A78BFA"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon points="73,54 63,68 83,68" fill="#38BDF8" />
            </svg>
  </div>
  <div className="left-title"> Loomis</div>
</div>
<div className="middle-part">
{landpageTop.map((item)=>(
 <div className="middle-elements" key={item.id}>{item.title}</div>
))}
</div>
<div className="right-part">
  <div className="right-end">
    <div className="right-end-1" 
  onClick={()=>{
    setShowLogin(true); 
    setIsLogin(true);
  }}>
      login</div>
    <button className="right-end-2" ><FaCrown style={{ color: "#FFD700", fontSize: "24px",marginRight:"8px" }} />
    Upgrade To Pro</button>
  </div>
</div>
    </div>
<Modal
  isOpen={showLogin}
  onClose={() => setShowLogin(false)}
>
  {isLogin ? (
    <>
      <h2>Welcome Back</h2>

      <input type="email" placeholder="Email" />

      <input
        type="password"
        placeholder="Password"
      />

      <button>Login</button>

      <p>
        Don't have an account?{" "}
        <span
          onClick={() => setIsLogin(false)}
          style={{
            color: "#6C3CF0",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Create Account
        </span>
      </p>
    </>
  ) : (
    <>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        required
      />

      <input
        type="email"
        placeholder="Email Address"
      />

      <input
        type="password"
        placeholder="Password"
      />

      <input
        type="password"
        placeholder="Confirm Password"
      />

      <select defaultValue="">
        <option value="" disabled>
          Select Experience
        </option>

        <option>Student</option>
        <option>Fresher</option>
        <option>0 - 1 Years</option>
        <option>1 - 3 Years</option>
        <option>3+ Years</option>
      </select>

      <button>Create Account</button>

      <p>
        Already have an account?{" "}
        <span
          onClick={() => setIsLogin(true)}
          style={{
            color: "#6C3CF0",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Login
        </span>
      </p>
    </>
  )}
</Modal>

    </>


  )
}