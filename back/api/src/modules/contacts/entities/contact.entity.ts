import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;
  name: string;
  email: string;
  telefone: number;
  readonly createdAt: Date;
  clientId: string

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
  }
}
