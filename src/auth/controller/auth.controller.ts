import {Body, Controller, Post, UseGuards, UseInterceptors} from "@nestjs/common";
import {User} from "../decorator/user.decorator";
import {UserEntity} from "../../user/entity/user.entity";
import {EmailLoginDto, TokenLoginDto} from "../dto/login.dto";
import {LoginResponseDto} from "../dto/login-response.dto";
import {AuthService} from "../service/auth.service";
import {LoginResponseInterceptor} from "../interceptor/login-response.interceptor";
import {SetPasswordDto} from "../dto/set-password.dto";
import {MessageDto} from "../../shared/dto/message.dto";
import {SetPasswordGuard} from "../guard/set-password.guard";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("/auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post("/login/token")
    async loginToken(
        @Body() dto: TokenLoginDto
    ): Promise<LoginResponseDto> {
        return await this.authService.loginUserWithToken(dto.token);
    }

    @UseInterceptors(LoginResponseInterceptor)
    @Post("/login/email")
    async loginEmail(
        @Body() dto: EmailLoginDto
    ): Promise<UserEntity> {
        return await this.authService.loginUserWithEmail(dto);
    }

    //
    @UseGuards(SetPasswordGuard)
    @Post("/set-password")
    async setPassword(
        @User() user: UserEntity,
        @Body() dto: SetPasswordDto
    ): Promise<MessageDto> {
        return await this.authService.setPassword(user, dto);
    }
}