import { Customer } from "./customer.model";

export class Bankslip {
    public id: string;
    public due_date: Date;
    public total_in_cents: number;
    public customer: Customer;
    public status: Status;
}