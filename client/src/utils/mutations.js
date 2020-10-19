import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// BookInput is defined in server/schemas/typeDefs.js as follows:
// {
//   authors: [String]
//   description: String
//   bookId: String
//   image: String
//   link: String
//   title: String
// }
export const SAVE_BOOK = gql`
  mutation saveBook($bookBody:BookInput!) {
    saveBook (bookBody:$bookBody){
      _id
      username
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

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId:String!) {
    removeBook (bookId:$bookId){
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