import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'

import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('accounts')
export class CreateAcountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: Prisma.UserCreateInput) {
    const { email, name, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with this email already exists')
    }

    const hashedPassword = await hash(password, 6)

    await this.prisma.user.create({
      data: { email, name, password: hashedPassword },
    })
  }
}
