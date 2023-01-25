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

    test('name is required', async () => {
      const response = await request(app.getHttpServer()).post('/signup').send({
        email: 'john@doe.com',
        password: 'password',
        passwordConfirmation: 'anotherPassword',
      });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual({
        errors: ['name is required'],
      });
    });

    test('password is required', async () => {
      const response = await request(app.getHttpServer()).post('/signup').send({
        email: 'john@doe.com',
        name: 'John Doe',
        passwordConfirmation: 'anotherPassword',
      });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual({
        errors: ['password is required'],
      });
    });
  });
});
