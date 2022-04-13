import React from "react";
import '../styles/Header.css';
class Header extends React.Component
{
  constructor(){
    super();
  }

render()
  {
    return (
      <div className="header-container">
        <h1 className="header-title">API Rest</h1>
        {(window.localStorage.getItem("user")!== null)? <p className="header-username">User: {window.localStorage.getItem("user")}</p> : <p></p>}
      </div>
      
    )
  }
}
export default Header;