import { Injectable } from '@nestjs/common';
import { AppointmentModel } from './appointment.model';

export interface AppointmentInput {
  patientId: number;
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class AppointmentService {
  public scheduleAppointment(
    appointmentData: AppointmentInput,
  ): AppointmentModel {
    if (appointmentData.endTime <= appointmentData.startTime) {
      throw new Error("appointment's endTime should be after startTime");
    }

    if (
      appointmentData.endTime.getUTCDate() !==
      appointmentData.startTime.getUTCDate()
    ) {
      throw new Error(
        "appointment's endTime should be in the same day as start time's",
      );
    }

    return {
      ...appointmentData,
      confirmed: false,
    };
  }
}
