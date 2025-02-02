import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  login(@Body() CreateAuthDto :CreateAuthDto){
    return this.authService.login(CreateAuthDto)
  }

  @Get('data-user')
  @UseGuards(AuthGuard('jwt'))
  dataUser(@Req() request){
   console.log('datauser check jwt')
    return request.user;
  }
}
