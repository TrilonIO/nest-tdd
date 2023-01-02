import { PatientModel } from '../patient.model';
import { PatientByIdRepository } from './patient-by-id.repository';
import {
  SavePatientData,
  SavePatientRepository,
} from './save-patient.repository';

export class InMemoryPatientRepository
  implements SavePatientRepository, PatientByIdRepository
{
  async findById(id: number): Promise<PatientModel> {
    return {
      name: 'John Doe',
      id,
    };
  }

  async save(patientData: SavePatientData): Promise<PatientModel> {
    return {
      name: patientData.name,
      id: 1,
    };
  }
}
