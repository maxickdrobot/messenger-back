const path = require("path");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerApiDoc = YAML.load(path.join(__dirname + "/swagger.yaml"));

module.exports = {
    swaggerUI,
    swaggerApiDoc,
};
