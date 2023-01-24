import { Module } from '@nestjs/common';
import { PatientsModule } from '../patients/patients.module';
import { AppointmentsController } from './appointments.controller';

@Module({
  imports: [PatientsModule],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
