import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserRepository, USER_REPOSITORY } from "../../domain/interfaces/user-repository.interface";
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from "../dtos/login.dto";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async execute(dto: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user || !user.validatePassword(dto.password)) {
            // Aquí usamos UnauthorizedException para que Nest devuelva 401
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.getEmail(), role: user.getRole() };
        const accessToken = this.jwtService.sign(payload);
        // refreshToken logic omitted for brevity
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
}