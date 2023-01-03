import { Provider } from '@nestjs/common';
import {
  CLEAR_PATIENTS_REPOSITORY,
  PATIENT_BY_ID_REPOSITORY,
  SAVE_PATIENT_REPOSITORY,
} from '../constants';
import { InMemoryPatientRepository } from '../repositories/in-memory-patient.repository';

const inMemoryPatientRepository = new InMemoryPatientRepository();

export const inMemorySavePatientRepositoryProvider: Provider = {
  provide: SAVE_PATIENT_REPOSITORY,
  useValue: inMemoryPatientRepository,
};

export const inMemoryPatientByIdRepositoryProvider: Provider = {
  provide: PATIENT_BY_ID_REPOSITORY,
  useValue: inMemoryPatientRepository,
};

export const inMemoryClearPatientsRepositoryProvider: Provider = {
  provide: CLEAR_PATIENTS_REPOSITORY,
  useValue: inMemoryPatientRepository,
};
