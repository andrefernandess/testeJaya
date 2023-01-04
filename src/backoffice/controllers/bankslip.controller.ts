import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { ValidateInterceptor } from "src/interceptors/validator.interceptor";
import { CreateBankSlipContract } from "../contracts/bankslip.contract";
import { ResultDto } from "../dtos/result.dto";
import { UpdateBankSlip } from "../dtos/update.bankslip.dto";
import { Bankslip } from "../models/bankslip.model";
import { BankslipService } from "../services/bankslip.service";

@Controller('rest/bankslips')
export class BankslipController{
    constructor(private readonly service: BankslipService) {}

    @Get()
    async get(){
        try {
            const bankslips = await this.service.get();
            return new ResultDto(null, true, bankslips, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível listar os produtos', false, null, error), HttpStatus.NO_CONTENT);
        }
    }

    @Get(':id')
    async getById(@Param('id') id){
        try {
            const bankslip = await this.service.getById(id);
            return new ResultDto(null, true, bankslip, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Bankslip not found with the specified id', false, null, error), HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    @UseInterceptors( new ValidateInterceptor(new CreateBankSlipContract()))
    async post(@Body() model: Bankslip){
        try {
            model.id = Guid.create().toString();
            model.status = Status.PENDING.valueOf();
            await this.service.post(model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Bankslip not provided in the request body', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id/payments')
    async pay(@Param('id') id, @Body() input: UpdateBankSlip){
        try {
            let model = this.service.getById(id);
            (await model).status = Status.PAID;
            await this.service.put(id, await model);
            return HttpStatus.NO_CONTENT;
        } catch (error) {
            throw new HttpException(new ResultDto('Bankslip not found with the specified id', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async cancel(@Param('id') id){
        try {
            let model = this.service.getById(id);
            (await model).status = Status.CANCELED;
            await this.service.put(id, await model);
        } catch (error) {
            throw new HttpException(new ResultDto('Bankslip not found with the specified id', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}