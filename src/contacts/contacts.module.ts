import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Contact } from "./models/contact.model";
import { Group } from "../groups/models/group.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [
    SequelizeModule.forFeature([Contact, Group]),
    JwtModule,
  ],
  exports: [ContactsService]
})
export class ContactsModule {}
