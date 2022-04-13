import  {Component} from 'react';
import axios from 'axios';
import ApiRestURL from '../utils/ApiRestURL';

class SupplierService extends Component
{
    
    static async get_All_Suppliers(token)
    {
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const getRequest = await axios.get(ApiRestURL.URL_FIND_SUPPLIERS);
        return await getRequest;
    }
    
}

export default SupplierService;