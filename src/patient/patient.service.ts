import { Injectable } from '@nestjs/common';
import { PatientModel } from './patient.model';
import { SavePatientRepository } from './repositories/save-patient.repository';

export interface PatientInput {
  name: string;
}

@Injectable()
export class PatientService {
  constructor(private readonly savePatientRepository: SavePatientRepository) {}

  public async register(patientData: PatientInput): Promise<PatientModel> {
    return await this.savePatientRepository.save(patientData);
  }
}
