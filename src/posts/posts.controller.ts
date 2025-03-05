import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { createPostDto } from './dtos/createPost.dto';
import { updatePostDto } from './dtos/updatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private PostService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createPost(@Body() { userId, ...createPostData }: createPostDto) {
    return this.PostService.createPost(userId, createPostData);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updatePostDto,
  ) {
    return this.PostService.updatePost(id, data);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.PostService.deletePost(id);
  }
}
