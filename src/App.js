import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes as Switch } from 'react-router-dom';
import Login from './pages/Login';
import Catalogue from './pages/Catalogue';
import ItemInformation from './pages/ItemInformation';
import NewItem from './pages/NewItem';
import Users from './pages/Users';
import NewUser from './pages/NewUser';

function App() {
  return(
    <Router>
      <Switch >
        <Route exact  path="/" element={<Login/>}/>
        <Route exact  path="/catalogue" element={<Catalogue/>}/>
        <Route exact  path="/catalogue/details" element={<ItemInformation/>}/>
        <Route exact path='/catalogue/createItem' element={<NewItem/>}/>
        <Route exact path='/catalogue/users' element={<Users/>}/>
        <Route exact path='/catalogue/users/createUser' element={<NewUser/>}/>
      </Switch>
    </Router>

  );
}


export default App;
