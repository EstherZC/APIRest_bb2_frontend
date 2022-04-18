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
    static async remove_Supplier(token, id){
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const deleteRequest = await axios.delete(ApiRestURL.URL_REMOVE_SUPPLIER+id);
        return await deleteRequest;
    }

    static async save_Supplier(token, user){
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const postRequest = await axios.post(ApiRestURL.URL_SAVE_SUPPLIER, user);
        return await postRequest;
    }
    
}

export default SupplierService;