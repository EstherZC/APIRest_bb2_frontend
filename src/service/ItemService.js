import  {Component} from 'react';
import axios from 'axios';
import ApiRestURL from '../utils/ApiRestURL';

class ItemService extends Component
{
    

    static async get_All_Items(token)
    {
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const getRequest = await axios.get(ApiRestURL.URL_FIND_ITEMS);
        return await getRequest;
    }

    static async get_Item_By_Id(token, id)
    {
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const getRequest = await axios.get(ApiRestURL.URL_FIND_ITEM_BY_ID+id);
        return await getRequest;
    }

    
}

export default ItemService;