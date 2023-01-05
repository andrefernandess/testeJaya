import { Bankslip } from "./bankslip.model";
import { User } from "./user.model";

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public status: Status,
        public user: User,
        public bankslips: Bankslip[],
    ) {

    }
}