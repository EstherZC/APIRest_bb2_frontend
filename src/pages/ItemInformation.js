import React, {Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import SupplierService from '../service/SupplierService';
import ItemService from '../service/ItemService';

class ItemInformation extends Component
{
    constructor(){
        super();
        this.state ={
            readMode : true,
            suppliers: [],
            item:[]
        }
        this.show_List_Supplier = this.show_List_Supplier.bind(this);
    }

    async componentDidMount(){
        if(window.localStorage.getItem("token")){
            SupplierService.get_All_Suppliers(window.localStorage.getItem("token")).then(getRequest=>{
                this.setState({
                    suppliers: getRequest.data
                })
            }).catch(error =>{
                this.setState({
                    suppliers: []
                })
            });
            console.log("id:" + window.localStorage.getItem('idItem'));
            ItemService.get_Item_By_Id(window.localStorage.getItem("token"), window.localStorage.getItem('idItem')).then(getRequest=>{
                this.setState({
                    item: getRequest.data
                })
            }).catch(error =>{
                this.setState({
                    item: []
                })
            });
        }else {
            window.location.href = "/";
        }
    }
   
    show_List_Supplier(){
        var list;
        if(this.state.suppliers.length !== 0){
            list = this.state.suppliers.map((it)=>{
                return <option key={it.username} value={it.idSupplier}>{it.name}</option>
            });
        }
        return list;
    }

    render(){
        return(
            <div >
                <Header></Header>
                <div className='details-container'>
                    <h1 className='title'>Item Details</h1>
                    <div className='item-information'>
                        <label>Code</label>
                        <p type='text' >{(this.state.item.length !==0)? this.state.item.itemCode : ''}</p>
                        
                    </div>
                    <div className='supplier-list'>

                    </div>
                    <div className='reductions-list'>

                    </div>
                </div>
                <Footer></Footer>
            </div>            
        );
    }
}

export default ItemInformation;