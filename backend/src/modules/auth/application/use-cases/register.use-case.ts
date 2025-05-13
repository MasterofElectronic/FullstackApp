import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository, USER_REPOSITORY } from "../../domain/interfaces/user-repository.interface"
import { RegisterDto } from "../dtos/register.dto";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository
    ) {}

    async execute(dto: RegisterDto): Promise<{ id: string; email: string }> {
        //Verificar si existe el usuario
        const exists = await this.userRepository.findByEmail(dto.email);
        if (exists) {
            throw new BadRequestException('Email already in use');
        }
        //Crear un user domain
        const user = User.register(dto.email, dto.password, dto.fullName);
        //Guardar
        await this.userRepository.save(user)
        return { id: user.id, email: user.getEmail() };
    }
}