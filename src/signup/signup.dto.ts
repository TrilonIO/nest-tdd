import { IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public passwordConfirmation: string;
}
