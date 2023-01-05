import { Patient } from '../patient.model';

export interface PatientByIdRepository {
  findById(patientId: number): Promise<Patient>;
}
