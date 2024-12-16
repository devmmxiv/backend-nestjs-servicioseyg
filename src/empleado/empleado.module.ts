import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { DireccionEmpleado } from 'src/direccion/entities/direccion_empleado.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Empleado,DireccionEmpleado])
  ],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
})
export class EmpleadoModule {}
