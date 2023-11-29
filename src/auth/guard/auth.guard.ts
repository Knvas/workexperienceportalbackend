import {CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";
import {UserEntity} from "../../user/entity/user.entity";
import {UserService} from "../../user/service/user.service";
import {JwtPayload} from "../dto/jwt-payload.dto";

@Injectable()
export abstract class AuthGuard implements CanActivate {

    private readonly logger = new Logger(AuthGuard.name);

    protected constructor(
        protected readonly jwtService: JwtService,
        protected readonly userService: UserService
    ) {
    }

    abstract canActivate(context: ExecutionContext): Promise<boolean>

    private extractTokenFromHeader(request: Request): string | null {
        const [type, token] = request?.headers?.authorization
            ?.split(" ") ?? [];

        return type === "Bearer" ? token : null;
    }

    protected async getAuthUser(context: ExecutionContext): Promise<UserEntity> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload: JwtPayload = await this.jwtService.verifyAsync(token);
            const reqUser = request["user"] as UserEntity;

            if (payload?.sub === reqUser?.id) return reqUser

            this.logger.debug("Fetching request user from database with token");

            const user = await this.userService.getUserById(payload.sub);

            request["user"] = user;

            return user;

        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException();
        }
    }

}