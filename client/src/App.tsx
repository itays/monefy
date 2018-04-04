import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/Home';
import './App.scss';

class App extends React.Component {
  render() {
    return (
        <Router>
          <Container>    
              <Route exact={true} path="/" component={Home} />
          </Container>
        </Router>
    );
  }
}

export default App;
