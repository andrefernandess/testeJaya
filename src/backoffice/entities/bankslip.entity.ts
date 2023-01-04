import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bankslip{
    @PrimaryGeneratedColumn()
    id: string;

    @Column('datetime')
    due_date: Date;

    @Column('decimal')
    total_in_cents: number;

    @Column()
    customer: string;

    @Column("")
    status: Status;

}