import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PatientsService } from '../patients/patients.service';
import { RegisterAppointmentDto } from './dtos';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly patientsService: PatientsService) {}

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

    const patient = await this.patientsService.getPatientById(
      registerAppointmentDto.patientId,
    );

    if (!patient) {
      throw new BadRequestException({
        error: `Patient with id ${registerAppointmentDto.patientId} does not exist`,
      });
    }

    return {
      ...registerAppointmentDto,
      confirmed: false,
    };
  }
}
