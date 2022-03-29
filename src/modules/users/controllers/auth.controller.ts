import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SignUpDto } from '../dto/sign-up.dto';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';

@Controller('users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }
}
