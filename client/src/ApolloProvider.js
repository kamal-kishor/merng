import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

const httpLink = createHttpLink({
  uri: "http://localhost:3030/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ApolloProviderWrapper = () => (
  // Wrap the content in a functional component
  <ApolloHooksProvider client={client}>
    <App />
  </ApolloHooksProvider>
);

export default ApolloProviderWrapper; // Export the functional component
