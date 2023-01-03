import { Provider } from '@nestjs/common';
import {
  CLEAR_PATIENTS_REPOSITORY,
  PATIENT_BY_ID_REPOSITORY,
  SAVE_PATIENT_REPOSITORY,
} from '../constants';
import { SequelizePatientRepository } from '../repositories/sequelize/sequelize-patient.repository';

export const sequelizeSavePatientRepositoryProvider: Provider = {
  provide: SAVE_PATIENT_REPOSITORY,
  useClass: SequelizePatientRepository,
};

export const sequelizePatientByIdRepositoryProvider: Provider = {
  provide: PATIENT_BY_ID_REPOSITORY,
  useClass: SequelizePatientRepository,
};

export const sequelizeClearPatientsRepositoryProvider: Provider = {
  provide: CLEAR_PATIENTS_REPOSITORY,
  useClass: SequelizePatientRepository,
};
