import { Injectable } from '@nestjs/common';
import { PatientModel } from './patient.model';

export interface PatientInput {
  name: string;
}

@Injectable()
export class PatientService {
  register(patientData: PatientInput): PatientModel {
    return {
      id: 1,
      name: patientData.name,
    };
  }
}
