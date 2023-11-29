import {BadRequestException, Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {AuthenticationEntity} from "../entity/authentication.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../../user/entity/user.entity";
import {LoginResponseDto} from "../dto/login-response.dto";
import {JwtPayload} from "../dto/jwt-payload.dto";
import {EmailLoginDto} from "../dto/login.dto";
import {AuthenticationProvider} from "../providers/authentication.provider";
import {SetPasswordDto} from "../dto/set-password.dto";
import {MessageDto} from "../../shared/dto/message.dto";

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(AuthenticationEntity)
        private authRepository: Repository<AuthenticationEntity>
    ) {
    }


    async loginUserWithToken(token: string): Promise<LoginResponseDto> {
        try {
            const payload: JwtPayload = await this.jwtService.verifyAsync(token);

            const user = await this.userRepository.findOneBy({
                authentication: {email: payload.email}
            });

            const hasSetPassword = !!(user?.authentication?.password);
            const isUserActive = user?.authentication?.isActive || false;

            // this authentication method should only pass
            // if user does not have a password and their account is active
            if (!hasSetPassword && isUserActive) {
                return LoginResponseDto.build(user, null);
            }

        } catch (error) {
            this.logger.error(error);
        }

        throw new UnauthorizedException("Invalid auth token");
    }


    async loginUserWithEmail(dto: EmailLoginDto): Promise<UserEntity> {

        try {
            const user = await this.userRepository.findOneBy({
                authentication: {email: dto.email}
            });

            const passwordHash = user?.authentication?.password;
            const isPasswordValid = await AuthenticationProvider.comparePassword(dto.password, passwordHash);

            const isUserActive = user?.authentication?.isActive ?? false;

            if (isPasswordValid && isUserActive) return user;

        } catch (error) {
            this.logger.error(error);
        }

        throw new UnauthorizedException("Authentication failed");
    }


    async setPassword(user: UserEntity, dto: SetPasswordDto): Promise<MessageDto> {

        const authentication = user?.authentication;
        authentication.password = dto.password;

        // cancel password update if the two passwords
        // are not an exact match
        if (dto?.password !== dto?.confirmPassword) {
            throw new BadRequestException("Passwords do not match");
        }

        try {
            await this.authRepository.save(authentication);

            return new MessageDto({
                title: "Password Updated",
                message: "Your new password has been set."
            });
        } catch (error) {
            this.logger.error(error);
        }
    }

}