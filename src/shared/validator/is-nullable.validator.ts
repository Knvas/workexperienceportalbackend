import { ValidateIf, ValidationOptions } from "class-validator";

/**
 * Conditional validator which checks if a value is defined,
 * before further validation is performed.
 *
 * @param {ValidationOptions} [validationOptions] - The validation options.
 * @returns {PropertyDecorator} - The validator function.
 */
export function IsNullable(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_object, value) => !!(value), validationOptions);
}