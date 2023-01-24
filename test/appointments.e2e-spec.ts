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

  describe('when registering a new appointment', () => {
    test('Start times is required', async () => {
      return request(app.getHttpServer())
        .post('/appointments')
        .send({
          startTime: null,
          endTime: new Date(),
        })
        .expect(400)
        .expect({
          errors: {
            body: ['startTime must be a valid date'],
          },
        });
    });
  });
});
