import { LocalAuthGuard } from './local-auth.guard';
import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

interface IClientLogin {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() client: IClientLogin) {
    return this.authService.login(client.email);
  }
}
