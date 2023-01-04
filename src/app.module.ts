import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from './backoffice/backoffice.module';
import { BankslipController } from './backoffice/controllers/bankslip.controller';
import { BankslipService } from './backoffice/services/bankslip.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'bankslipdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    BackofficeModule
  ],
})
export class AppModule {}
