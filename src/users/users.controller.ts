import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { updateUserSettingDto } from './dtos/userSetting.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: createUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, data);
  }

  @Patch(':id/settings')
  @UsePipes(new ValidationPipe())
  updateUserSetting(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateUserSettingDto,
  ) {
    return this.userService.updateUserSetting(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
