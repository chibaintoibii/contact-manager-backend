import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./models/group.model";
import { Contact } from "../contacts/models/contact.model";
import { ContactsModule } from "../contacts/contacts.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([Group, Contact]),
    ContactsModule,
    JwtModule
  ]
})
export class GroupsModule {}
