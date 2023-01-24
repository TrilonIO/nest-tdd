import { IsDate } from 'class-validator';

export class RegisterAppointmentDto {
  @IsDate({
    message: 'startTime must be a valid date',
  })
  startTime: Date;
}
