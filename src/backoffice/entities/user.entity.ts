import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    roles: string[];

    @Column()
    active: boolean;

    @OneToOne(() => Customer, (c) => c.user)
    public customer: Customer;
}