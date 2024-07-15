import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAcountController } from './controllers/create-account.controller'

@Module({
  imports: [],
  controllers: [CreateAcountController],
  providers: [PrismaService],
})
export class AppModule {}
