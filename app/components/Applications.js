// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';
import { Card, CardContent, Button, Table, Section, Container } from 'bloomer';

const GET_APPLICATIONS = gql`
query {
  Applications(page: 1, page_size: 3) {
    data {
      id
      status {
        id
        name
      }
      user {
        id
        firstname
        lastname
      }
    }
  }
}
`;


const UPDATE_STATUS = gql`
mutation ($a: ID!, $s: ID!) {
  updateApplicationStatus(application_id: $a, new_status: $s) {
    id
    status {
      id
      name
    }
  }
}
`;

const wrap = (inner) => (
  <Section>
    <Container>
      <Card>
        <CardContent>{inner}</CardContent>
      </Card>
    </Container>
  </Section>
);

class Applications extends Component<Props> {
  props: Props;

  renderApplication = (application) => {
    const { firstname, lastname } = application.user;
    const status = (application.status && application.status.name) || 'Pending';
    const name = `${firstname} ${lastname}`;
    return (
      <tr key={application.id}>
        <td style={{ width: '100%' }}>{name}</td>
        <td style={{ width: '100%' }}>{status}</td>
        <td>{ this.getButton(application, true) }</td>
        <td>{ this.getButton(application, false) }</td>
      </tr>
    );
  };

  getButton = ({ id, status }, accept) => {
    const color = accept ? 'success' : 'danger';
    const text = accept ? 'Accept' : 'Reject';
    const newStatus = accept ? '1' : '2';
    return status ? '' : <Button onClick={() => this.updateStatus(id, newStatus)} isSize="small" isColor={color}>{text}</Button>;
  }

  updateStatus = async (a, s) => {
    try {
      await this.props.mutate({
        variables: { a, s }
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      wrap(<Query query={GET_APPLICATIONS}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...';
          }
          if (error) {
            return `Error... ${error}`;
          }
          console.log(data);
        return (
          <Table isStriped isFullWidth>
            <thead>
              <tr>
                <th>Applicant name</th>
                <th colSpan="3">Application status</th>
              </tr>
            </thead>
            <tbody>
              { data.Applications.data.map(this.renderApplication) }
            </tbody>
          </Table>
        );
        }}
      </Query>)
    );
  }
}

export default graphql(UPDATE_STATUS)(Applications);
