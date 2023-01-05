import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AccountService } from "./account.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    async createToken(document, email, image, roles: string[]) {
        const user: JwtPayload = {
            document: document,
            email: email,
            image: image,
            roles: roles
        };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        // return await this.accountService.findOneByUsername(payload.username);
        return payload;
    }
}