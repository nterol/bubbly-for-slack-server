require("dotenv").config();
const { createEventAdapter } = require("@slack/events-api");

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

const port = process.env.PORT || 9000;

const app = require("express")();

app.use("/slack/events", slackEvents.expressMiddleware());

slackEvents.on("message", event => {
  console.log("EVENT", event);
  console.log(
    `Received a message: user ${event.user} in channel ${event.channel}`
  );
});

slackEvents.on("error", console.error);

slackEvents.start(port).then(() => {
  console.log(`server listening on port: ${port}`);
});
