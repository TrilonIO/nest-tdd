import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAppointmentDto } from './dtos';

@Controller('appointments')
export class AppointmentsController {
  @Post()
  public async registerAppointment(
    @Body() registerAppointmentDto: RegisterAppointmentDto,
  ) {
    registerAppointmentDto;
  }
}
