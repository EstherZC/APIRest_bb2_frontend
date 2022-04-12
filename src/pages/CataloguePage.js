import React, {Component } from 'react';
import ItemService from '../service/ItemService';

class CataloguePage extends Component
{
    
    constructor(){
        super();
        this.state = {
            items: [],
            msgError: ''
        }
    }
   

    render(){
        return (
            <div className='catalogContainer'>
            <h1 className='title'>Catalogue</h1>
       
            </div>
        );
    }
}

export default CataloguePage;