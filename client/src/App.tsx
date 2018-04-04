import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact={true} path="/" component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;
