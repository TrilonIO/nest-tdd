import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterPatientDto } from './dtos';
import { PatientModel } from './patient.model';

@Injectable()
export class PatientsService {
  private readonly patients: PatientModel[] = [];
  private nextId = 1;

  public async registerPatient(registerPatientInput: RegisterPatientDto) {
    const patientAlreadyExists = this.patients.find(
      (patient) => patient.email === registerPatientInput.email,
    );

    if (patientAlreadyExists) {
      throw new ConflictException({
        error: `Email ${registerPatientInput.email} is already in use`,
      });
    }

    const newPatient = {
      id: this.nextId++,
      name: registerPatientInput.name,
      email: registerPatientInput.email,
    };

    this.patients.push(newPatient);

    return newPatient;
  }
}
