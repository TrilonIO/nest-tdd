import { BadRequestException, Controller, Post } from '@nestjs/common';

@Controller('signup')
export class SignupController {
  @Post()
  public async signup() {
    throw new BadRequestException({
      errors: ['email is required'],
    });
  }
}
