// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query, graphql } from 'react-apollo';
import { Card, CardContent, Button, Table, Section, Container } from 'bloomer';

import Paginate from './Paginate';
import { GET_APPLICATIONS } from './../graphql/queries';
import { UPDATE_STATUS } from './../graphql/mutations';

class Applications extends Component<Props> {
  props: Props;

  state = {
    initialFetch: true
  }

  nextPage = async () => {
    const current = this.props.data.Applications;
    const page = current.page + 1;
    const { lastPage } = current;
    if (page > lastPage) {
      return;
    }
    const newPage = await this.props.data.refetch({ page });
    console.log(newPage);
  };

  prevPage = async () => {
    const page = this.props.data.Applications.page - 1;
    if (page < 1) {
      return;
    }
    const newPage = await this.props.data.refetch({ page });
    console.log(newPage);
  };

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
    if (status) {
      return '';
    }
    return (
      <Button
        onClick={() => this.updateStatus(id, newStatus)}
        isSize="small"
        isColor={color}
      >
        {text}
      </Button>
    );
  }

  updateStatus = async (a, s) => {
    try {
      await this.props.mutate({
        variables: { a, s }
      });
    } catch (err) {
      console.log(err);
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Section>
        <Container>
          <Paginate nextPage={this.nextPage} prevPage={this.prevPage} />
          <Card>
            <CardContent>
              {(() => {
              const { data } = this.props;
              if (data.loading && !data.Applications) {
                return 'Loading...';
              }

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
              })()}
            </CardContent>
          </Card>
        </Container>
      </Section>
    );
  }
}

export default graphql(UPDATE_STATUS)(graphql(GET_APPLICATIONS, {
  options: {
    variables: {
      page: 1,
      page_size: 10
    }
  }
})(Applications));
