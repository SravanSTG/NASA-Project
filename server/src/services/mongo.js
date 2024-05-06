const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-admin:brv603pqrRtvMNxa@nasacluster.b8jj8oq.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectMongo() {
  await mongoose.connect(MONGO_URL);
}

async function disconnectMongo() {
  await mongoose.disconnect();
}

module.exports = {
  connectMongo,
  disconnectMongo,
};
