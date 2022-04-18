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

    static async get_Supplier_By_Id(token, id)
    {
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const getRequest = await axios.get(ApiRestURL.URL_FIND_SUPPLIER_BY_ID+id);
        return await getRequest;
    }

    static async get_Supplier_By_Username(token, username)
    {
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const getRequest = await axios.get(ApiRestURL.URL_FIND_SUPPLIER_BY_USERNAME+username);
        return await getRequest;
    }
    
}

export default SupplierService;