import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PerfilService {

  /**
   *
   */
  constructor(
    @InjectRepository(Perfil)
    private readonly repositoryPerfil:Repository<Perfil>
    
  ) {
    
    
  }
  async create(createPerfilDto: CreatePerfilDto) {
    return await this.repositoryPerfil.save(createPerfilDto);
  }

 async  findAll() {
    return await this.repositoryPerfil.find()
  }

  async findOne(perfil :CreatePerfilDto) {
    return  await this.repositoryPerfil.findOneBy({'usuario':perfil.usuario, 'password':perfil.password});
  }

  async update(id: string, updatePerfilDto: UpdatePerfilDto) {
    return await this.repositoryPerfil.update(id,updatePerfilDto)
  }

  async remove(id: string) {
    return this.repositoryPerfil.delete(id);

  }
}
