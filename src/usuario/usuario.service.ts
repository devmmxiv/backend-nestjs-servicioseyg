import { ConflictException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
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
    const userExst = await this.repositoryUsuario.findOne({ where: {username:createUsuarioDto.username}});
    if(userExst){
      throw new ConflictException(`Usuario ${createUsuarioDto.username} ya existe`);
    }
    
    const hash=await  bcrypt.hash( createUsuarioDto.password, 10);
    createUsuarioDto.password=hash;
    const c = await this.repositoryUsuario.save(createUsuarioDto)
    c.password=undefined;

    return c;
  }

 async  findAll() {
    return await this.repositoryUsuario.find();
  }

  async findOne(usuario :CreateUsuarioDto) {
  
    return  await this.repositoryUsuario.findOneBy({'username':usuario.username, 'password':usuario.password});
  }
  async findByUsername( username:string){
    console.log('buscar usuario')
    return  await this.repositoryUsuario.findOneBy({'username':username});
  }

  async update(id: string, updatePerfilDto: UpdateUsuarioDto) {
    return await this.repositoryUsuario.update(id,updatePerfilDto)
  }

  async remove(id: string) {
    return this.repositoryUsuario.delete(id);

  }
}
