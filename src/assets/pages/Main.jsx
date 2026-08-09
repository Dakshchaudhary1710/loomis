import SidebarMain from "../main-page/main-page-items/SidebarMain";
import HeaderMain from "../main-page/main-page-items/HeaderMain"
import {  Routes ,Route  } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./main.css";
export default function Main(){
  return(
<div className="main-page">
      <SidebarMain />

      <div className="right-section">
        <div className="headermain-body"><HeaderMain /></div>
        

        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}