import { PatientModel } from '../patient.model';

export abstract class PatientByIdRepository {
  abstract findById(id: number): Promise<PatientModel>;
}
