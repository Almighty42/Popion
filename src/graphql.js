import gql from 'graphql-tag'
// GQL
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        username
        userId
      }
      likeCount
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      userId
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login( $username: String! $password: String! ) {
    login(
        username: $username
        password: $password
    ) {
      id
      email
      username
      token
    }
  }
`;
export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $id: ID
    $password: String
  ) {
    updateUser(
      updateInput: {
        username: $username
        email: $email
        id: $id
        password: $password
      }
    ) {
      id
      email
      username
      token
      postsData
    }
  }
`;
export const FETCH_USERS = gql`
    query getUsers {
        getUsers {
            id
        }
    }
`
export const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!,$userId: ID!) {
    likePost(postId: $postId,userId: $userId) {
      id
      likes {
        id
        username
        userId
      }
      likeCount
    }
  }
`;
export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;