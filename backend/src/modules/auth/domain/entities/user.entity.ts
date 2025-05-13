import { Email } from '../value-objects/email.vo';
import { HashedPassword } from '../value-objects/hashed-password.vo';
import { v4 as uuidv4 } from 'uuid';

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}


export class User {
    readonly id: string;
    private email: Email;
    private password: HashedPassword;
    private fullName: string;
    private role: Role;

    private constructor(
        id: string,
        email: Email,
        password: HashedPassword,
        fullName: string,
        role: Role,
    ){
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
    }

    static fromPersistence(
        id: string,
        emailValue: string,
        hashedPassword: string,
        fullName: string,
        role: Role,
    ): User {
        const email = Email.create(emailValue);
        const password = HashedPassword.fromHash(hashedPassword);
        const user = new User(id, email, password, fullName, role);
        return user;
    }

    static register (
        rawEmail: string,
        rawPassword: string,
        fullName: string,
        role: Role = Role.USER,
    ): User {
        const id = uuidv4();
        const email = Email.create(rawEmail);
        const password = HashedPassword.create(rawPassword);
        return new User(id, email, password, fullName, role);
    }

    validatePassword(raw: string): boolean {
        return this.password.validate(raw);
    }

    getEmail(): string {
        return this.email.value;
    }

    getFullName(): string {
        return this.fullName;
    }

    getRole(): Role {
        return this.role;
    }

    getPasswordHash(): string {
        return this.password.getHash();
    }

    

}