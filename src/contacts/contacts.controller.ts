import {
  Body,
  Controller,
  Delete,
  Get, HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService){}

  @Post()
  createContact(@Body() dto: CreateContactDto) {
    return this.contactsService.createContact(dto);
  }

  @Get()
  getAllContacts() {
    return this.contactsService.getAllContacts();
  }

  @Get(':id')
  getContactById(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.getContactById(id);
  }

  @Put(':id')
  updateContact(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateContactDto) {
    return this.contactsService.updateContact(id, dto);
  }

  @Delete(':id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.deleteContact(id);
  }
}
