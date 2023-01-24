import { IsDateString, IsInt, IsNumber } from 'class-validator';

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

  @IsInt({
    message: 'patientId must be a number',
  })
  patientId: number;
}
