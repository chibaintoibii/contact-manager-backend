import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { Contact } from "./contacts/models/contact.model";
import { GroupsModule } from './groups/groups.module';
import { Group } from "./groups/models/group.model";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as process from "process";
import { JwtModule } from "@nestjs/jwt";
import { User } from "./users/models/user.model";

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ContactsModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      models: [Contact, Group, User],
      autoLoadModels: true,
    }),
    GroupsModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: []
})
export class AppModule {}
