import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Pastikan UserModule diimpor
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'hahahahihihi12111211', // Gantilah dengan secret key yang lebih aman
      signOptions: { expiresIn: '60m' }, // Token expired dalam 60 menit
    }),
    UserModule, // Mengimpor UserModule karena kita membutuhkan akses ke UserService
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
