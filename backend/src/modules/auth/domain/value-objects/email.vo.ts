export class Email {

    private constructor(public readonly value: string) {}

    static create(email: string): Email {
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        return new Email(email.toLowerCase());
    }
}