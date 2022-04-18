import React from "react";
import '../styles/Header.css';
import AdminHelper from '../utils/AdminHelper';

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
  got_to_New_Item_Page(){
    window.location.href = "/catalogue/createItem";
  }
  got_to_Users_Page(){
     window.location.href = "/catalogue/users"
  }

  got_to_New_User_Page(){
    window.location.href = "/catalogue/users/createUser";
  }
  
  render()
    {
      const buttonLogOut = (window.location.pathname !== '/')?<button className="header-logout" onClick={this.log_Out.bind(this)}>Log Out</button>:'';
      const buttonBack = (window.location.pathname.match("/catalogue/"))?<button className="header-back" onClick={this.go_Back.bind(this)}> {"< Back"}</button>:'';
      const buttonAddItem = (window.location.pathname === '/catalogue') ? <button className='new-button' onClick={this.got_to_New_Item_Page.bind(this)}>Add Item</button>:'';
      const buttonAddUser = (window.location.pathname === '/catalogue/users') ? <button className='new-button' onClick={this.got_to_New_User_Page.bind(this)}>Add User</button>:'';
      const buttonUsers =(window.location.pathname === '/catalogue' && AdminHelper.check_Current_User()) ? <button className='new-button' onClick={this.got_to_Users_Page.bind(this)}>Users</button>:'';
     
      
      return (
        <div className="header-container">
          <h1 className="header-title">API Rest</h1>
          {buttonLogOut}{ buttonBack}{buttonAddItem}{buttonUsers}{buttonAddUser}
        </div>
        
      )
    }
}
export default Header;