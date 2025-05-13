import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterDto } from './application/dtos/register.dto';
import { LoginDto } from './application/dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.registerUseCase.execute(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}


