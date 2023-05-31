import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class Client {
  readonly id: string;
  name: string;
  email: string;
  telefone: number;
  readonly createdAt: Date;
  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
  }
}
