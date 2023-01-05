import { Patient } from '../patient.model';

export interface PatientInput {
  name: string;
}
export interface SavePatientRepository {
  save(patientInput: PatientInput): Promise<Patient>;
}
