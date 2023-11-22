/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
      id
      username
      password
      fullname
      address
      state
      zipcode
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
      id
      username
      password
      fullname
      address
      state
      zipcode
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
      id
      username
      password
      fullname
      address
      state
      zipcode
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBooks = /* GraphQL */ `
  mutation CreateBooks(
    $input: CreateBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    createBooks(input: $input, condition: $condition) {
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
export const updateBooks = /* GraphQL */ `
  mutation UpdateBooks(
    $input: UpdateBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    updateBooks(input: $input, condition: $condition) {
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
export const deleteBooks = /* GraphQL */ `
  mutation DeleteBooks(
    $input: DeleteBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    deleteBooks(input: $input, condition: $condition) {
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
