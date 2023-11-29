import {join} from "path";
import * as Joi from "joi";
import {NodeEnv} from "../../shared/constant/node-env";
import {validateConfig} from "../../shared/util/validate-config";
import loadYamlConfigFile from "../../shared/util/load-yaml-config-file";

const CONFIG_FILE_NAME: string = "../../config/env.config.yaml";

/**
 * Loads and returns the configuration from the YAML file.
 *
 * @returns {Record<string, any>} - The loaded configuration object.
 */
export default (): Record<string, any> => {
    const configuration = loadYamlConfigFile(
        join(__dirname, CONFIG_FILE_NAME)
    );

    const schema = Joi.object({
        port: Joi.number().required(),
        node_env: Joi.string()
            .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
            .required(),
        db: Joi.object({
            database: Joi.string().required(),
            host: Joi.string().required(),
            port: Joi.number().required(),
            user: Joi.string().required(),
            password: Joi.string().required(),
            certificate: Joi.string().required()
        }),
        storage_bucket: Joi.object({
            key: Joi.string().required(),
            secret: Joi.string().required(),
            endpoint: Joi.string().required(),
            cdn_endpoint: Joi.string().required()
        }),
        jwt_secret: Joi.string().required()
    });

    validateConfig(configuration, schema);

    return configuration;
}