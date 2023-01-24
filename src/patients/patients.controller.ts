import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPatientDto } from './dtos';

@Controller('patients')
export class PatientsController {
  @Post()
  public async registerPatient(
    @Body() registerPatientInput: RegisterPatientDto,
  ) {
    return {
      id: 1,
      name: registerPatientInput.name,
      email: registerPatientInput.email,
    };
  }
}
