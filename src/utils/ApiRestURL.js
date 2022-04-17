import  {Component} from 'react';

class ApiRestConnection extends Component
{
    static URL_AUTHENTICATION_TOKEN = 'http://localhost:8080/authenticated/token';
    static URL_FIND_ITEMS = 'http://localhost:8080/apiRest/finditems';
    static URL_FIND_ITEM_BY_ID = 'http://127.0.0.1:8080/apiRest/finditembyid/';
    static URL_FIND_ITEMS_BY_State = 'http://localhost:8080/apiRest/finditemsbystate/active/';
    static URL_SAVE_ITEM = 'http://localhost:8080/apiRest/saveitem';
    static URL_UPDATE_ITEM = 'http://localhost:8080/apiRest/updateitem';
    static URL_FIND_SUPPLIERS = 'http://localhost:8080/apiRest/findsuppliers';
    static URL_FIND_SUPPLIER_BY_ID ='http://localhost:8080/apiRest/findsupplierbyid/';
    static URL_FIND_SUPPLIER_BY_USERNAME = 'http://localhost:8080/apiRest/findsupplierbyusername/';
    static URL_FIND_PRICE_REDUCTIONS = 'http://localhost:8080/apiRest/findreductions';
    static URL_FIND_PRICE_REDUCTION_BY_ID = 'http://localhost:8080/apiRest/findreductionbyid/';
}

export default ApiRestConnection;