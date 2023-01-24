import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { RegisterPatientDto } from './dtos';

@Controller('patients')
export class PatientsController {
  private readonly patients: any[] = [];
  @Post()
  public async registerPatient(
    @Body() registerPatientInput: RegisterPatientDto,
  ) {
    const patientAlreadyExists = this.patients.find(
      (patient) => patient.email === registerPatientInput.email,
    );

    if (patientAlreadyExists) {
      throw new ConflictException({
        error: `Email ${registerPatientInput.email} is already in use`,
      });
    }

    const newPatient = {
      id: 1,
      name: registerPatientInput.name,
      email: registerPatientInput.email,
    };

    this.patients.push(newPatient);

    return newPatient;
  }
}
