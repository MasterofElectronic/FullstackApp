import { User } from "../entities/user.entity";

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}