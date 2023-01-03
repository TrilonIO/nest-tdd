import { Injectable } from '@nestjs/common';
import { PatientModel } from './patient.model';

export interface PatientInput {
  name: string;
}

@Injectable()
export class PatientService {
  public async register(patientData: PatientInput): Promise<PatientModel> {
    return {
      id: 1,
      name: patientData.name,
    };
  }

  public async doesPatientExist(_patientId: number): Promise<boolean> {
    return false;
  }
}
