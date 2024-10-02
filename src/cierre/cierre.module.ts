import { Module } from '@nestjs/common';
import { CierreService } from './cierre.service';
import { CierreController } from './cierre.controller';
import { RecoleccionEntrega } from 'src/recoleccion-entrega/entities/recoleccion-entrega.entity';
import { RecoleccionEntregaService } from 'src/recoleccion-entrega/recoleccion-entrega.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cierre } from './entities/cierre.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cierre,Cliente])],
  controllers: [CierreController],
providers: [CierreService,ClienteService],
exports:[CierreService]
})
export class CierreModule {}
