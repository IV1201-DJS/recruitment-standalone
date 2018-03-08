import { gql } from 'apollo-boost';

export default {
  UPDATE_STATUS: gql`
  mutation ($a: ID!, $s: ID!) {
    updateApplicationStatus(application_id: $a, new_status: $s) {
      id
      status {
        id
        name
      }
    }
  }
  `
};
