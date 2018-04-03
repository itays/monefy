import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;
