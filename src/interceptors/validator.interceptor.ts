import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common/interfaces";
import { Observable } from "rxjs";
import { Contract } from "src/backoffice/contracts/contract";
import { ResultDto } from "../backoffice/dtos/result.dto";

@Injectable()
export class ValidateInterceptor implements NestInterceptor {
    constructor(public contract: Contract) {

    }
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(new ResultDto('Invalid bankslip provided.The possible reasons are:' +
            ' A field of the provided bankslip was null or with invalid value', false, null, 
            this.contract.errors), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return next.handle();
    }

}