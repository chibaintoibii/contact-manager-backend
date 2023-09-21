import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { GroupsService } from "./groups.service";
import { ContactsService } from "../contacts/contacts.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller('groups')
// @UseGuards(AuthGuard)
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly contactsService: ContactsService
  ) {}

  @Post()
  async createGroup(@Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(dto);
  }

  @Get('/:id/contacts')
  getGroupContacts(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.contactsService.getContactsByGroup(userId, id);

  }

  @Get('/:id')
  getOneGroup(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.getOneGroup(id);
  }

  @Get()
  async getAllGroups() {
    return this.groupsService.getAllGroups();
  }

  @Put(":id")
  async updateGroup(@Param('id', ParseIntPipe)id: number, @Body() dto: UpdateGroupDto) {
    return this.groupsService.updateGroup(id, dto);
  }

  @Delete(":id")
  async deleteGroup(@Param('id', ParseIntPipe) id: number) {
    const result = await this.groupsService.deleteGroup(id);
    if(result > 0) return {message: 'delete group successfully'};
  }
}
