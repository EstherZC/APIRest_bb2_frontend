import {Component } from 'react';
import ItemService from '../service/ItemService';

class AdminHelper extends Component{

    static check_Current_User(){
        var roles = window.localStorage.getItem('roles');
        return ( roles != null && roles.length !== 0 && roles.includes('ROLE_ADMIN'))
    
    }

}
export default AdminHelper;
