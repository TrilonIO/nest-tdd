import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup.app';

describe('Signup (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  describe('[POST] /signup', () => {
    test.each(['email', 'name', 'password', 'passwordConfirmation'])(
      `%s is required`,
      async (missingField) => {
        const requestBody = {
          email: 'john@doe.com',
          name: 'John Doe',
          password: 'password',
          passwordConfirmation: 'password',
        };

        delete requestBody[missingField];

        const response = await request(app.getHttpServer())
          .post('/signup')
          .send(requestBody);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toEqual({
          errors: [`${missingField} must be a string`],
        });
      },
    );

    test.each(['email', 'name', 'password', 'passwordConfirmation'])(
      `%s must be a string`,
      async (field) => {
        const requestBody = {
          email: 'john@doe.com',
          name: 'John Doe',
          password: 'password',
          passwordConfirmation: 'password',
        };

        requestBody[field] = 123;

        const response = await request(app.getHttpServer())
          .post('/signup')
          .send(requestBody);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toEqual({
          errors: [`${field} must be a string`],
        });
      },
    );

    test('password and passwordConfirmation must match', async () => {
      const requestBody = {
        email: 'john@doe.com',
        name: 'John Doe',
        password: 'password',
        passwordConfirmation: 'notTheSamePassword',
      };

      const response = await request(app.getHttpServer())
        .post('/signup')
        .send(requestBody);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual({
        errors: ['password and passwordConfirmation must match'],
      });
    });

    test('email must be valid', async () => {
      const requestBody = {
        email: 'invalidEmail',
        name: 'John Doe',
        password: 'password',
        passwordConfirmation: 'password',
      };

      const response = await request(app.getHttpServer())
        .post('/signup')
        .send(requestBody);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual({
        errors: ['email must be a valid email address'],
      });
    });

    test('A new account must be created on success', async () => {
      const requestBody = {
        email: 'john@doe.com',
        name: 'John Doe',
        password: 'password',
        passwordConfirmation: 'password',
      };

      const response = await request(app.getHttpServer())
        .post('/signup')
        .send(requestBody);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        email: requestBody.email,
        name: requestBody.name,
      });
    });
  });
});
