import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  inMemoryClearPatientsRepositoryProvider,
  inMemoryPatientByIdRepositoryProvider,
  inMemorySavePatientRepositoryProvider,
} from './repositories/in-memory-patient-repository.provider';

@Module({
  providers: [
    PatientService,
    inMemorySavePatientRepositoryProvider,
    inMemoryPatientByIdRepositoryProvider,
    inMemoryClearPatientsRepositoryProvider,
  ],
  exports: [PatientService, inMemoryClearPatientsRepositoryProvider],
})
export class PatientModule {}
