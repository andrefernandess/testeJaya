import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankslipController } from './controllers/bankslip.controller';
import { Bankslip } from './entities/bankslip.entity';
import { BankslipService } from './services/bankslip.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Bankslip,
    ])],
    controllers: [BankslipController],
    providers: [BankslipService, ],
})
export class BackofficeModule {}
