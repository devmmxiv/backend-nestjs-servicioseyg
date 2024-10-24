import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('add')
  create(@Body() createPerfilDto: CreateUsuarioDto) {
    return this.usuarioService.create(createPerfilDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Post('find/user')
  findOne(@Body() pefil :CreateUsuarioDto) {
    return this.usuarioService.findOne(pefil);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfilDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
