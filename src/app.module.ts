import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentService } from './appointment/appointment.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppointmentService],
})
export class AppModule {}
