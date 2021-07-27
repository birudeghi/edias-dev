import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import Backstage from "./pages/Backstage";
import Main from "./pages/Main";

function App() {
  return (
      <Router>
          <Dashboard>
            <Route exact path="/" component={Main} />
          </Dashboard>
      </Router>
  );
}

export default App;
