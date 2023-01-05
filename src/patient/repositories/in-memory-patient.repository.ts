import { Patient } from '../patient.model';
import { ClearPatientsRepository } from './clear-patients.repository';
import { PatientByIdRepository } from './patient-by-id.repository';
import { PatientInput, SavePatientRepository } from './save-patient.repository';

export class InMemoryPatientRepository
  implements
    SavePatientRepository,
    PatientByIdRepository,
    ClearPatientsRepository
{
  private readonly patients: Patient[] = [];
  private nextId = 1;

  public async save(patientData: PatientInput): Promise<Patient> {
    const newPatient = {
      id: this.nextId++,
      name: patientData.name,
    };

    this.patients.push(newPatient);

    return newPatient;
  }

  public async findById(patientId: number): Promise<Patient> {
    return this.patients.find((patient) => patient.id === patientId);
  }

  public async clear(): Promise<void> {
    this.patients.length = 0;
  }
}
