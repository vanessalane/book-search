import gql from 'graphql-tag';

export const GET_ME = gql`
  query {
    me {
      _id
      username
      bookCount
      savedBooks {
        bookId
      }
    }
  }
`;

export const GET_ME_DETAIL = gql`
  query {
    me {
      _id
      username
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
