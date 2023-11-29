import {AuthGuard} from "./auth.guard";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../../user/service/user.service";
import {ExecutionContext} from "@nestjs/common";
import {UserRole} from "../entity/authentication.entity";
import {Request} from "express";

export class SchoolOrSuperAdminGuard extends AuthGuard {

    constructor(
        protected readonly jwtService: JwtService,
        protected readonly userService: UserService,
    ) {
        super(jwtService, userService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const user = await this.getAuthUser(context);
        const role = user?.authentication?.role;

        const request = context.switchToHttp().getRequest<Request>();

        const isSchoolAdmin = role === UserRole.SCHOOL_ADMIN;
        const isReqSchoolId = request.body?.schoolId === user?.schoolId;

        return (isSchoolAdmin && isReqSchoolId) || (role === UserRole.SUPER_ADMIN);
    }
}