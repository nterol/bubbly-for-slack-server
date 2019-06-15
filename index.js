require("dotenv").config();
import { createEventAdapter } from "@slack/events-api";

const app = require("express")();
import { ApolloServer } from "apollo-server-express";
const { execute, subscribe } = require("graphql");
import { createServer } from "http";
import typeDefs from "./schema";
import cors from "cors";
import resolvers from "./resolvers";

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

export const schema = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphiql",
    settings: {
      "editor.theme": "light"
    }
  }
});

const port = process.env.PORT || 9000;
const slackPort = process.env.SLACK_PORT || 9001;

const graphqlEndpoint = "/graphql";

app.use("/slack/events", slackEvents.expressMiddleware());

slackEvents.on("message", event => {
  console.log("EVENT", event);
  console.log(
    `Received a message: user ${event.user} in channel ${event.channel}`
  );
});

slackEvents.on("error", console.error);

slackEvents.start(slackPort).then(() => {
  console.log(`server listening on port: ${port}`);
});
