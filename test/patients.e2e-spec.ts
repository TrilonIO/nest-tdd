import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SavePatientRepository } from '../src/patient/repositories/save-patient.repository';

describe('Patients (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/patients/{id} (GET)', () => {
    it('should return an existing patient on success', async () => {
      const savePatientRepository = app.get(SavePatientRepository);
      const { id: patientId } = await savePatientRepository.save({
        name: 'John Doe',
      });

      return request(app.getHttpServer())
        .get(`/patients/${patientId}`)
        .expect(200)
        .expect({
          id: patientId,
          name: 'John Doe',
        });
    });
  });
});
