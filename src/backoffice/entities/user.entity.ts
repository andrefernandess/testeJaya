import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public roles: string[];
    
    @Column()
    public active: boolean;
}