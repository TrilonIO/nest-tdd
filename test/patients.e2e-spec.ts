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
    test('The name is required', async () => {
      return request(app.getHttpServer())
        .post('/patients')
        .send({
          name: '',
        })
        .expect(400)
        .expect({
          errors: {
            body: ['name is required'],
          },
        });
    });

    test('The email is required', () => {
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

    test('A new patient is created on success', async () => {
      const response = await request(app.getHttpServer())
        .post('/patients')
        .send({
          name: 'John Doe',
          email: 'john@doe.com',
        })
        .expect(201);

      expect(response.body).toEqual({
        id: expect.any(Number),
        name: 'John Doe',
        email: 'john@doe.com',
      });
    });
  });
});
