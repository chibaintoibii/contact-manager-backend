import { HttpException, Injectable } from "@nestjs/common";
import { Contact } from "./models/contact.model";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { CreateContactDto } from "./dto/create-contact.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact) private readonly contactsRepository: typeof Contact
  ) {}
  async createContact(dto: CreateContactDto) {
    const contact = await this.contactsRepository.findOne({
      where: {phoneNumber: dto.phoneNumber}
    })

    if(contact) throw new HttpException('this contact has already been created', 400);

    return this.contactsRepository.create({ ...dto });
  }

  async getAllContacts() {
    return this.contactsRepository.findAll({
      order: [['name', 'ASC']],
      attributes: ['id', 'name', 'email', 'phoneNumber', 'groupId', 'imageURL']
    })
  }

  async getContactById(id: number) {
    return this.contactsRepository.findOne({
      where: { id },
      attributes: ['id', 'name', 'email', 'phoneNumber', 'groupId', 'imageURL']
    });
  }

  async getContactsByGroup(groupId: number) {
    return this.contactsRepository.findAll({
      where: { groupId }
    });
  }

  async updateContact(id: number, dto: UpdateContactDto) {
    let contact = await this.contactsRepository.findOne({
      where: {id, state: 1}
    });
    if(!contact) throw new HttpException('Contact not found', 404);

    Object.assign(contact, dto);
    await contact.save();
    return contact;
  }

  async deleteContact(id: number) {
    const contact = await this.contactsRepository.findOne({
      where: {id, state: 1}
    });

    if(!contact) throw new HttpException('Contact not found', 404);

    contact.state = 1;
    await contact.save();

    return {message: 'Contact deleted successfully'};
  }
}
