import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

//Domain Interfaces & Entities
import { USER_REPOSITORY } from './domain/interfaces/user-repository.interface';

//Infrastructure
import { UserOrmEntity } from './infrastructure/entities/user.orm-entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy'; 

//Application
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';

//Controller
import { AuthController } from './auth.controller';

//Services
import { AuthService } from './auth.service';

//Strategies
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    //Strategy
    JwtStrategy,
    //Services
    AuthService,
    //Repositories
    { provide: USER_REPOSITORY, useClass: UserRepository },
    //Guards
    { provide: APP_GUARD, useClass: RolesGuard },
    //Use Cases
    RegisterUseCase,
    LoginUseCase,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
