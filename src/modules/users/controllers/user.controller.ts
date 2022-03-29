import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('/details')
  login(@Req() req) {
    return {
      id: req.user.id,
      username: req.user.username,
    };
  }
}
