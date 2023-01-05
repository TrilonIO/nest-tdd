import { Inject, Injectable } from '@nestjs/common';
import { PATIENT_BY_ID_REPOSITORY, SAVE_PATIENT_REPOSITORY } from './constants';
import { Patient } from './patient.model';
import { PatientByIdRepository } from './repositories/patient-by-id.repository';
import { SavePatientRepository } from './repositories/save-patient.repository';

export interface PatientInput {
  name: string;
}

@Injectable()
export class PatientService {
  constructor(
    @Inject(SAVE_PATIENT_REPOSITORY)
    private readonly savePatientRepository: SavePatientRepository,
    @Inject(PATIENT_BY_ID_REPOSITORY)
    private readonly patientByIdRepository: PatientByIdRepository,
  ) {}

  public async register(patientData: PatientInput): Promise<Patient> {
    return await this.savePatientRepository.save(patientData);
  }

  public async doesPatientExist(patientId: number): Promise<boolean> {
    const patient = await this.patientByIdRepository.findById(patientId);
    return Boolean(patient);
  }
}
