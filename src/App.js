import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes as Switch } from 'react-router-dom';
import CataloguePage from './pages/CataloguePage';

function App() {
  return(
    <Router>
      <Switch>
        <Route path="/" element={<CataloguePage/>}/>
      </Switch>
    </Router>

  );
}


export default App;
