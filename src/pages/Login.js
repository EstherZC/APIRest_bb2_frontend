import React, {Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginService from '../service/LoginService';
import '../styles/Login.css';

class Login extends Component
{
    constructor(){
        super();
        this.state ={
            msg : ''
        }
        this.login_user = this.login_user.bind(this);
    }

    async componentDidMount(){
        window.localStorage.clear();
        window.history.pushState(null, document.title, window.location.href);
       
    }

    login_user(event)
    {
        event.preventDefault();
        var username = event.target.username.value;
        var password = event.target.password.value;
        LoginService.get_Token(username, password).then(postRequest =>{
            if(postRequest.status === 200){
                this.setState({
                    msg: 'Loading ...'
                })
                window.localStorage.setItem("token", postRequest.token);
                window.localStorage.setItem("username", username);
                window.localStorage.setItem("roles", postRequest.roles)
                window.location.href = '/catalogue'; 
            }else{
               this.setState({
                msg: "User not authorized"
               })
            }
        }).catch(e =>{
            this.setState({
                msg: 'User not authorized'
            })
        });
        
    }

    render(){
        return(
            
            <div>
                <Header></Header>
                <div className='login-container'>
                    
                    <div className='login-form'>
                        <form method='POST' onSubmit={this.login_user}>
                            <label className='form-name'>Username</label>
                            <input type="text" autoComplete="username" name="username" />
                            <label className='form-name'>Password</label>
                            <input type="password" autoComplete="current-password" name="password"/>
                            <button className='button-login' type='submit' >Enter</button>
                        </form>
                        <p className={(this.state.msg === 'Loading ...')?'msg-login':'error-login'}>{(this.state.msg !== '')? this.state.msg : ''}</p>
                    </div>
                
                </div>  
                <Footer></Footer>   
            </div>  
        );
    }
}

export default Login;