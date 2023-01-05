import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Bankslip{
    @PrimaryGeneratedColumn()
    id: string;

    @Column('datetime')
    due_date: Date;

    @Column('decimal')
    total_in_cents: number;

    @ManyToOne(() => Customer, (c) => c.bankSlips)
    customer: Customer;

    @Column()
    status: Status;

}