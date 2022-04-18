import React, {Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import SupplierService from '../service/SupplierService';
import ItemService from '../service/ItemService';
import PriceReductionService from '../service/PriceReductionService';
import '../styles/Item.css';


class NewItem extends Component
{
    
    constructor(){
        super();
        this.state ={
            item : {itemCode : null, description : "", price : 0.0, creator : null, suppliers : [], priceReductions : []},
            suppliers: [],
            priceReductions: [],
            msg: ['', ''],
        }
        this.show_List_Supplier = this.show_List_Supplier.bind(this);
        this.show_Suppliers_Item = this.show_Suppliers_Item.bind(this);
        this.show_List_Price_Reductions = this.show_List_Price_Reductions.bind(this);
        this.show_Reductions_Item = this.show_Reductions_Item.bind(this);
        this.save_Item = this.save_Item.bind(this);
        this.add_Supplier = this.add_Supplier.bind(this);
        this.set_Creator_By_Username = this.set_Creator_By_Username.bind(this);
        this.clean_Page = this.clean_Page.bind(this);
    }

    async componentDidMount(){
        if(window.localStorage.getItem("token")){
            this.set_Creator_By_Username();
            SupplierService.get_All_Suppliers(window.localStorage.getItem("token")).then(getRequest=>{
                this.setState({
                    suppliers: getRequest.data,
                })
            }).catch(error =>{
                this.setState({
                    suppliers: []
                })
            });
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

    show_List_Supplier(){
        var list;
        if(this.state.suppliers.length !== 0){
            list = this.state.suppliers.map((it)=>{
                return <li key={it.username} >{it.name} <button  value ={it.idUser} className='add-button' onClick={this.check_Supplier.bind(this)}>Add</button></li>
            });
        }
        return list;
    }

    check_Supplier(event){
        event.preventDefault();
        var item = this.state.item;
        var idSupplier = event.target.value;

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
                return <li key={it.username} value={it.idSupplier}>{it.name} <button  value ={it.idUser} className='remove-button' onClick={this.remove_Supplier.bind(this)}>Remove</button></li>
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
                <button  value ={it.idReduction} className='add-button' onClick={this.check_Reduction.bind(this)}>Add</button></li>
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
                <button  value ={it.idReduction} className='remove-button' onClick={this.remove_Price_Reduction.bind(this)}>Remove</button></li>
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
    
    set_Creator_By_Username(){
        SupplierService.get_Supplier_By_Username(window.localStorage.getItem('token'), window.localStorage.getItem('username')).then(getRequest=>{
            if(getRequest.length !== 0){
                var item = this.state.item;
                item.creator = getRequest.data;
                this.setState({
                    item : item
                })
            }
        }).catch(error =>{
            

        });
    }

    change_Item_Description(event){
        event.preventDefault();
       this.setState({
            msg: ['','']
        })
        var item = this.state.item;
        if(event.target.value.length !== 0){
            item.description = event.target.value;
            this.setState({
                item: item
            })
        }else{
            item.description = '';
            this.setState({
                item: item
            })
            this.setState({
                msg: ['error','Description is neccesary!']
            })
        }
    }

    change_Item_Price(event){
        event.preventDefault();
        var item = this.state.item;
        item.price = event.target.value;
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

    change_Item_Code(event){
        event.preventDefault();
        this.setState({
            msg: ['','']
        })
        var item = this.state.item;
        if(event.target.value.length !== 0){
            item.itemCode = parseInt(event.target.value);
            this.setState({
                item: item
            })
        }else{
            item.itemCode = null;
            this.setState({
                item: item
            })
            this.setState({
                msg: ['error','Item code is neccesary!']
            })
        }
        
    }
    
    clean_Page(){
        this.setState({
            item : {itemCode : null, description : "", price : 0.0, creator : null, suppliers : [], priceReductions : []}
        });
    }

    save_Item(event){
        event.preventDefault();
        if(this.state.item.itemCode !== null && this.state.item.description.length !== 0){
            ItemService.save_Item(window.localStorage.getItem("token"), this.state.item).then(postRequest=>{
                if(postRequest.data === 'OK'){
                    this.setState({
                        msg: ['OK', 'Saved item!']
                    })
                    this.clean_Page();
                }else{
                    this.setState({
                        msg: ['error','Could not save item!']
                    })
                }
    
            }).catch(error =>{
                this.setState({
                    msg: ['error','Could not save item!']
                })
    
            });
        }else{
            this.setState({
                msg: ['error','Item code and Description are neccesary!']
            })
        }
     
    }

    render(){
        return(
            <div >
                <Header></Header>
                <div className='item-container'>
                    <h1 className='title'>Item Details</h1>
                    <p className={(this.state.msg[0] ==='error')? 'msg-error':'msg-ok'}>{(this.state.msg[0] !=='')? this.state.msg[1]:''}</p>
                    <div className='item-information'>
                        <form  className='item-form' method='POST' onSubmit={this.save_Item}>
                            <label >Item Code:</label>
                            <input name="code" type="number" value={this.state.item.itemCode ?? ''}onBlur={this.change_Item_Code.bind(this)} onChange={this.change_Item_Code.bind(this)}  />
                            <label className='block-label'>Description:</label>
                            <textarea rows="5" cols="50" name="description"onBlur={this.change_Item_Description.bind(this)} onChange={this.change_Item_Description.bind(this)} value={this.state.item.description}/>
                            <label className='block-label'>Price:</label>
                            <input name="price" type="number" min="0.00" step="0.01" value={this.state.item.price ?? ''} onBlur={this.check_Price_Null.bind(this)} onChange={this.change_Item_Price.bind(this)}  />
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
                            <button className='button-item' type='submit' >Save</button>
                        </form>                        
                    </div>
                   
                    
                </div>
                <Footer></Footer>
            </div>            
        );
    }
}

export default NewItem;