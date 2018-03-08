import { gql } from 'apollo-boost';

export default {
  GET_APPLICATIONS: gql`
  query {
    Applications(page: 1, page_size: 3) {
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
