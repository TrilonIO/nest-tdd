import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/app.setup';

describe('Appointments (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);

    await app.init();
  });

  describe('When registering a new appointment', () => {
    test('Start time is required', async () => {
      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          startTime: null,
          endTime: new Date(),
          patientId: 1,
        })
        .expect(400)
        .expect({
          errors: {
            body: ['startTime must be a valid date'],
          },
        });
    });

    test('Start time must be a valid Date', async () => {
      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          startTime: 'not-a-date',
          endTime: new Date(),
          patientId: 1,
        })
        .expect(400)
        .expect({
          errors: {
            body: ['startTime must be a valid date'],
          },
        });
    });

    test('End time is required', async () => {
      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          startTime: new Date(),
          endTime: null,
          patientId: 1,
        })
        .expect(400)
        .expect({
          errors: {
            body: ['endTime must be a valid date'],
          },
        });
    });

    test('End time must be a valid date', async () => {
      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          startTime: new Date(),
          endTime: 'not-a-date',
          patientId: 1,
        })
        .expect(400)
        .expect({
          errors: {
            body: ['endTime must be a valid date'],
          },
        });
    });

    test('Start time must be before end time', async () => {
      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          startTime: new Date(),
          endTime: new Date('2020-01-01'),
          patientId: 1,
        })
        .expect(400)
        .expect({
          errors: {
            body: ['startTime must be before endTime'],
          },
        });
    });

    test('A patient identifier must be provided', async () => {
      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          startTime: new Date(),
          endTime: new Date(),
        })
        .expect(400)
        .expect({
          errors: {
            body: ['patientId must be a number'],
          },
        });
    });

    test('The given patient must exist', async () => {
      const nonenxistentPatientId = 1;

      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          startTime: new Date(),
          endTime: new Date(),
          patientId: nonenxistentPatientId,
        })
        .expect(400)
        .expect({
          error: `Patient with id ${nonenxistentPatientId} does not exist`,
        });
    });
  });
});
