import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}
  async create(createContactDto: CreateContactDto, clientId: string) {
    const findContact = await this.contactsRepository.findByEmail(createContactDto.email)
    if (findContact){
      throw new ConflictException('Contact already exists.')
    }
    const contact = await this.contactsRepository.create(createContactDto, clientId);
    return contact;
  }

  async findAll(group: string | undefined) {
    const contacts = await this.contactsRepository.findAll(group)
    return contacts;
  }

  async findOne(id: string) {
    const contact = await this.contactsRepository.findOne(id);
    if (!contact){
      throw new NotFoundException('Contact not found.', 404)
    }
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.contactsRepository.update(id, updateContactDto)
    if (!contact){
      throw new NotFoundException('Contact not found.', 404)
    }
    return contact;
  }

  async remove(id: string) {
    const contact = await this.contactsRepository.findOne(id)
    if (!contact){
      throw new NotFoundException('Contact not found.', 404)
    }
    await this.contactsRepository.delete(id)
  }
}
