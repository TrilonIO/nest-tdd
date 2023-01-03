import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PatientModule } from './patient.module';
import { InMemoryPatientRepository } from './repositories/in-memory-patient.repository';
import { PatientByIdRepository } from './repositories/patient-by-id.repository';
import { SequelizePatientRepository } from './repositories/sequelize/sequelize-patient.repository';

describe('PatientModule', () => {
  let module: TestingModule;
  describe('inMemory', () => {
    beforeEach(async () => {
      module = await Test.createTestingModule({
        imports: [PatientModule.inMemory()],
      }).compile();
    });

    it('should provide PatientByIdRepository with InMemoryPatientRepository', () => {
      const patientByIdRepository = module.get(PatientByIdRepository);
      expect(patientByIdRepository).toBeInstanceOf(InMemoryPatientRepository);
    });
  });

  describe('usingDatabase', () => {
    beforeEach(async () => {
      module = await Test.createTestingModule({
        imports: [
          SequelizeModule.forRoot({
            database: 'test',
            host: 'localhost',
            dialect: 'postgres',
            username: 'user',
            password: 'password',
            port: 5432,
            synchronize: true,
          }),
          PatientModule.usingDatabase(),
        ],
      }).compile();
    });

    afterEach(async () => {
      await module.close();
    });

    it('should provide PatientByIdRepository with SequelizePatientRepository', () => {
      const patientByIdRepository = module.get(PatientByIdRepository);
      expect(patientByIdRepository).toBeInstanceOf(SequelizePatientRepository);
    });
  });
});
