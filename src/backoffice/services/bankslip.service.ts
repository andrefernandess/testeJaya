import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bankslip } from '../entities/bankslip.entity';

@Injectable()
export class BankslipService{
    constructor(
        @InjectRepository(Bankslip)
        private readonly repository: Repository<Bankslip>,
    ){}

    async get(): Promise<Bankslip[]> {
        return await this.repository.find();
    }

    async getById(id: string): Promise<Bankslip> {
        let b =  await this.repository.findOneBy({ id: id });

        const today = new Date();
        const slip = new Date(b.due_date);

        const atraso = today.getDay() - slip.getDay();

        if(atraso > 0 && atraso <= 10)
        {
            b.total_in_cents = b.total_in_cents + (b.total_in_cents * 0.05 * 1);
        }
        else if(atraso > 10)
        {
            b.total_in_cents = b.total_in_cents + (b.total_in_cents * 0.10 * 1);
        }

        return b;
             
    }

    async post(bankslip: Bankslip) {
        await this.repository.save(bankslip);
    }

    async put(id: string, bankslip: Bankslip) {
        await this.repository.update(id, bankslip);
    }

    async delete(id: string) {
        await this.repository.delete(id);
    }
}