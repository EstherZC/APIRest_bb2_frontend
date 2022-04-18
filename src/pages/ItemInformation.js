import React, {Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import SupplierService from '../service/SupplierService';
import ItemService from '../service/ItemService';
import PriceReductionService from '../service/PriceReductionService';
import '../styles/Item.css';
import '../styles/Confirm.css'
import DateHelper from '../utils/DateHelper';


class ItemInformation extends Component
{
    
    constructor(){
        super();
        this.state ={
            isCreator : false,
            suppliers: [],
            priceReductions: [],
            item:[],
            msg: ['', ''],
            showHiddenConrim : false,
            actualState: ''
        }
        this.show_List_Supplier = this.show_List_Supplier.bind(this);
        this.show_Suppliers_Item = this.show_Suppliers_Item.bind(this);
        this.show_List_Price_Reductions = this.show_List_Price_Reductions.bind(this);
        this.show_Reductions_Item = this.show_Reductions_Item.bind(this);
        this.update_Item = this.update_Item.bind(this);
        this.load_Item_Information = this.load_Item_Information.bind(this);
        this.add_Supplier = this.add_Supplier.bind(this);
    }

    async componentDidMount(){
        if(window.localStorage.getItem("token")){
            SupplierService.get_All_Suppliers(window.localStorage.getItem("token")).then(getRequest=>{
                this.setState({
                    suppliers: getRequest.data,
                })
            }).catch(error =>{
                this.setState({
                    suppliers: []
                })
            });
            this.load_Item_Information();
            PriceReductionService.get_All_Price_Reductions(window.localStorage.getItem("token")).then(getRequest=>{
                this.setState({
                    priceReductions: getRequest.data
                })
            }).catch(error =>{
                this.setState({
                    priceReductions: []
                })
            });
           
        }else {
            window.location.href = "/";
        }
    }
    
    load_Item_Information(){
        ItemService.get_Item_By_Id(window.localStorage.getItem("token"), window.localStorage.getItem('idItem')).then(getRequest=>{
            this.setState({
                item: getRequest.data,
                actualState: getRequest.data.state
            })
            if(getRequest.data.length !== 0){
                this.setState({
                    isCreator : (getRequest.data.creator.username === window.localStorage.getItem("username"))
                })
            }
        }).catch(error =>{
            this.setState({
                item: []
            })
        });
    }

    show_List_Supplier(){
        var list;
        if(this.state.suppliers.length !== 0){
            list = this.state.suppliers.map((it)=>{
                return <li key={it.username} >{it.name} <button  value ={it.idUser} className='add-button' disabled={!this.state.isCreator} onClick={this.check_Supplier.bind(this)}>Add</button></li>
            });
        }
        return list;
    }

    check_Supplier(event){
        event.preventDefault();
        var item = this.state.item;
        var idSupplier = event.target.value;

        if(item.length !== 0){
            let listSupplier = item.suppliers;
            var exitSupplier = listSupplier.map((sup)=>{
                var id = JSON.stringify(sup.idUser);
                if( id === idSupplier){
                   return true;
                }else{
                    return false;
                }
            });
            if(!exitSupplier.includes(true)){
                this.add_Supplier(idSupplier);
            }
        }
    }

    add_Supplier(idSupplier){
        var item = this.state.item;
        SupplierService.get_Supplier_By_Id(window.localStorage.getItem('token'), idSupplier).then(getRequest=>{
            if(getRequest.data.length !== 0){
                var suppliers =item.suppliers;
                suppliers.push(getRequest.data);
                item.suppliers = suppliers;
                this.setState({
                    item: item
                })
               
            }
        }).catch(error =>{
            this.setState({
                msg: ['error','Could not add Supplier!']
            })
        });
    }

    show_Suppliers_Item(){
        var list;
        if(this.state.item.length !== 0 && this.state.item.suppliers.length !== 0){
            list = this.state.item.suppliers.map((it)=>{
                return <li key={it.username} value={it.idSupplier}>{it.name} <button  value ={it.idUser} disabled={!this.state.isCreator} className='remove-button' onClick={this.remove_Supplier.bind(this)}>Remove</button></li>
            });
        }
        return list;
    }

    remove_Supplier(event){
        event.preventDefault();
        var item = this.state.item;
        var id = event.target.value;
        if(item !== 0){
                var suppliers =item.suppliers;
                suppliers.forEach((value, idx, arr)=>{
                    if(JSON.stringify(value.idUser) === id){
                        arr.splice(idx, 1);
                    }
                })
                item.suppliers = suppliers;
                this.setState({
                    item: item
                })
               
        }else{
            this.setState({
                msg: ['error','Could not remove Supplier!']
            })
        }
    }

    show_List_Price_Reductions(){
        var list;
        if(this.state.priceReductions.length !== 0){
            list = this.state.priceReductions.map((it)=>{
                return <li key={it.idReduction} value={it.idReduction}>Price reduction: {it.priceReduction} Start date: {it.startDate} End date: {it.endDate}
                <button  value ={it.idReduction} className='add-button' disabled={!this.state.isCreator} onClick={this.check_Reduction.bind(this)}>Add</button></li>
            });
        }
        return list;
    }

    check_Reduction(event){
        event.preventDefault();
        var item = this.state.item;
        var idReduction = event.target.value;

        if(item.length !== 0){
            let listReductions = item.priceReductions;
            var exitReduction = listReductions.map((red)=>{
                var id = JSON.stringify(red.idReduction);
                if( id === idReduction){
                   return true;
                }else{
                    return false;
                }
            });
            if(!exitReduction.includes(true)){
                this.add_Price_Reduction(idReduction);
            }
        }
    }

    add_Price_Reduction(idReduction){
        var item = this.state.item;
        PriceReductionService.get_Price_Reduction_By_ID(window.localStorage.getItem('token'), idReduction).then(getRequest=>{
            if(getRequest.data.length !== 0){
                var priceReductions =item.priceReductions;
                priceReductions.push(getRequest.data);
                item.priceReductions = priceReductions;
                this.setState({
                    item: item
                })
               
            }
        }).catch(error =>{
            this.setState({
                msg: ['error','Could not add Price reduction!']
            })
        });
    }

    show_Reductions_Item(){
        var list;
        if(this.state.item.length !== 0 && this.state.item.priceReductions.length !== 0){
            list = this.state.item.priceReductions.map((it)=>{
                return <li key={it.idReduction} value={it.idReduction} >Price reduction: {it.priceReduction} Start date: {it.startDate} End date: {it.endDate} 
                <button  value ={it.idReduction} className='remove-button' disabled={!this.state.isCreator} onClick={this.remove_Price_Reduction.bind(this)}>Remove</button></li>
            });
        }
        return list;
    }

    remove_Price_Reduction(event){
        event.preventDefault();
        var item = this.state.item;
        var id = event.target.value;
        if(item !== 0){
                var priceReductions =item.priceReductions;
                priceReductions.forEach((value, idx, arr)=>{
                    if(JSON.stringify(value.idReduction) === id){
                        arr.splice(idx, 1);
                    }
                })
                item.priceReductions = priceReductions;
                this.setState({
                    item: item
                })
               
        }else{
            this.setState({
                msg: ['error','Could not remove Price reduction!']
            })
        }
    }

    show_Hidden_Confirm(event){
        event.preventDefault(); 
        if(this.state.actualState){
            this.setState({
                showHiddenConrim : true
            })
        }else{
            this.setState({
                showHiddenConrim : false
            })
            this.change_State(null, true)
        }
    }

    change_State(e, change){
        var item = this.state.item;
       
        if(item.length !== 0 && change){
            item.state = !this.state.item.state;
            this.setState({
                item: item,
                actualState: item.state,
                showHiddenConrim : false
            })
        }else{
            this.setState({
                showHiddenConrim : false
            })
        }

        
    }
    change_Item_Description(event){
        event.preventDefault();
        var item = this.state.item;
        item.description = event.target.value;
        this.setState({
            item: item
        })
    }

    change_Item_Price(event){
        event.preventDefault();
        var item = this.state.item;
        
        item.price =  event.target.value;
        this.setState({
            item: item
        })
    }

    check_Price_Null(event){
        event.preventDefault();
        var item = this.state.item;
        if(event.target.value.length === 0){
            item.price = 0;
            this.setState({
                item: item
            })
            event.target.value =0;
        }
    }
    
    update_Item(event){
        event.preventDefault();
        
        ItemService.update_Item(window.localStorage.getItem("token"), this.state.item).then(putRequest=>{
            if(putRequest.data === 'OK'){
                this.setState({
                    msg: ['OK', 'Updated item!']
                })

            }else{
                this.setState({
                    msg: ['error','Could not update item!']
                })
            }
            this.load_Item_Information();

        }).catch(error =>{
            this.setState({
                msg: ['error','Could not update item!']
            })
            this.load_Item_Information();

        });
    }

    render(){
        
        return(
            <div >
                <Header></Header>
                <div className='item-container'>
                    <h1 className='title'>Item Details</h1>
                    <p className={(this.state.msg[0] ==='error')? 'msg-error':'msg-ok'}>{(this.state.msg[0] !=='')? this.state.msg[1]:''}</p>
                    <div className='item-information'>
                        <div className='desactivate-container'>
                            <button className='state-item-button' onClick={this.show_Hidden_Confirm.bind(this)} disabled={!this.state.isCreator}>{(this.state.item.state)?"Desactivate":"Activate"}</button>
                            {this.state.showHiddenConrim && <DesactivateItemConfirm func={this.change_State.bind(this)}/>}
                        </div>
                        <form  className='item-form' method='PUT' onSubmit={this.update_Item}>
                            <label >Item Code:</label>
                            <input defaultValue={this.state.item.itemCode} disabled={true} />
                            <label className='inline-label'>Creator:</label>
                            <input defaultValue={(this.state.item.length !== 0)? this.state.item.creator.name :''} disabled={true} />
                            <label className='inline-label'>Creation:</label>
                            <input  defaultValue={(this.state.item.length !== 0)?DateHelper.short_Date_Format(this.state.item.creation):''} disabled={true} />
                            <label className='block-label'>State:</label>
                            <input value={(this.state.item.state)?'Active':'Discontinued'} disabled={true} />
                            <label className='block-label'>Description:</label>
                            <textarea rows="5" cols="50" name="description" disabled={!this.state.isCreator} onBlur={this.change_Item_Description.bind(this)} onChange={this.change_Item_Description.bind(this)} value={this.state.item.description}/>
                            <label className='block-label'>Price:</label>
                            <input name="price" type="number" min="0.00" step="0.01" value={this.state.item.price ?? ''} onBlur={this.check_Price_Null.bind(this)} onChange={this.change_Item_Price.bind(this)} disabled={!this.state.isCreator} />
                            <label className='block-label'>Item Suppliers:</label>
                            <div className='div'>
                                <div className='my-supplier-list'>
                                    {this.show_Suppliers_Item()}
                                </div>
                                <div className='supplier-list'>
                                    {this.show_List_Supplier()}
                                </div>
                            </div>
                            <label className='block-label'>Item Price Reductions:</label>
                            <div className='div'>
                                <div className='my-price-reduction-list'>
                                    {this.show_Reductions_Item()}
                                </div>
                                <div className='price-reduction-list'>
                                    {this.show_List_Price_Reductions()}
                                </div>
                            </div>
                            <button className='button-item' type='submit' disabled={!this.state.isCreator}>Update</button>
                        </form>                        
                    </div>
                   
                    
                </div>
                <Footer></Footer>
            </div>            
        );
    }
}

class DesactivateItemConfirm extends Component
{
    constructor(props){
        super(props);
        this.state ={
            description : '',
            msg:''
        }
    }

    desactivate_Item(event){
        event.preventDefault();
        if(event.target.name === "save" && this.state.description.length !== 0){
            this.props.func(this, true)
        }else if (event.target.name === "cancel"){
            this.props.func(this, false)
        }else{
            this.setState({
                msg : 'Need a reason!'
            })
        }
    }

    change_Item_Description(event){
        event.preventDefault();
        this.setState({
            description : event.target.value
        })
    }
    render(){
        return(
            
            <div>
                <div className='desactivate-container'>
                    
                    <div className='desactivate-form'>
                        <form method='POST' >
                            <label >Reason:</label>
                            <textarea rows="5" cols="50" name="description" onBlur={this.change_Item_Description.bind(this)}  onChange={this.change_Item_Description.bind(this)} />
                            <button className='button' name='cancel' onClick={this.desactivate_Item.bind(this)} >Cancel</button>
                            <button className='button' name='save' onClick={this.desactivate_Item.bind(this)} >Change</button>
                        </form>
                        <p className={(this.state.msg === 'Loading ...')?'msg-desactivate':'error-desactivate'}>{(this.state.msg !== '')? this.state.msg : ''}</p>
                    </div>
                
                </div>  
            </div>  
        );
    }
}

export default ItemInformation;