import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentService } from './appointment/appointment.service';
import { PatientService } from './patient/patient.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppointmentService, PatientService],
})
export class AppModule {}
