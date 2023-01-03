import { InjectModel } from '@nestjs/sequelize';
import { PatientModel } from '../../patient.model';
import {
  PatientInput,
  SavePatientRepository,
} from '../save-patient.repository';
import { SequelizePatient } from './sequelize-patient.model';

export class SequelizePatientRepository implements SavePatientRepository {
  constructor(
    @InjectModel(SequelizePatient)
    private readonly patientModel: typeof SequelizePatient,
  ) {}

  async save(patientData: PatientInput): Promise<PatientModel> {
    const patientInDb = await this.patientModel.create({
      name: patientData.name,
    });

    return patientInDb.get();
  }
}
