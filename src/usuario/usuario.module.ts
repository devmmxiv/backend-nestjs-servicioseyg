import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports:[UsuarioService]
})
export class UsuarioModule {}
