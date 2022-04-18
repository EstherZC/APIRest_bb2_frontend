import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes as Switch } from 'react-router-dom';
import Login from './pages/Login';
import Catalogue from './pages/Catalogue';
import ItemInformation from './pages/ItemInformation';
import NewItem from './pages/NewItem';

function App() {
  return(
    <Router>
      <Switch >
        <Route exact  path="/" element={<Login/>}/>
        <Route exact  path="/catalogue" element={<Catalogue/>}/>
        <Route exact  path="/catalogue/details" element={<ItemInformation/>}/>
        <Route exact path='/catalogue/createItem' element={<NewItem/>}/>
      </Switch>
    </Router>

  );
}


export default App;
