import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { User } from "../../domain/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserOrmEntity } from "../entities/user.orm-entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repo: Repository<UserOrmEntity>,
    ) {}

    async save(user: User): Promise<void> {
        const ormUser = this.repo.create({
            id: user.id,
            email: user.getEmail(),
            password: user.getPasswordHash(),
            fullName: user.getFullName(),
            role: user.getRole(),
        });
        await this.repo.save(ormUser);
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const ormUser = await this.repo.findOne({ where: { email } });
        if (!ormUser) return null;


        //Reconstruir el User del dominio desde la entidad ORM
        return User['fromPersistence'](
            ormUser.id,
            ormUser.email,
            ormUser.password,
            ormUser.fullName,
            ormUser.role,
        );
    }
    
}