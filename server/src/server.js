const http = require("http");

require("dotenv").config();

const app = require("./app");
const { connectMongo } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.models");
const { loadLaunchesData } = require("./models/launches.models");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectMongo();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}
startServer();
