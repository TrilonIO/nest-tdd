import { Injectable } from '@nestjs/common';
import { PatientModel } from './patient.model';

export interface PatientInput {
  name: string;
}

@Injectable()
export class PatientService {
  private readonly patients: PatientModel[] = [];

  public async register(patientData: PatientInput): Promise<PatientModel> {
    const newPatient = {
      id: 1,
      name: patientData.name,
    };

    this.patients.push(newPatient);

    return newPatient;
  }

  public async doesPatientExist(patientId: number): Promise<boolean> {
    return this.patients.some((patient) => patient.id === patientId);
  }
}
