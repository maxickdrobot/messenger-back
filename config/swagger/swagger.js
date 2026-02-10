import path from "path";
import { fileURLToPath } from "url";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerApiDoc = YAML.load(path.join(__dirname, "swagger.yaml"));

export { swaggerUI, swaggerApiDoc };
