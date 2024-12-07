const { predictCollection } = require("../config");

const loadData = async () => {
  try {
    const predictHistory = [];
    const predictData = await predictCollection.get();

    predictData.forEach((data) => {
      predictHistory.push({
        id: data.id,
        history: data.data(),
      });
    });

    return predictHistory;
  } catch (err) {
    throw new Error(err);
  }
};

const storeData = async (id, data) => {
  try {
    await predictCollection.doc(id).set(data);
    return { status: "success", message: "Data stored successfully..." };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  loadData,
  storeData,
};
