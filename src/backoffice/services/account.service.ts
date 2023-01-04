import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

    /*async update(username: string, data: any): Promise<User> {
        return await this.userModel.findOneAndUpdate({ username }, data);
    }

    async authenticate(username, password): Promise<User> {
        var user = await this.customerModel
            .findOne({ document: username })
            .populate('user')
            .exec();

        const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);
        if (pass.toString() == customer.user.password.toString()) {
            return customer;
        } else {
            return null;
        }
    }*/
}

function InjectModel(arg0: string) {
    throw new Error('Function not implemented.');
}
