import { Injectable } from "@nestjs/common";
import { Validate } from "src/utils/validate";
import { Bankslip } from "../models/bankslip.model";
import { Contract } from "./contract";

@Injectable()
export class CreateBankSlipContract implements Contract {
    errors: any[];
    validate(model: Bankslip): boolean {
        const validade = new Validate();

        validade.isRequired(model.due_date, 'Campo data e obrigatorio');
        validade.isRequired(model.total_in_cents, 'Campo Total em Centavos e obrigatorio');
        validade.isRequired(model.customer, 'Campo Customer e obrigatorio');

        this.errors = validade.errors;

        return validade.isValid();
    }

}