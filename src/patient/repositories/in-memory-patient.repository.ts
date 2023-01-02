import { PatientModel } from '../patient.model';
import {
  SavePatientData,
  SavePatientRepository,
} from './save-patient.repository';

export class InMemoryPatientRepository implements SavePatientRepository {
  async save(patientData: SavePatientData): Promise<PatientModel> {
    return {
      name: patientData.name,
      id: 1,
    };
  }
}
