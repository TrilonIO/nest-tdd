import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Signup (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('[POST] /signup', () => {
    test('email is required', async () => {
      const response = await request(app.getHttpServer()).post('/signup').send({
        name: 'John Doe',
        password: 'password',
        passwordConfirmation: 'anotherPassword',
      });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual({
        errors: ['email is required'],
      });
    });
  });
});
