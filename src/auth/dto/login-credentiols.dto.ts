import { IsString, Matches, MaxLength, MinLength, minLength } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
