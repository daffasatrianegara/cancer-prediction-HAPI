const tf = require("@tensorflow/tfjs-node");
const generateId = require("../utils/generateId.js");
const { storeData, loadData } = require("../repositories");

const predictClassification = async (model, image) => {
  if (!image) {
    throw new Error("No image provided in the payload.");
  }

  const id = await generateId();
  const createdAt = new Date().toISOString();

  const tensor = tf.node
    .decodeImage(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  const prediction = model.predict(tensor);
  const resultScore = await prediction.data();

  const confidenceScore = Math.max(...resultScore) * 100;

  let label;
  let suggestion;
  if (confidenceScore < 50) {
    label = "Non-cancer";
    suggestion = "Penyakit kanker tidak terdeteksi.";
  } else {
    label = "Cancer";
    suggestion = "Segera periksa ke dokter!";
  }

  const data = {
    id,
    result: label,
    suggestion,
    createdAt,
  };

  console.time('storeData'); 
  await storeData(id, data);  

  return data;
};

const getClassification = async () => {
  const data = await loadData();
  return data;
};

module.exports = {
  predictClassification,
  getClassification,
};
