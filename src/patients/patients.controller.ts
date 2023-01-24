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

    if (!registerPatientInput.email) {
      throw new BadRequestException({
        errors: {
          body: ['email is required'],
        },
      });
    }

    return {
      id: 1,
      name: registerPatientInput.name,
      email: registerPatientInput.email,
    };
  }
}
