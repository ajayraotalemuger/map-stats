const fastify = require("fastify")({ logger: true });
const path = require('node:path');

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "geoJsons"),
  prefix: "/geoJsons/",
});

fastify.get("/geoJsons/indianStates", (req, res) => {
  res.sendFile("./states_india.geojson");
});

fastify.listen({ port: 3005 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
