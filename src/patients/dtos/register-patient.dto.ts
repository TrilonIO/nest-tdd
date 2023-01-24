import { IsNotEmpty } from 'class-validator';

export class RegisterPatientDto {
  @IsNotEmpty({
    message: 'name is required',
  })
  public name: string;

  @IsNotEmpty({
    message: 'email is required',
  })
  public email: string;
}
