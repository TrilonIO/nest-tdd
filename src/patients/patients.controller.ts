import { BadRequestException, Controller, Post } from '@nestjs/common';

@Controller('patients')
export class PatientsController {
  @Post()
  public async registerPatient() {
    throw new BadRequestException({
      errors: {
        body: ['name is required'],
      },
    });
  }
}
