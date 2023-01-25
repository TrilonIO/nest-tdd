import { BadRequestException } from '@nestjs/common';

export class MissingRequiredFieldException extends BadRequestException {
  constructor(missingField: string) {
    super({
      errors: [`${missingField} is required`],
    });
  }
}
