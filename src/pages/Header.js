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
          {(window.localStorage.getItem("token")!== null)? <button className="header-button" value="Log out" >Log Out</button> : <p></p>}
        </div>
        
      )
    }
}
export default Header;