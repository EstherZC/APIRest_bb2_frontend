import  {Component} from 'react';
import axios from 'axios';
import ApiRestURL from '../utils/ApiRestURL';

class LoginService extends Component
{
    

    static async get_Token(username, password)
    {
        const data = {
            username: username,
            password: password
        }
        const postRequest = await axios.post(ApiRestURL.URL_AUTHENTICATION_TOKEN, data);
        return await postRequest.data;
    }

    
}

export default LoginService;