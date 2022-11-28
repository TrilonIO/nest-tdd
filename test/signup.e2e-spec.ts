import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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
    it('should return 400 when password and confirmation dont match', () => {
      return request(app.getHttpServer())
        .post('/signup')
        .send({
          email: 'some-email@example.com',
          name: 'John Doe',
          password: 'password',
          passwordConfirmation: 'anotherPassword',
        })
        .expect(400);
    });
  });
});
