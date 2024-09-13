import { Module } from '@nestjs/common';
import { RecoleccionEntregaService } from './recoleccion-entrega.service';
import { RecoleccionEntregaController } from './recoleccion-entrega.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoleccionEntrega } from './entities/recoleccion-entrega.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RecoleccionEntrega])],
  controllers: [RecoleccionEntregaController],
  providers: [RecoleccionEntregaService],
})
export class RecoleccionEntregaModule {}
