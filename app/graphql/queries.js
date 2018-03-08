import { gql } from 'apollo-boost';

export default {
  GET_APPLICATIONS: gql`
  query ($page: Int!, $page_size: Int!) {
    Applications(page: $page, page_size: $page_size) {
      page
      total
      lastPage
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
  `
};
