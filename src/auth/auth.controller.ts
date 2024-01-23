import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentiols.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.authService.getAll();
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<User> {
    return this.authService.get(id);
  }

  @Post('/signup')
  async signUp(@Body() credentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(credentials);
  }

  @Post('/signin')
  async StringOptions(@Body() credentials: LoginCredentialsDto): Promise<string> {
    return this.authService.signIn(credentials);
  }

}
