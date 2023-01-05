import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankslipController } from './controllers/bankslip.controller';
import { Bankslip } from './entities/bankslip.entity';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { BankslipService } from './services/bankslip.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Bankslip,
        Customer,
        User
    ])],
    controllers: [BankslipController],
    providers: [BankslipService, ],
})
export class BackofficeModule {}
