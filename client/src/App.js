import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/Dashboard";
import Backstage from "./pages/Backstage";
import GetStarted from "./pages/GetStarted";

function App() {
  return (
      <Router>
          <Dashboard>
            <Route exact path="/" component={GetStarted} />
            <Route exact path="/backstage" component={Backstage} />
          </Dashboard>
      </Router>
  );
}

export default App;
