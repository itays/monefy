import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/Home';
import './App.scss';
import Login from './components/Login';

class App extends React.Component {
  render() {
    return (
        <Router>
          <Container fluid={true}>    
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/login" component={Login} />
          </Container>
        </Router>
    );
  }
}

export default App;
