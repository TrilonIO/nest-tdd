import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  public scheduleAppointment(appointmentData: Record<string, any>) {
    return {
      ...appointmentData,
      confirmed: false,
    };
  }
}
