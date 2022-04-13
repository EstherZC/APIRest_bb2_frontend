import  {Component} from 'react';

class ApiRestConnection extends Component
{
    static URL_AUTHENTICATION_TOKEN = 'http://localhost:8080/authenticated/token';
    static URL_FIND_ITEMS = 'http://localhost:8080/apiRest/finditems';
    static URL_FIND_ITEM_BY_ID = 'http://127.0.0.1:8080/apiRest/finditembyid/';
    static URL_FIND_ITEM_BY_State = 'http://localhost:8080/apiRest/finditembystate/active/';
    static URL_SAVE_ITEM = 'http://localhost:8080/apiRest/saveitem';
    static URL_UPDATE_ITEM = 'http://localhost:8080/apiRest/updateitem';
    static URL_FIND_SUPPLIERS = 'http://localhost:8080/apiRest/findsuppliers';
}

export default ApiRestConnection;