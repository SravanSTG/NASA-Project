const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.models");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://nasa-admin:brv603pqrRtvMNxa@nasacluster.b8jj8oq.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}
startServer();
