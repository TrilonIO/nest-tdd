import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { SignupDto } from './signup.dto';

@Controller('signup')
export class SignupController {
  @Post()
  public async signup(@Body() signupDto: SignupDto) {
    if (signupDto.password !== signupDto.passwordConfirmation) {
      throw new BadRequestException({
        errors: ['password and passwordConfirmation must match'],
      });
    }

    if (!isEmail(signupDto.email)) {
      throw new BadRequestException({
        errors: ['email must be a valid email address'],
      });
    }
  }
}
