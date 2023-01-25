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
          errors: [`${missingField} is required`],
        });
      },
    );
  });
});
