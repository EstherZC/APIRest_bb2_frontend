import  {Component} from 'react';
import axios from 'axios';
import ApiRestURL from '../utils/ApiRestURL';

class PriceReductionService extends Component
{
    

    static async get_All_Price_Reductions(token)
    {
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const getRequest = await axios.get(ApiRestURL.URL_FIND_PRICE_REDUCTIONS);
        return await getRequest;
    }

    static async get_Price_Reduction_By_ID(token, id)
    {
        var bearerToken = 'Bearer '+token;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        const getRequest = await axios.get(ApiRestURL.URL_FIND_PRICE_REDUCTION_BY_ID+id);
        return await getRequest;
    }

}

export default PriceReductionService;