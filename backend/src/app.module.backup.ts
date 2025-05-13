import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { SearchModule } from './modules/search/search.module';
import { RegistrationsModule } from './modules/registrations/registrations.module';

@Module({
  imports: [
    // 1) ConfigModule: carga .env automáticamente
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),
    

    // 2) TypeORM (PostgreSQL + PostGIS)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, //solo dev
      }),
    }),


    // 3) Mongoose (MongoDB)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const user = config.get<string>('MONGO_USER');
        const pass = config.get<string>('MONGO_PASS');
        const host = config.get<string>('MONGO_HOST');
        const port = config.get<string>('MONGO_PORT');
        const db   = config.get<string>('MONGO_DB');
        return {
          uri: `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`,
        };
      },
    }),


    HealthModule,


    AuthModule,


    UsersModule,


    EventsModule,


    SearchModule,


    RegistrationsModule,
  ],
  controllers: [],
  providers: [],
})


export class AppModule {}
