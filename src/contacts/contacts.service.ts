import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Contact } from "./models/contact.model";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact) private readonly contactsRepository: typeof Contact
  ) {}
  async createContact(userId: number, dto: CreateContactDto) {
    const contact = await this.contactsRepository.findOne({
      where: { phoneNumber: dto.phoneNumber, user_id: userId }
    });

    if(contact) throw new HttpException('this contact has already been created', 400);

    return this.contactsRepository.create({ ...dto, user_id: userId });
  }

  async getAllContacts(userId: number) {
    return this.contactsRepository.findAll({
      where: { state: 1, user_id: userId },
      order: [['name', 'ASC']],
      attributes: ['id', 'name', 'email', 'phoneNumber', 'groupId', 'imageURL'],
    })
  }

  async getContactById(userId: number, id: number) {
    return this.contactsRepository.findOne({
      where: { id, state: 1, user_id: userId },
      attributes: ['id', 'name', 'email', 'phoneNumber', 'groupId', 'imageURL']
    });
  }

  async getContactsByGroup(userId: number, groupId: number) {
    return this.contactsRepository.findAll({
      where: { groupId, state: 1, user_id: userId }
    });
  }

  async updateContact(userId: number, dto: UpdateContactDto) {
    let contact = await this.contactsRepository.findOne({
      where: { id: dto.id, state: 1 }
    });
    if(!contact) throw new HttpException('Contact not found', 404);

    Object.assign(contact, dto);
    await contact.save();
    return contact;
  }

  async deleteContact(userId: number, id: number) {
    const contact = await this.contactsRepository.findOne({
      where: { id, state: 1, user_id: userId },
    });

    if(!contact) throw new HttpException('Contact not found', 404);

    contact.state = 0;
    await contact.save();

    return { message: 'Contact deleted successfully' };
  }
}
