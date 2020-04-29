import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const httpLink = createHttpLink({
    //ISSUE: https://github.com/apollographql/apollo-link/issues/513
    uri: "http://localhost:4000",
    fetch: fetch,
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
export { client };
