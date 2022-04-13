import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes as Switch } from 'react-router-dom';
import Login from './pages/Login';
import Catalogue from './pages/Catalogue';
import ItemInformation from './pages/ItemInformation';

function App() {
  return(
    <Router>
      <Switch >
        <Route exact  path="/" element={<Login/>}/>
      </Switch>
    </Router>

  );
}


export default App;
