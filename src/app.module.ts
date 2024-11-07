import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    // Import ConfigModule agar variabel lingkungan dari .env bisa diakses
    ConfigModule.forRoot({
      isGlobal: true, // membuat ConfigModule dapat diakses di seluruh aplikasi
    }),

    // Konfigurasi database PostgreSQL menggunakan TypeOrmModule
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      password: 'Akmal.14032002',
      username: 'postgres.rviwahseiudskolyjvdv',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),

    // Konfigurasi ElasticsearchModule untuk logging
    ElasticsearchModule.register({
      node: 'http://localhost:9200', // Sesuaikan dengan URL Elasticsearch Anda
    }),

    // Import modul lainnya
    AuthModule,
    UserModule,
    ProductModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
