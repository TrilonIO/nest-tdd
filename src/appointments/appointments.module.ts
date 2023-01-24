import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';

@Module({
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
