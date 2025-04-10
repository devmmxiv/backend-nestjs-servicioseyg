import { ConflictException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto, updatePasswordUsuarioDto } from './dto/create-usuario.dto';
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
  async updatePassword(createUsuarioDto: updatePasswordUsuarioDto) {
    const userExst = await this.repositoryUsuario.findOne({ where: {username:createUsuarioDto.username}});
    if(!userExst){
      throw new ConflictException(`Usuario ${createUsuarioDto.username} No existe`);
    }
    console.log("la nueva contraseña es ",createUsuarioDto.password);
    const hash=await  bcrypt.hash( createUsuarioDto.password, 10);
    createUsuarioDto.password=hash;
    console.log("usuario actualizado",createUsuarioDto);
    try{
   
  
      const resp= await  this.repositoryUsuario
       .createQueryBuilder()
       .update()
       .set({ password:createUsuarioDto.password })
       .where("username = :user",{user:createUsuarioDto.username})
       .execute()
       return resp;
      }catch({ name, message } ){
     
        throw new ConflictException('Error asignado idCierre ',message)
      }


 
  }

 async  findAll() {
    return await this.repositoryUsuario.find();
  }

  async findOne(usuario :CreateUsuarioDto) {
  
    return  await this.repositoryUsuario.findOneBy({'username':usuario.username, 'password':usuario.password});
  }
  async findByUsername( username:string){
 
    const a=  await this.repositoryUsuario.findOneBy({'username':username});

    if(a!=null){
     // console.log('usuario encontrado'+a.username)

    }
    return a;
  }

  async update(id: string, updatePerfilDto: UpdateUsuarioDto) {
    return await this.repositoryUsuario.update(id,updatePerfilDto)
  }

  async remove(id: string) {
    return this.repositoryUsuario.delete(id);

  }
}
