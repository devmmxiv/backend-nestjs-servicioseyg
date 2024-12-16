import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { DireccionService } from 'src/direccion/direccion.service';
import { CuentaBancariaService } from 'src/cuenta-bancaria/cuenta-bancaria.service';

import { Banco } from 'src/banco/entities/banco.entity';
import { Municipio } from 'src/municipio/entities/municipio.entity';
import { MunicipioService } from 'src/municipio/municipio.service';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { DepartamentoService } from 'src/departamento/departamento.service';
import { RecoleccionEntrega } from 'src/recoleccion-entrega/entities/recoleccion-entrega.entity';
import { RecoleccionEntregaService } from 'src/recoleccion-entrega/recoleccion-entrega.service';
import { CuentaBancaria } from 'src/cuenta-bancaria/entities/cuenta-bancaria.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente,CuentaBancaria,Direccion])],
  controllers: [ClienteController],
  providers: [ClienteService,CuentaBancariaService,
 DireccionService ],
 exports:[ClienteService]


})
export class ClienteModule {}
