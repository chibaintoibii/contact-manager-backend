import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { Contact } from "./contacts/models/contact.model";
import { GroupsModule } from './groups/groups.module';
import { Group } from "./groups/models/group.model";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot(),
    ContactsModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      models: [Contact, Group],
      autoLoadModels: true,
    }),
    GroupsModule
  ],
  providers: []
})
export class AppModule {}
