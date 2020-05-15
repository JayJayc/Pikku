import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import {
    SubscriptionClient,
    addGraphQLSubscriptions,
} from "subscriptions-transport-ws";

// Create an http link:
const httpLink = createHttpLink({
    //ISSUE: https://github.com/apollographql/apollo-link/issues/513
    uri: "http://localhost:4000",
    fetch: fetch,
});
// Create a WebSocket link:
const wsLink = process.browser
    ? new WebSocketLink(
          new SubscriptionClient(`ws://localhost:4000/graphql`, {
              reconnect: true,
          })
      )
    : null;

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = process.browser
    ? split(
          // split based on operation type
          ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                  definition.kind === "OperationDefinition" &&
                  definition.operation === "subscription"
              );
          },
          wsLink,
          httpLink
      )
    : httpLink;

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});
export { client };
