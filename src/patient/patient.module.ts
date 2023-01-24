import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientService } from './patient.service';
import {
  inMemoryClearPatientsRepositoryProvider,
  inMemoryPatientByIdRepositoryProvider,
  inMemorySavePatientRepositoryProvider,
} from './providers/in-memory-patient-repository.provider';
import {
  sequelizeSavePatientRepositoryProvider,
  sequelizePatientByIdRepositoryProvider,
  sequelizeClearPatientsRepositoryProvider,
} from './providers/sequelize-patient-repository.provider';
import { SequelizePatient } from './repositories/sequelize/sequelize-patient.model';
import { PatientController } from './patient.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [PatientService],
  exports: [PatientService],
  controllers: [PatientController],
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

  static usingDatabase() {
    return {
      module: PatientModule,
      imports: [DatabaseModule, SequelizeModule.forFeature([SequelizePatient])],
      providers: [
        sequelizeSavePatientRepositoryProvider,
        sequelizePatientByIdRepositoryProvider,
        sequelizeClearPatientsRepositoryProvider,
      ],
      exports: [sequelizeClearPatientsRepositoryProvider],
    };
  }
}
