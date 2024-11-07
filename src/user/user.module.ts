import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';  // Import JwtModule
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Pastikan UserRepository diimpor
    JwtModule.register({              // Konfigurasi JwtModule
      secret: 'hahahahihihi12111211',        // Ganti dengan secret key yang kuat dan aman
      signOptions: { expiresIn: '1h' },  // Pilihan opsional, misalnya expired token dalam 1 jam
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],  // Pastikan UserService dapat diekspor jika diperlukan modul lain
})
export class UserModule {}
