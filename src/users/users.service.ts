import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      include: {
        posts: true,
        UserSetting: true,
      },
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('user not found', 404);
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        UserSetting: true,
        posts: true,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        UserSetting: {
          create: {
            notificationsOn: true,
            smsEnable: false,
          },
        },
      },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException('user already taken', 400);
    if (data.username) {
      const user = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (user) throw new HttpException('user already taken', 400);
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  async updateUserSetting(id: number, data: Prisma.UserSettingUpdateInput) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException('user not found', 404);
    if (!user.UserSetting) throw new HttpException('Bad request', 400);
    return this.prisma.userSetting.update({ where: { userId: id }, data });
  }

  async deleteUserById(id: number) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException('user not found', 404);
    if (user.posts) await this.prisma.post.deleteMany();
    if (user.UserSetting)
      await this.prisma.userSetting.delete({ where: { userId: id } });

    return this.prisma.user.delete({ where: { id } });
  }
}
