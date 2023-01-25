import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

@Controller('signup')
export class SignupController {
  @Post()
  public async signup(@Body() signupDto: any) {
    if (!signupDto.name) {
      throw new BadRequestException({
        errors: ['name is required'],
      });
    }

    if (!signupDto.password) {
      throw new BadRequestException({
        errors: ['password is required'],
      });
    }

    if (!signupDto.passwordConfirmation) {
      throw new BadRequestException({
        errors: ['passwordConfirmation is required'],
      });
    }

    throw new BadRequestException({
      errors: ['email is required'],
    });
  }
}
