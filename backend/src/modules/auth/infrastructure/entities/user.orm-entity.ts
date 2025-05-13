import { Entity, PrimaryColumn, Column } from 'typeorm'
import { Role } from '../../domain/entities/user.entity';

@Entity({ name: 'users' })
export class UserOrmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;
}