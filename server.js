import express from "express";
import cors from "cors";
import apollo from "./graphql";
import config from "./config";

const app = express();

function setPort(port = 8000) {
  app.set("port", parseInt(port, 10));
}

function listen() {
  const port = app.get("port") || config.port;
  app.listen(port, () => {
    console.log(
      `The server is running and listening at http://localhost:${port}`
    );
  });
}

app.use(
  cors({
    origin: config.corsDomain,
    optionSuccessStatus: 200
  })
);

app.get("/api/status", (req, res) => {
  res.send({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send(
    '<div style="display:flex;flex-direction:column; margin: 50px auto;"><h1>Bonjour</h1><p> vous avez demandé le server bubbly,</p><p> ne quittez pas un conseillez va vous répondre</p></div>'
  );
});

apollo(app);

export default {
  getApp: () => app,
  setPort,
  listen
};
