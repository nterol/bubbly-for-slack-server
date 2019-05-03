import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server-express";
import { merge } from "lodash";

const Query = gql`
  type Query {
    status: String
  }
  type event {
    client_msg_id: String!
    type: String!
    text: String!
    user: String!
    ts: String!
    channel: String!
    event_ts: String!
    channel_type: String!
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

let resolvers = {
  Query: {
    status: () => "ok"
  }
};

const typeDefs = [Query, Mutation];

fs.readdirSync(__dirname)
  .filter(dir => dir.indexOf(".") < 0)
  .forEach(dir => {
    const tmp = require(path.join(__dirname, dir)).default;
    resolvers = merge(resolvers, tmp.resolvers);
    typeDefs.push(tmp.types);
  });

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "light"
    }
  }
});
