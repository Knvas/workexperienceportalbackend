import {ExecutionContext, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../../user/service/user.service";
import {AuthGuard} from "./auth.guard";

@Injectable()
export class SetPasswordGuard extends AuthGuard {

    constructor(
        jwtService: JwtService,
        userService: UserService
    ) {
        super(jwtService, userService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const user = await this.getAuthUser(context);
        const password = user?.authentication?.password;

        if (!user || !password) return false;

        return !password;
    }

}