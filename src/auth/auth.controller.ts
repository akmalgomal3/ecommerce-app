import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.userService.login(body.username, body.password);
  }
}
