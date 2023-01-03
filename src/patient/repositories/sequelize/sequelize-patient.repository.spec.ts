import {
  getConnectionToken,
  getModelToken,
  SequelizeModule,
} from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { SequelizePatient } from './sequelize-patient.model';
import { SequelizePatientRepository } from './sequelize-patient.repository';
import { databaseConfig } from '../../../config';

describe('SequelizePatientRepository', () => {
  let module: TestingModule;
  let patientRepository: SequelizePatientRepository;
  let sequelize: Sequelize;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          ...databaseConfig,
          dialect: 'postgres',
          logging: false,
          models: [SequelizePatient],
        }),
        SequelizeModule.forFeature([SequelizePatient]),
      ],
      providers: [SequelizePatientRepository],
    }).compile();

    sequelize = module.get(getConnectionToken());
    await sequelize.sync({
      force: true,
    });

    patientRepository = module.get(SequelizePatientRepository);
  });

  afterEach(async () => {
    await sequelize.drop({
      cascade: true,
    });

    await module.close();
  });

  describe('save', () => {
    it('should save a patient', async () => {
      // Arrange
      const patientData = { name: 'John Doe' };

      // Act
      const patient = await patientRepository.save(patientData);

      // Assert
      const sequelizePatientModel = module.get(getModelToken(SequelizePatient));
      const patientInDatabase = await sequelizePatientModel.findByPk(
        patient.id,
      );

      expect(patient).toEqual(patientInDatabase.get());
    });
  });

  describe('findById', () => {
    it('should return an existing patient by id', async () => {
      // Arrange
      const patientData = { name: 'John Doe' };
      const sequelizePatientModel = module.get(getModelToken(SequelizePatient));
      const patientInDatabase = await sequelizePatientModel.create(patientData);

      // Act
      const foundPatient = await patientRepository.findById(
        patientInDatabase.id,
      );

      // Assert
      expect(foundPatient).toEqual(patientInDatabase.get());
    });

    it('should return undefined when patient does not exist', async () => {
      // Arrange
      const nonexistentPatientId = 1;

      // Act
      const foundPatient = await patientRepository.findById(
        nonexistentPatientId,
      );

      // Assert
      expect(foundPatient).toBeUndefined();
    });
  });
});
