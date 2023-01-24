import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterPatientDto {
  @IsNotEmpty({
    message: 'name is required',
  })
  public name: string;

  @IsEmail(
    {},
    {
      message: 'email must be valid',
    },
  )
  public email: string;
}
