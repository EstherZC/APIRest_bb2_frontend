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

    static async get_Items_By_State(token, state)
    {
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const getRequest = await axios.get(ApiRestURL.URL_FIND_ITEMS_BY_State+state);
        return await getRequest;
    }

    static async update_Item(token, item){
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const putRequest = await axios.put(ApiRestURL.URL_UPDATE_ITEM, item);
        return await putRequest;
    }

    static async save_Item(token, item){
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const postRequest = await axios.post(ApiRestURL.URL_SAVE_ITEM, item);
        return await postRequest;
    }

    
}

export default ItemService;