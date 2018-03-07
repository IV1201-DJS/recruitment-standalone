// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Columns, Column, Button, CardContent, Hero, HeroBody, Container, Card, Field, Label, Control, Input } from 'bloomer';

type Props = {};

class Home extends Component<Props> {
  props: Props;

  state = {
    form: {
      username: '',
      password: ''
    },
    loading: false
  }

  logIn = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log('log in');
    try {
      const response = await axios.post('http://localhost:3333/api/login/', this.state.form);
      localStorage.token = response.data.token;
      this.props.history.push('/applications');
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

  updatePassword = (e) => {
    this.setState({ form: { ...this.state.form, password: e.target.value } });
  }

  updateUsername = (e) => {
    this.setState({ form: { ...this.state.form, username: e.target.value } });
  }

  render() {
    return (
      <Hero isColor="warning" isFullHeight isBold>
        <HeroBody>
          <Container>
            <Card>
              <CardContent>
                <Field>
                  <Label>Username</Label>
                  <Control>
                    <Input value={this.state.username} onChange={this.updateUsername} placeholder="nightryder69" />
                  </Control>
                </Field>
                <Field>
                  <Label>Password</Label>
                  <Control>
                    <Input value={this.state.password} onChange={this.updatePassword} type="password" placeholder="hunter2" />
                  </Control>
                </Field>
                <Field>
                  <Columns isMobile>
                    <Column className="is-expanded" />
                    <Column className="is-narrow">
                      <Button
                        isColor="info"
                        onClick={this.logIn}
                        isLoading={this.state.loading}
                      >
                        Log in
                      </Button>
                    </Column>
                  </Columns>
                </Field>
              </CardContent>
            </Card>
          </Container>
        </HeroBody>
      </Hero>
    );
  }
}

export default withRouter(Home);
