import { PatientModel } from '../patient.model';

export interface SavePatientData {
  name: string;
}

export abstract class SavePatientRepository {
  abstract save(patientData: SavePatientData): Promise<PatientModel>;
}
