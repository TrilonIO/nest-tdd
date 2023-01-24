import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPatientDto } from './dtos';

@Controller('patients')
export class PatientsController {
  private readonly patients: any[] = [];
  @Post()
  public async registerPatient(
    @Body() registerPatientInput: RegisterPatientDto,
  ) {
    const newPatient = {
      id: 1,
      name: registerPatientInput.name,
      email: registerPatientInput.email,
    };

    this.patients.push(newPatient);

    return newPatient;
  }
}
