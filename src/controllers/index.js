const { predictClassification, getClassification } = require("../services");

const uploadPredictHandler = async (req, h) => {
  const { image } = req.payload;
  const { model } = req.server.app;
  try {
    const predict = await predictClassification(model, image);

    return h
      .response({
        status: "success",
        message: "Model is predicted successfully",
        data: predict,
      })
      .code(201);
  } catch (err) {
    if(err.message === "No image provided in the payload.") {
      return h.response({
        status : "fail",
        message : err.message
      }).code(400)
    } else {
      return h.response({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      }).code(400);
    }
  }
};

const getPredictHandler = async (req, h) => {
  try {
    const getPredictHistory = await getClassification();
    return h
      .response({
        status: "success",
        data: getPredictHistory,
      })
      .code(200);
  } catch (err) {
    return h.response({
      status: "fail",
      message: err.message,
    }).code(500);
  }
};

module.exports = {
    uploadPredictHandler,
    getPredictHandler
}