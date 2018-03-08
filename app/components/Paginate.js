import React, { Component } from 'react';
import { Pagination, PageControl } from 'bloomer';

class Paginate extends Component<Props> {
  props: Props;

  prevPage = () => {
    this.props.prevPage();
  }

  nextPage = () => {
    this.props.nextPage();
  }

  render() {
    return (
      <Pagination isSize="small">
        <PageControl onClick={this.prevPage}>Previous</PageControl>
        <PageControl isNext onClick={this.nextPage}>Next</PageControl>
      </Pagination>
    );
  }
}

export default Paginate;
