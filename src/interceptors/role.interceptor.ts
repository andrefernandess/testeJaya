import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResultDto } from 'src/backoffice/dtos/result.dto';
import { JwtPayload } from 'src/backoffice/interfaces/jwt-payload.interface';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: string[]) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> { 
        {
            const user: JwtPayload = context.switchToHttp().getRequest().user;
            console.log(user);

            let hasRole = false;
            user.roles.forEach((role) => {
                if (this.roles.includes(role))
                    hasRole = true;
            });

            if (!hasRole) {
                throw new HttpException(
                    new ResultDto('Acesso não autorizado', false, null, null),
                    HttpStatus.UNAUTHORIZED);
            }

            return next.handle();
        }
    }
}