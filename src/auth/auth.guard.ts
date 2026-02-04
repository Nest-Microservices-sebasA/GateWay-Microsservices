import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { firstValueFrom, Observable } from "rxjs";
import { Request } from 'express';
import { NATS_SERVICE } from "src/config";
import { ClientProxy } from "@nestjs/microservices";


export class AuthGuard implements CanActivate {
    constructor(@Inject(NATS_SERVICE)private readonly client: ClientProxy){}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.tokenExtractor(request);

        if(!token){
            throw new UnauthorizedException()
        }

        try{
            const {user, token: newtoken} = await firstValueFrom(
                this.client.send('verify.token', token )

            )
            request.user = user;
            request.token = newtoken;
            return true;
        }catch{
            throw new UnauthorizedException();
        }
    }

    tokenExtractor(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ')?? [];
        return type === 'Bearer' ? token : undefined;
    }    

}