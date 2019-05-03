const commonConfig = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 9000,
  slackPort: parseInt(process.env.SLACK_PORT, 10) || 9001,
  corsDomain: process.env.CORS_DOMAIN,
  slackSigningSecret: process.env.SLACK_SIGNING_SECRET
};

export default commonConfig;
