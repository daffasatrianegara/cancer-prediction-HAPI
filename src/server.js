const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const { port, host, loadModelMl } = require("./config");
const InputError = require("./utils/inputError")

require("dotenv").config();


(async () => {
  const server = Hapi.server({
    port: port || 8080,
    host: host || "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  
  const model = await loadModelMl();
  if (!model) {
    throw new Error("Failed to load the machine learning model...");
  }
  
  server.app.model = model;
  
  server.route(routes);
  server.ext("onPreResponse", function (request, h) {
    const response = request.response;
    if (response instanceof InputError) {
      const newResponse = h.response({
        status: "fail",
        message: `${response.message}`,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }
    return h.continue;
  });
  
  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();