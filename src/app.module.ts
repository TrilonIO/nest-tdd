import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentService } from './appointment/appointment.service';
import { PatientService } from './patient/patient.service';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [PatientModule],
  controllers: [AppController],
  providers: [AppService, AppointmentService, PatientService],
})
export class AppModule {}
