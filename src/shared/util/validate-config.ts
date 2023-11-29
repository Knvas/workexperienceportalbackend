/**
 * Validates a configuration object against the defined schema.
 *
 * @param {Record<any, any>} config - The application configuration object to validate.
 * @param {any} schema - The Joi schema use for validation of the config.
 * @returns {void} - Throws an Error if the configuration is invalid.
 * @throws {Error} - Throws an Error if the configuration is invalid.
 */
export function validateConfig(config: Record<any, any>, schema: any): void {

  const { error } = schema.validate(
    config,
    { abortEarly: false }
  );

  if (!error) return;

  throw new Error(`Failed configuration validation: ${error.message}`);
}