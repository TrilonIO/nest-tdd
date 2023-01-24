import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export function setupApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException({
          errors: {
            body: errors.flatMap((error) => Object.values(error.constraints)),
          },
        }),
      stopAtFirstError: true,
    }),
  );
}
