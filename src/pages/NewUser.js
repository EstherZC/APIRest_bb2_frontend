import React, {Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/User.css';
import SupplierService from '../service/SupplierService';


class NewUser extends Component
{
    
    constructor(){
        super();
        this.state ={
            user : {username : "", password : "", name : "", country : "", userType : 'supplier'},
            msg: ['', ''],
        }
        this.save_User = this.save_User.bind(this);
        this.clean_Page = this.clean_Page.bind(this);
    }

    async componentDidMount(){
        if(!window.localStorage.getItem("token")){
            window.location.href = "/";
        }
    }

   

    change_Username(event){
        event.preventDefault();
        this.setState({
                msg: ['','']
            })
            var user = this.state.user;
            if(event.target.value.length !== 0){
                 user.username = event.target.value;
            }else{
                user.username = "";

                this.setState({
                    msg: ['error','Username is neccesary!']
                })
            }
            this.setState({
                    user: user
            })
    }

    change_Password(event){
        event.preventDefault();
        this.setState({
            msg: ['','']
        })
        var user = this.state.user;
        if(event.target.value.length !== 0){
            user.password = event.target.value;
        }else{
            user.password = "";
            this.setState({
                msg: ['error','Password is neccesary!']
            })
        }
        this.setState({
            user: user
        })
    }

    change_Name(event){
        event.preventDefault();
        var user = this.state.user;
        user.name = event.target.value;
        this.setState({
            user: user
        })
    }
    
    change_Country(event){
        event.preventDefault();
        var user = this.state.user;
        user.country = event.target.value;
        this.setState({
            user: user
        })
    }
    
    change_Type(event){
        event.preventDefault();
        var user = this.state.user;
        user.userType = 'admin';
        this.setState({
            user: user
        })
    }

    clean_Page(){
        this.setState({
            user : {username : "", password : "", name : "", country : "", userType :"supplier"}
        });
    }

    save_User(event){
        event.preventDefault();
        if(this.state.user.username.length !== 0 && this.state.user.password.length !==0){
            SupplierService.save_Supplier(window.localStorage.getItem('token'), this.state.user).then(postRequest=>{
                if(postRequest.data === 'OK'){
                    this.setState({
                        msg : ['OK', 'User save!']
                    })
                    this.clean_Page();
                }else{
                    this.setState({
                        msg: ['error', 'Could not save the user!']
                    })
                }
            }).catch(error =>{
                this.setState({
                    msg: ['error', 'Could not save the user!']
                })
            });
        }else{
            this.setState({
                msg : ['error', 'Username and Password are neccesary!']
            })
        }
    }

    render(){
        return(
            <div >
                <Header></Header>
                <div className='user-container'>
                    <h1 className='title'>User Details</h1>
                    <p className={(this.state.msg[0] ==='error')? 'msg-error':'msg-ok'}>{(this.state.msg[0] !=='')? this.state.msg[1]:''}</p>
                    <div className='user-information'>
                        <form  className='user-form' method='POST' onSubmit={this.save_User}>
                            <label className='block-label'>User type:</label>
                            <select name='selectType' value={this.state.user.userType} onBlur={this.change_Type.bind(this)} onChange={this.change_Type.bind(this)}>
                                <option name='supplier' value='supplier'>Supplier</option>
                                <option name='admin' value ='admin'>Admin</option>
                            </select>
                            <label className='block-label'>Username:</label>
                            <input name="username" type="text" autoComplete='username' value={this.state.user.username} onBlur={this.change_Username.bind(this)} onChange={this.change_Username.bind(this)}  />
                            <label className='block-label'>Password:</label>
                            <input type="password" autoComplete="new-password"  value={this.state.user.password} name="password" onBlur={this.change_Password.bind(this)} onChange={this.change_Password.bind(this)}/>
                            <label className='block-label'>Name:</label>
                            <input name="name" type="text" value={this.state.user.name} onBlur={this.change_Name.bind(this)} onChange={this.change_Name.bind(this)}/>
                            <label className='block-label' >Country:</label>
                            <input name="country" type="text" value={this.state.user.user} onBlur={this.change_Country.bind(this)} onChange={this.change_Country.bind(this)} />
                            <button className='button-user' type='submit' >Save</button>
                        </form>                        
                    </div>
                   
                    
                </div>
                <Footer></Footer>
            </div>            
        );
    }
}

export default NewUser;