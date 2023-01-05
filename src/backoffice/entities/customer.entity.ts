import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Bankslip } from './bankslip.entity';
import { User } from './user.entity';

@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    email: string;

    @Column()
    status: Status;

    @OneToOne(() => User, (u) => u.customer)
    user: User

    @OneToMany(() => Bankslip, (bs) => bs.customer)
    bankSlips: Bankslip[]

}