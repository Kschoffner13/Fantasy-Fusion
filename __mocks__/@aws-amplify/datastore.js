// __mocks__/@aws-amplify/datastore.js

const DataStore = {
    save: jest.fn(),
    query: jest.fn(),
    delete: jest.fn(),
    // You can add other methods if needed
  };
  
  module.exports = { DataStore };
  