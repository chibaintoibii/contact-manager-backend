import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, Req, UseGuards
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('contacts')
@UseGuards(AuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService){}

  @Post()
  createContact(@Body() dto: CreateContactDto) {
    return this.contactsService.createContact(dto);
  }

  @Get()
  getAllContacts(@Req() req) {
    const userId = req.user.id;
    return this.contactsService.getAllContacts(userId);
  }

  @Get(':id')
  getContactById(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.contactsService.getContactById(userId, id);
  }

  @Put(':id')
  updateContact(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateContactDto) {
    return this.contactsService.updateContact(id, dto);
  }

  @Delete(':id')
  deleteContact(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.contactsService.deleteContact(userId, id);
  }
}
