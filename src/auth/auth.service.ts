import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwt-payload';

import { JwtService } from '@nestjs/jwt';
import { PERFILUSUARIO } from 'src/constants/perfil_usuario';
import { ClienteService } from 'src/cliente/cliente.service';

@Injectable()
export class AuthService {


/**
 *
 */
constructor(
  private usuarioService:UsuarioService,
  private clienteService:ClienteService,
  private jwtService:JwtService

) {

  
}
async validateUser(createAuthDto:CreateAuthDto){
 
  const user=await this.usuarioService.findByUsername(createAuthDto.username);

  if(user){

    if(!user.estado){
      throw  new  UnauthorizedException('Usuario no Vigente');
    }
    const isOk=await bcrypt.compare(createAuthDto.password,user.password);
    console.log(isOk);
    if(isOk){
  
      return user;
    }
  }
  return null;
}

async login(createAuthDto:CreateAuthDto){
  const user=await this.validateUser(createAuthDto);

  if(!user){
  throw  new  UnauthorizedException('Credenciales Invalidas');
  }
  //buscar el id del usuario si es empleado o si es cliente
  var id=0;
  if(user.perfilUsuario==PERFILUSUARIO.CLIENTE){
   const a= await this.clienteService.ClienteByUsername(user.username);
    //buscar cliente por usuariologeado
    if(a){
      id=a.id
    }
  
  }


  const payload:JwtPayload={
    username:user.username,
    perfilUsuario:user.perfilUsuario,



  }
  return {
    accessToken:this.jwtService.sign(payload),
    

  }
}
}