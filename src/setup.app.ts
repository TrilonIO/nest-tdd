import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export function setupApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException({
          errors: errors.flatMap((error) => Object.values(error.constraints)),
        }),
    }),
  );
}
