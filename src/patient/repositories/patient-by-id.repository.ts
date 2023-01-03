import { PatientModel } from '../patient.model';

export interface PatientByIdRepository {
  findById(patientId: number): Promise<PatientModel>;
}
