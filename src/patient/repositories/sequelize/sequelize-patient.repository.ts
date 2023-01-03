import { InjectModel } from '@nestjs/sequelize';
import { PatientModel } from '../../patient.model';
import { PatientByIdRepository } from '../patient-by-id.repository';
import {
  PatientInput,
  SavePatientRepository,
} from '../save-patient.repository';
import { SequelizePatient } from './sequelize-patient.model';

export class SequelizePatientRepository
  implements SavePatientRepository, PatientByIdRepository
{
  constructor(
    @InjectModel(SequelizePatient)
    private readonly patientModel: typeof SequelizePatient,
  ) {}

  public async save(patientData: PatientInput): Promise<PatientModel> {
    const patientInDb = await this.patientModel.create({
      name: patientData.name,
    });

    return patientInDb.get();
  }

  public async findById(patientId: number): Promise<PatientModel> {
    const patientInDb = await this.patientModel.findByPk(patientId);

    return patientInDb?.get();
  }
}
