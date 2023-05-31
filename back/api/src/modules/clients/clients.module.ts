import { ClientPrismaRepository } from './repositories/prisma/client-prisma.repository';
import { PrismaService } from './../../database/prisma.service';
import { ClientsInMemoryRepository } from './repositories/in-memory/clients.in-memory.reposiroty';
import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientsRepository } from './repositories/clients.repository';

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    PrismaService,
    {
      provide: ClientsRepository,
      useClass: ClientPrismaRepository,
    },
  ],
  exports: [ClientsService]
})
export class ClientsModule {}
