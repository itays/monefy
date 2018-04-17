import * as React from 'react';
import NavProps from './NavProps';
import NavState from './NavState';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import './Nav.scss';

export default class Nav extends React.Component<NavProps, NavState> {
  render() {
    return (
      <div className="nav">
        <Menu size="massive" position="right">
            <Menu.Item header={true}>Monefy</Menu.Item>
            <Menu.Item position="right" header={true}><Link to="/login" title="Login">Login</Link></Menu.Item>
        </Menu>
      </div>
    );
  }
}
