import { DynamicModule, Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { InMemoryPatientRepository } from './repositories/in-memory-patient.repository';
import { PatientByIdRepository } from './repositories/patient-by-id.repository';
import { SavePatientRepository } from './repositories/save-patient.repository';
import { PatientController } from './patient.controller';

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
  controllers: [PatientController],
})
export class PatientModule {
  static inMemory(): DynamicModule {
    return {
      module: PatientModule,
      providers: [
        {
          provide: SavePatientRepository,
          useClass: InMemoryPatientRepository,
        },
        {
          provide: PatientByIdRepository,
          useExisting: SavePatientRepository,
        },
      ],
    };
  }
}
