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
  });
});
