import { DynamicModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { InMemoryPatientRepository } from './repositories/in-memory-patient.repository';
import { PatientByIdRepository } from './repositories/patient-by-id.repository';
import { SavePatientRepository } from './repositories/save-patient.repository';
import { SequelizePatient } from './repositories/sequelize/sequelize-patient.model';
import { SequelizePatientRepository } from './repositories/sequelize/sequelize-patient.repository';

@Module({
  providers: [PatientService],
  exports: [PatientService, PatientByIdRepository],
  controllers: [PatientController],
})
export class PatientModule {
  static inMemory(): DynamicModule {
    return {
      module: PatientModule,
      imports: [],
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

  static usingDatabase(): DynamicModule {
    return {
      module: PatientModule,
      imports: [SequelizeModule.forFeature([SequelizePatient])],
      providers: [
        {
          provide: SavePatientRepository,
          useClass: SequelizePatientRepository,
        },
        {
          provide: PatientByIdRepository,
          useExisting: SavePatientRepository,
        },
      ],
    };
  }
}
