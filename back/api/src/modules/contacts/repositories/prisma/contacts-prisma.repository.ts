import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactsRepository } from '../contacts.repository';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto, clientId: string): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, {
      ...data,
    });
    const newContact = await this.prisma.contact.create({
      data: { ...contact, clientId },
    });
    return newContact;
  }
  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    return contact;
  }

  async findByName(name: string) {
    return await this.prisma.contact.findFirst({where: {name}})
  }

  async findAll(name:string): Promise<object | Contact[]> {
    const contacts = await this.prisma.contact.findMany();
    if (name) {
      return this.findByName(name)
    }
    return contacts;
  }
  async findByEmail(email: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({ where: { email } });
    return contact;
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });
    return contact;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({ where: { id } });
  }
}
