import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({ name: 'isHHmmAA', async: false })
export class IsHHmmAAConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean {
        // Regular expression to match the format HH:mm AM/PM
        const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
        return timeRegex.test(value);
    }

    defaultMessage(): string {
        return 'Invalid time format. Please provide time in HH:mm AM/PM format.';
    }
}


export function IsHHmmAA(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isHHmmAA',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsHHmmAAConstraint,
        });
    };
}