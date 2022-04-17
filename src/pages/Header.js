import React from "react";
import '../styles/Header.css';

class Header extends React.Component
{
  constructor(){
    super();
  }
  
  log_Out(){
    window.localStorage.clear();
    window.location.replace("/");
  }
  go_Back(){
    window.history.back();
  }
  render()
    {
      const buttonLogOut = (window.location.pathname !== '/')?<button className="header-logout" onClick={this.log_Out.bind(this)}>Log Out</button>:'';
      const buttonBack = (window.location.pathname.match("/catalogue/"))?<button className="header-back" onClick={this.go_Back.bind(this)}> {"< Back"}</button>:'';
      return (
        <div className="header-container">
          <h1 className="header-title">API Rest</h1>
          {buttonLogOut}{ buttonBack}
        </div>
        
      )
    }
}
export default Header;