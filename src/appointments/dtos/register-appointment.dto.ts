import { IsNotEmpty } from 'class-validator';

export class RegisterAppointmentDto {
  @IsNotEmpty({
    message: 'startTime must be a valid date',
  })
  startTime: Date;
}
