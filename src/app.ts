import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes/routes";

const port = config.get<number>('port')

const app = express();


app.use(express.json());


app.listen(port, '0.0.0.0', async () => {
    logger.info(`Backend started at ${port}`);

    await connect();

    routes(app);
});


console.log("starting with typescript with node");