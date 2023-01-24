import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when registering a new patient', () => {
    test('the name is required', async () => {
      const response = await request(app.getHttpServer())
        .post('/patients')
        .send({
          name: '',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        errors: {
          body: ['name is required'],
        },
      });
    });

    test('the email is required', () => {
      return request(app.getHttpServer())
        .post('/patients')
        .send({
          name: 'John Doe',
          email: '',
        })
        .expect(400)
        .expect({
          errors: {
            body: ['email is required'],
          },
        });
    });
  });
});
