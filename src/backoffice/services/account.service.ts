import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Md5 } from "md5-typescript";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";


@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ){}

    async post(user: User) {
        await this.repository.save(user);
    }
    async findByUsername(username): Promise<User> {
        return await this.repository.findOneBy({username: username})
    }

    async update(id: string, user: User) {
        return await this.repository.update(id, user);
    }

    async authenticate(username: string, password: string): Promise<User> {
        var user = await this.repository.findOneBy({ username: username })

        const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);
        if (pass.toString() == user.password.toString()) {
            return user;
        } else {
            return null;
        }
    }
}

function InjectModel(arg0: string) {
    throw new Error('Function not implemented.');
}
