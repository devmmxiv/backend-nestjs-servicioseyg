import { Module } from '@nestjs/common';
import { CierreService } from './cierre.service';
import { CierreController } from './cierre.controller';
import { RecoleccionEntrega } from 'src/recoleccion-entrega/entities/recoleccion-entrega.entity';
import { RecoleccionEntregaService } from 'src/recoleccion-entrega/recoleccion-entrega.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cierre } from './entities/cierre.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { EmpleadoService } from 'src/empleado/empleado.service';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cierre,Cliente,Empleado])],
  controllers: [CierreController],
providers: [CierreService,ClienteService,EmpleadoService],
exports:[CierreService]
})
export class CierreModule {}
