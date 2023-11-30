import * as dotEnv from "dotenv";
import * as process from "process";

const CONFIG_FILE_NAME: string = "../../config/env.config.yaml";

/**
 * Loads and returns the configuration from the YAML file.
 *
 * @returns {Record<string, any>} - The loaded configuration object.
 */
export default (): Record<string, any> => {
    const envFile = dotEnv.config();
    // const schema = Joi.object({
    //     PORT: Joi.number().required(),
    //     NODE_ENV: Joi.string()
    //         .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
    //         .required(),
    //     // database validate
    //     DB_NAME: Joi.string().required(),
    //     DB_HOST: Joi.string().required(),
    //     DB_PORT: Joi.number().required(),
    //     DB_USER: Joi.string().required(),
    //     DB_PASSWORD: Joi.string().required(),
    //     DB_CERTIFICATE: Joi.string().required(),
    //     STORAGE_BUCKET_KEY: Joi.string().required(),
    //     STORAGE_BUCKET_SECRET: Joi.string().required(),
    //     STORAGE_BUCKET_ENDPOINT: Joi.string().required(),
    //     STORAGE_BUCKET_CDN_ENDPOINT: Joi.string().required(),
    //     JWT_SECRET: Joi.string().required()
    // });
    //
    // validateConfig(configuration, schema);

    return process.env;
}