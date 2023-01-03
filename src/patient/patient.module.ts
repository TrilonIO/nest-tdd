import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  inMemoryClearPatientsRepositoryProvider,
  inMemoryPatientByIdRepositoryProvider,
  inMemorySavePatientRepositoryProvider,
} from './providers/in-memory-patient-repository.provider';

@Module({
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {
  static inMemory() {
    return {
      module: PatientModule,
      providers: [
        inMemorySavePatientRepositoryProvider,
        inMemoryPatientByIdRepositoryProvider,
        inMemoryClearPatientsRepositoryProvider,
      ],
      exports: [inMemoryClearPatientsRepositoryProvider],
    };
  }
}
