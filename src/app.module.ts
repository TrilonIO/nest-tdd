import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupController } from './signup/signup.controller';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [PatientsModule, AppointmentsModule],
  controllers: [AppController, SignupController],
  providers: [AppService],
})
export class AppModule {}
