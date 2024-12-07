const { uploadPredictHandler, getPredictHandler } = require("../controllers")

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: uploadPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        maxBytes: 1000000,
        multipart: true,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: getPredictHandler,
  },
];

module.exports = routes;
