import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';
import AddCorporates from '../dashboard/addCorporates';
import './app.css';

const App = () => (
  <div>
    <Route exact path="/" component={Login} />
    <Route exact path="/Dashboard" component={Dashboard} />
    <Route exact path="/Dashboard/AddCorporates" component={AddCorporates} />
  </div>
);

export default App;
