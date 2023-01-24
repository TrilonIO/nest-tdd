import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RegisterAppointmentDto } from './dtos';

@Controller('appointments')
export class AppointmentsController {
  @Post()
  public async registerAppointment(
    @Body() registerAppointmentDto: RegisterAppointmentDto,
  ) {
    if (registerAppointmentDto.startTime > registerAppointmentDto.endTime) {
      throw new BadRequestException({
        errors: {
          body: ['startTime must be before endTime'],
        },
      });
    }

    throw new BadRequestException({
      error: `Patient with id ${registerAppointmentDto.patientId} does not exist`,
    });
  }
}
