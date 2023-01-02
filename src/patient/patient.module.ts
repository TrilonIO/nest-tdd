import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { InMemoryPatientRepository } from './repositories/in-memory-patient.repository';
import { PatientByIdRepository } from './repositories/patient-by-id.repository';
import { SavePatientRepository } from './repositories/save-patient.repository';

@Module({
  providers: [
    PatientService,
    {
      provide: SavePatientRepository,
      useClass: InMemoryPatientRepository,
    },
    {
      provide: PatientByIdRepository,
      useExisting: SavePatientRepository,
    },
  ],
  exports: [PatientService, PatientByIdRepository],
})
export class PatientModule {}
