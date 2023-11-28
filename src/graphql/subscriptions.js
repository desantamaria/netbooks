/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onCreateAccount(filter: $filter) {
      id
      password
      fullname
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onUpdateAccount(filter: $filter) {
      id
      password
      fullname
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount($filter: ModelSubscriptionAccountFilterInput) {
    onDeleteAccount(filter: $filter) {
      id
      password
      fullname
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBooks = /* GraphQL */ `
  subscription OnCreateBooks($filter: ModelSubscriptionBooksFilterInput) {
    onCreateBooks(filter: $filter) {
      id
      title
      isbn
      author
      subject
      account
      rentalTerm
      rental_fee
      overdue_fee
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBooks = /* GraphQL */ `
  subscription OnUpdateBooks($filter: ModelSubscriptionBooksFilterInput) {
    onUpdateBooks(filter: $filter) {
      id
      title
      isbn
      author
      subject
      account
      rentalTerm
      rental_fee
      overdue_fee
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBooks = /* GraphQL */ `
  subscription OnDeleteBooks($filter: ModelSubscriptionBooksFilterInput) {
    onDeleteBooks(filter: $filter) {
      id
      title
      isbn
      author
      subject
      account
      rentalTerm
      rental_fee
      overdue_fee
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
