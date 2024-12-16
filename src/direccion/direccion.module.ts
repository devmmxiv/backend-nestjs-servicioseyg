import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { DireccionEmpleado } from './entities/direccion_empleado.entity';
import { DireccionEmpleadoService } from './direccion-empleado.service';

@Module({
  imports:[TypeOrmModule.forFeature([Direccion,DireccionEmpleado])],
  controllers: [DireccionController],
  providers: [DireccionService,DireccionEmpleadoService],
})
export class DireccionModule {}
