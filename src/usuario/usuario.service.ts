import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {

  /**
   *
   */
  constructor(
    @InjectRepository(Usuario)
    private readonly repositoryUsuario:Repository<Usuario>
    
  ) {
    
    
  }
  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.repositoryUsuario.save(createUsuarioDto);
  }

 async  findAll() {
    return await this.repositoryUsuario.find()
  }

  async findOne(usuario :CreateUsuarioDto) {
    return  await this.repositoryUsuario.findOneBy({'username':usuario.username, 'password':usuario.password});
  }

  async update(id: string, updatePerfilDto: UpdateUsuarioDto) {
    return await this.repositoryUsuario.update(id,updatePerfilDto)
  }

  async remove(id: string) {
    return this.repositoryUsuario.delete(id);

  }
}
