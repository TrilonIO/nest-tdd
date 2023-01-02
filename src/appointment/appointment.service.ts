import { Injectable } from '@nestjs/common';
import { PatientByIdRepository } from '../patient/repositories/patient-by-id.repository';
import { AppointmentModel } from './appointment.model';

export interface AppointmentInput {
  patientId: number;
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class AppointmentService {
  constructor(private readonly patientByIdRepository: PatientByIdRepository) {}

  public async scheduleAppointment(
    appointmentData: AppointmentInput,
  ): Promise<AppointmentModel> {
    if (appointmentData.endTime <= appointmentData.startTime) {
      throw new Error("appointment's endTime should be after startTime");
    }

    if (this.endTimeIsInTheNextDay(appointmentData)) {
      throw new Error(
        "appointment's endTime should be in the same day as start time's",
      );
    }

    const patientExists = await this.patientByIdRepository.findById(
      appointmentData.patientId,
    );

    if (!patientExists) {
      throw new Error('Patient does not exist');
    }

    return {
      ...appointmentData,
      confirmed: false,
    };
  }

  private endTimeIsInTheNextDay(appointmentData: AppointmentInput): boolean {
    const differentDays =
      appointmentData.endTime.getUTCDate() !==
      appointmentData.startTime.getUTCDate();

    const differentMonths =
      appointmentData.endTime.getUTCMonth() !==
      appointmentData.startTime.getUTCMonth();

    const differentYears =
      appointmentData.endTime.getUTCFullYear() !==
      appointmentData.startTime.getUTCFullYear();

    return differentDays || differentMonths || differentYears;
  }
}
