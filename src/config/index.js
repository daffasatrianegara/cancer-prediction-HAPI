const { Firestore } = require("@google-cloud/firestore");
const tf = require("@tensorflow/tfjs-node");
const path = require("path");

const pathKey = path.resolve("submissionmlgc-daffasatria-8c2dbbf49c50.json");
require("dotenv").config();
const db = new Firestore({
  projectId: String(process.env.PROJECT_ID),
  keyFilename: pathKey,
});

const predictCollection = db.collection("predictions");
const port = Number(process.env.PORT) || 8080;
const host = String(process.env.HOST) || "localhost";
const modelUrl = String(process.env.MODEL_URL);

const loadModelMl = async (model = modelUrl) => {
  const load = await tf.loadGraphModel(model);
  return load;
};

module.exports = {
  port,
  host,
  predictCollection,
  loadModelMl,
};
