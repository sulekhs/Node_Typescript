import mongoose from "mongoose";
import config from 'config';
import logger from "./logger";

const connect = async () => {
    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri);
        logger.info('Connceted to MongoDB')
    } catch (err) {
        logger.error("mongoDB cannot be connected!");
        process.exit(1);
    }
};

export default connect;
