import React, {Component } from 'react';
import ItemService from '../service/ItemService';
import Footer from './Footer';
import Header from './Header';
import '../styles/Catalogue.css';
import DateHelper from '../utils/DateHelper';
import AdminHelper from '../utils/AdminHelper';

class Catalogue extends Component
{
    
    constructor(){
        super();
        this.state = {
            items: [],
            msg: ''
        }
        this.load_All_Items = this.load_All_Items.bind(this);
        this.load_Items_By_State = this.load_Items_By_State.bind(this);
        this.create_Table = this.create_Table.bind(this);
        this.create_Table_Row = this.create_Table_Row.bind(this);
        this.get_Selected_State = this.get_Selected_State.bind(this);
    }

    async componentDidMount(){
        if(window.localStorage.getItem("token")){
            window.history.pushState(null, document.title, window.location.href);
            this.load_All_Items();
        }else {
            window.location.href = "/";
        }
    }

    create_Table(){
        var items_Table_HTML =<tr></tr>;
        if(this.state.items.length !== 0)
        {
            items_Table_HTML = this.state.items.map( (item) =>{
                return this.create_Table_Row(item, item.state);
            });
        }
        return items_Table_HTML;
    }  


    show_Info_Page(event){
        event.preventDefault();
        window.localStorage.setItem('idItem', event.target.value);
        document.getElementById('filter-state').value = 'all';
        window.location.href = "/catalogue/details";
    }

    create_Table_Row(item, isActive){
        var state = (isActive) ? 'Active' : 'Discontinued';
        return (<tr key={item.idItem}>
            <td>
            <button className='button-info' value={item.idItem} onClick={this.show_Info_Page.bind(this)}>{item.itemCode}</button>
            </td>
            <td>
            {item.description}
            </td>
            <td>
                {state}
            </td>
            <td>
                {item.price}
            </td>
            <td>
                {DateHelper.short_Date_Format(item.creation)}
            </td>
            <td>
                {item.creator.name}
            </td>
            {AdminHelper.check_Current_User() && <td> <button className='button-remove' value={item.idItem} onClick={this.remove_Item.bind(this)}>Remove</button></td>}
        </tr>);
    }

    remove_Item(event){
        event.preventDefault()
        this.setState({
            msg : ''
        })
        ItemService.remove_Item(window.localStorage.getItem('token'), event.target.value).then(deleteRequest=>{
            if(deleteRequest.data === 'OK'){
                this.load_All_Items();

            }else{
                this.setState({
                    msg : 'Could not delete the item with id:'
                })
            }

        }).catch(error =>{
            this.setState({
                msg : 'Could not delete the item with id:'
            })
        });
    }
    load_All_Items(){
        ItemService.get_All_Items(window.localStorage.getItem("token")).then(getRequest=>{
            this.setState({
                items: getRequest.data,
                error : ''
            })
        }).catch(error =>{
            this.setState({
                items: [],
                msg : 'Error Load Items - '+error
            })
        });
    }

    load_Items_By_State(isActive){
        ItemService.get_Items_By_State(window.localStorage.getItem("token"), isActive).then(getRequest=>{
            this.setState({
                items: getRequest.data,
                error : ''
            })
        }).catch(error =>{
            this.setState({
                items: [],
                msgError : 'Error Load Items - '+error
            })
        });
    }
    get_Selected_State(){
        switch(document.getElementById('filter-state').value){
            case 'discontinued':
                this.load_Items_By_State(false);
                return;
            case 'active':
                this.load_Items_By_State(true);
                return;
            default:
                this.load_All_Items();
                return;
        }
    }
  
    render(){
        return (
            <div>
                 <Header></Header>
                <div className='catalogue-container'>
                <h1 className='title'>Catalogue</h1>
                    <p>{this.state.msg}</p>
                    <div className='all-items'>
                         <table className='table-items'>
                            <thead >
                                <tr>
                                    <th className='table-title'>Items</th>
                                    <th className='table-filter' colSpan='5'>State: 
                                    <select id='filter-state' className='select-filter' onChange={this.get_Selected_State} >
                                        <option value='all' className='option-filter'>All</option>
                                        <option value='active' className='option-filter'>Active</option>
                                        <option value='discontinued' className='option-filter'>Discontinued</option>    
                                    </select></th>
                                </tr>
                                <tr>
                                    <th className='table-head'>Code</th>
                                    <th className='table-head'>Description</th>
                                    <th className='table-head'>State</th>
                                    <th className='table-head'>Price</th>
                                    <th className='table-head'>Creation Date</th>
                                    <th className='table-head'>Creator</th>
                                    {AdminHelper.check_Current_User() && <th className='table-head'></th>}
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

export default Catalogue;