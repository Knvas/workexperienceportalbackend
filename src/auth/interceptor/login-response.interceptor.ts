import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {UserEntity} from "../../user/entity/user.entity";
import {LoginResponseDto} from "../dto/login-response.dto";
import {firstValueFrom, Observable, of} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "../dto/jwt-payload.dto";

@Injectable()
export class LoginResponseInterceptor implements NestInterceptor<UserEntity, LoginResponseDto> {

    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    async intercept(context: ExecutionContext, next: CallHandler<UserEntity>): Promise<Observable<LoginResponseDto>> {

        const user = await firstValueFrom(next.handle());
        const token = await this.signLoginJwt(user);

        const loginResponse = new LoginResponseDto({
            firstName: user.firstName,
            lastName: user.lastName,
            otherNames: user.otherNames,
            phoneNumber: user.phoneNumber,
            email: user.authentication?.email,
            role: user.authentication?.role,
            hasSetPassword: !!(user.authentication?.password),
            authToken: token
        });

        return of(loginResponse);
    }

    private async signLoginJwt(user: UserEntity): Promise<string> {
        return await this.jwtService.signAsync(<JwtPayload>{
            sub: user.id,
            email: user.authentication.email,
            schoolId: user.schoolId,
        });
    }


}