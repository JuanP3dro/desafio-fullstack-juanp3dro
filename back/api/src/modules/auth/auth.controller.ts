import { LoginDTO } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() client: LoginDTO) {
    return this.authService.login(client.email);
  }
}
