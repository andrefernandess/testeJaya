import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { ResultDto } from "../dtos/result.dto";
import { AccountService } from "../services/account.service";
import { AuthService } from "../services/auth.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private accountService: AccountService,
        private authService: AuthService
    ) {

    }

    // Autenticar
    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const user = await this.accountService.authenticate(model.username, model.password);

        // Caso não encontre o usuário
        if (!user)
            throw new HttpException(new ResultDto('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);

        // Caso o usuário esteja inativo
        if (!user.active)
            throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        // Gera o token
        const token = await this.authService.createToken(user.customer.document, user.customer.email, '', user.roles);
        return new ResultDto(null, true, token, null);
    }

    // Refresh Token
    @Post('refresh')
    async refreshToken(@Req() request): Promise<any> {
        // Gera o token
        const token = await this.authService.createToken(request.user.document, request.user.email, request.user.image, request.user.user.roles);
        return new ResultDto(null, true, token, null);
    }
}