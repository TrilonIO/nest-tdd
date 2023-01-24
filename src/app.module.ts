import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupController } from './signup/signup.controller';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [PatientsModule],
  controllers: [AppController, SignupController],
  providers: [AppService],
})
export class AppModule {}
