import { Module } from '@nestjs/common';
import { RecoleccionController } from './recoleccion.controller';
import { RecoleccionService } from './recoleccion.service';
import { Recoleccion } from './entities/recoleccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Recoleccion])],
  controllers: [RecoleccionController],
  providers: [RecoleccionService]
})
export class RecoleccionModule {}
