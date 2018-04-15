import * as React from 'react';
import LoginProps from './LoginProps';
import LoginState from './LoginState';
import './Login.scss';
import {
  Button,
  Form,
  Grid,
  Icon,
  Header,
  Segment
} from 'semantic-ui-react';

export default class Login extends React.Component<LoginProps, LoginState> {
  render() {
    return (
      <div className="login">
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              התחבר/י לחשבון
            </Header>
            <Form size="large">
              
              <Segment stacked={true}>
                <Form.Input
                    fluid={true}
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                />
                <Form.Input
                    fluid={true}
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                />
                <Button color="blue" icon={true} fluid={true} size="large">
                    <Icon name="google" /> להתחבר עם גוגל
                </Button>
                <br/>
                <Button color="teal" fluid={true} size="large">
                  התחברות
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
