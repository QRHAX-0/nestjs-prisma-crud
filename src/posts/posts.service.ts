import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updatePost(id: number, data: Prisma.PostUpdateWithoutUserInput) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new HttpException('post not found', 404);
    return this.prisma.post.update({ where: { id }, data });
  }

  async deletePost(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new HttpException('post not found', 404);
    return this.prisma.post.delete({ where: { id } });
  }
}
