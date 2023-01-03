import { PatientModel } from '../patient.model';

export interface PatientInput {
  name: string;
}
export interface SavePatientRepository {
  save(patientData: PatientInput): Promise<PatientModel>;
}
