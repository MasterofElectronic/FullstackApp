import * as bcrypt from 'bcrypt';

export class HashedPassword {
    private constructor(private readonly hash: string){}

    static create(rawPassword: string): HashedPassword {
        if (rawPassword.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(rawPassword, salt);
        return new HashedPassword(hash);
    }

    static fromHash(hash: string): HashedPassword {
        return new HashedPassword(hash);
    }

    validate(rawPassword: string): boolean {
        return bcrypt.compareSync(rawPassword, this.hash);
    }

    getHash(): string {
        return this.hash;
    }

}