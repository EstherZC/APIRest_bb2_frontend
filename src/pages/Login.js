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
            error : ''
        }
        this.login_user = this.login_user.bind(this);
    }

    async componentDidMount(){
        window.localStorage.clear();
    }
    
    login_user(event)
    {
        event.preventDefault();
        this.setState({
            error: ''
        })
        var username = event.target.username.value;
        var password = event.target.password.value;
        LoginService.get_Token(username, password).then(postRequest =>{
            if(postRequest.status === 200){
                window.localStorage.setItem("token", postRequest.token);
                window.localStorage.setItem("user", username)
                window.location.href = '/catalogue'; 
            }else{
               this.setState({
                   error: "User not authorized"
               })
            }
        }).catch(e =>{
            this.setState({
                error: 'User not authorized'
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
                            <input type="text" autoComplete="username" name="username"/>
                            <label className='form-name'>Password</label>
                            <input type="password" autoComplete="current-password" name="password"/>
                            <button className='button-login' type='submit' >Enter</button>
                        </form>
                        <p className='error-login'>{(this.state.error !== '')? this.state.error : ''}</p>
                    </div>
                
                </div>  
                <Footer></Footer>   
            </div>  
        );
    }
}

export default Login;