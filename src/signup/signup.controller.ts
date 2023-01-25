import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { MissingRequiredFieldException } from '../shared/missing-required-field.exception';
import { SignupDto } from './signup.dto';

@Controller('signup')
export class SignupController {
  @Post()
  public async signup(@Body() signupDto: SignupDto) {
    if (!signupDto.name) {
      throw new MissingRequiredFieldException('name');
    }

    if (typeof signupDto.name !== 'string') {
      throw new BadRequestException({
        errors: ['name must be a string'],
      });
    }

    if (!signupDto.password) {
      throw new MissingRequiredFieldException('password');
    }

    if (!signupDto.passwordConfirmation) {
      throw new MissingRequiredFieldException('passwordConfirmation');
    }

    throw new MissingRequiredFieldException('email');
  }
}
