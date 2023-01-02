import { PatientModel } from '../patient.model';
import { PatientByIdRepository } from './patient-by-id.repository';
import {
  SavePatientData,
  SavePatientRepository,
} from './save-patient.repository';

export class InMemoryPatientRepository
  implements SavePatientRepository, PatientByIdRepository
{
  private lastId = 0;

  constructor(private patients: PatientModel[] = []) {}

  async findById(id: number): Promise<PatientModel> {
    return this.patients.find((patient) => patient.id === id);
  }

  async save(patientData: SavePatientData): Promise<PatientModel> {
    this.lastId++;

    const newPatient = {
      name: patientData.name,
      id: this.lastId,
    };

    this.patients.push(newPatient);

    return newPatient;
  }
}
