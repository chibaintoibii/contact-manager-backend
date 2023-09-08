import { HttpException, Injectable } from "@nestjs/common";
import { Group } from "./models/group.model";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) private readonly groupsRepository: typeof Group) {}

  async createGroup(dto: CreateGroupDto) {
    const group = await this.groupsRepository.findOne({
      where: {name: dto.name}
    });
    if(group) throw new HttpException('Group already exists', 400);

    return this.groupsRepository.create(dto);
  }

  async getAllGroups() {
    return this.groupsRepository.findAll({
      order: [['name', 'ASC']]
    });
  }

  async getOneGroup(id: number) {
    const group = await this.groupsRepository.findOne({
      where: {id: id}
    });
    return group;
  }

  async updateGroup(id: number, dto: UpdateGroupDto) {
    let group = await this.groupsRepository.findOne({
      where: {id}
    });
    if(group) throw new HttpException('Group already exists', 400);

    Object.assign(group, dto);
    await group.save();
    return group;
  }

  async deleteGroup(id: number) {
    return await this.groupsRepository.destroy({
      where: {id: id}
    });
  }

}
