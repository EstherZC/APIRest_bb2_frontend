import React, {Component } from 'react';
import ItemService from '../service/ItemService';
import Footer from './Footer';
import Header from './Header';
import '../styles/Catalogue.css';
import SupplierService from '../service/SupplierService';

class Users extends Component
{
    
    constructor(){
        super();
        this.state = {
            suppliers: [],
            msg: ''
        }
        this.load_All_Suppliers = this.load_All_Suppliers.bind(this);
        this.create_Table = this.create_Table.bind(this);
        this.create_Table_Row = this.create_Table_Row.bind(this);
    }

    async componentDidMount(){
        if(window.localStorage.getItem("token")){
            this.load_All_Suppliers();
        }else {
            window.location.href = "/";
        }
    }

    create_Table(){
        var items_Table_HTML =<tr></tr>;
        if(this.state.suppliers.length !== 0)
        {
            items_Table_HTML = this.state.suppliers.map( (supplier) =>{
                return this.create_Table_Row(supplier);
            });
        }
        return items_Table_HTML;
    }  

    create_Table_Row(supplier){
        return (<tr key={supplier.idUser}>
            <td>
            {supplier.username}
            </td>
            <td>
                {supplier.name}
            </td>
            <td>
                {supplier.country}
            </td>
            <td>
                {supplier.userType}
            </td>
            <td> <button className='button-remove' value={supplier.idUser} onClick={this.remove_Supplier.bind(this)}>Remove</button></td>
        </tr>);
    }

    remove_Supplier(event){
        event.preventDefault()
        this.setState({
            msg : ''
        })
        SupplierService.remove_Supplier(window.localStorage.getItem('token'), event.target.value).then(deleteRequest=>{
            if(deleteRequest.data === 'OK'){
                this.load_All_Suppliers();
            }else{
                this.setState({
                    msg: 'Could not delete user!'
                })
            }
        }).catch(error =>{
            this.setState({
                msg: 'Could not delete user!'
            })
        });
    }

    load_All_Suppliers(){
        SupplierService.get_All_Suppliers(window.localStorage.getItem("token")).then(getRequest=>{
            this.setState({
                suppliers: getRequest.data,
                error : ''
            })
        }).catch(error =>{
            this.setState({
                suppliers: [],
                msgError : 'Error Load Items - '+error
            })
        });
    }
  
    render(){
        return (
            <div>
                 <Header></Header>
                <div className='catalogue-container'>
                <h1 className='title'>Users</h1>
                    <p>{this.state.msg}</p>
                    <div className='all-items'>
                         <table className='table-items'>
                            <thead >
                                <tr>
                                    <th className='table-head'>Username</th>
                                    <th className='table-head'>Name</th>
                                    <th className='table-head'>Country</th>
                                    <th className='table-head'>Type</th>
                                    <th className='table-head'></th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {this.create_Table()}
                            </tbody >
                        </table>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Users;