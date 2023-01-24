import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

@Controller('patients')
export class PatientsController {
  @Post()
  public async registerPatient(@Body() registerPatientInput: any) {
    if (!registerPatientInput.name) {
      throw new BadRequestException({
        errors: {
          body: ['name is required'],
        },
      });
    }

    throw new BadRequestException({
      errors: {
        body: ['email is required'],
      },
    });
  }
}
