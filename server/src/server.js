const http = require("http");

const app = require("./app");
const { connectMongo } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.models");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectMongo();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}
startServer();
