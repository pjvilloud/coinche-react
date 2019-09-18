import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Calc from './Calc';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
      <Router>
        <div>
            <Header />
            <div className="container">
                <Route exact path="/" component={Home} />
                <Route path="/calc" component={Calc} />
            </div>
        </div>
      </Router>
  );
}

export default App;
