import React, {Component } from 'react';
import ItemService from '../service/ItemService';
import Footer from './Footer';
import Header from './Header';

class Catalogue extends Component
{
    
    constructor(){
        super();
        this.state = {
            items: [],
            msgError: ''
        }
        this.load_Items = this.load_Items.bind(this);
        this.create_Table = this.create_Table.bind(this);
        this.create_Table_Row = this.create_Table_Row.bind(this);
        this.short_Date = this.short_Date_Format.bind(this);
    }
    
    async componentDidMount(){
        if(window.localStorage.getItem("token")){
            this.load_Items();
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


    load_Info(event){
        event.preventDefault();
        window.localStorage.setItem('idItem', event.target.value);
        window.location.href = "/catalogue/details";
        
    }

    create_Table_Row(item, isActive){
        var state = (isActive) ? 'Active' : 'Discontinued';
        return (<tr key={item.idItem}>
            <td>
            <button value={item.idItem} onClick={this.load_Info.bind(this)}>{item.itemCode}</button>
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
                {this.short_Date_Format(item.creation)}
            </td>
            <td>
                {item.creator.name}
            </td>
        </tr>);
    }

    short_Date_Format(date){
        var shorDate= date.split('T')[0];
        var elements = shorDate.split('-');
        return elements[2]+"-"+elements[1]+"-"+elements[0]
    }

    load_Items(){
        ItemService.get_All_Items(window.localStorage.getItem("token")).then(getRequest=>{
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

    render(){
        return (
            <div>
                 <Header></Header>
                <div className='catalogue-container'>
                <h1 className='title'>Catalogue</h1>
                    <div className='all-items'>
                        <table className='table-items'>
                            <thead >
                                <tr>
                                    <th className='table-title'>Items</th>
                                </tr>
                                <tr>
                                    <th className='table-head'>Code</th>
                                    <th className='table-head'>Description</th>
                                    <th className='table-head'>State</th>
                                    <th className='table-head'>Price</th>
                                    <th className='table-head'>Creation Date</th>
                                    <th className='table-head'>Creator</th>
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