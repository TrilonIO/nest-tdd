import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
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
  }
}
