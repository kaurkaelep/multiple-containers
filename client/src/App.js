import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fibonacci from "./Fibonacci";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/myhomie">Other page</Link>
        </header>
        <Route exact path="/" component={Fibonacci} />
        <Route component={OtherPage} />
      </div>
    </Router>
  );
};

export default App;
