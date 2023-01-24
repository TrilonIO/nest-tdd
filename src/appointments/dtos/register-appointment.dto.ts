import { IsDateString } from 'class-validator';

export class RegisterAppointmentDto {
  @IsDateString(
    {},
    {
      message: 'startTime must be a valid date',
    },
  )
  startTime: Date;

  @IsDateString(
    {},
    {
      message: 'endTime must be a valid date',
    },
  )
  endTime: Date;
}
