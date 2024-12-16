import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm';
import { CreateDireccionEmpleadoDto } from './dto/create-direccion-empleado';
import { DireccionEmpleado } from './entities/direccion_empleado.entity';

@Injectable()
export class DireccionEmpleadoService {
  constructor(
    @InjectRepository(DireccionEmpleado)

    private readonly dEmpleadoRepository:Repository<DireccionEmpleado>
  ) {
   
    
  }

  async createDireccionEmpleado(createDireccionEmpleadoDto: CreateDireccionEmpleadoDto) {
    try{
      return await this.dEmpleadoRepository.save(createDireccionEmpleadoDto)
    }catch(error){

      throw new ConflictException('No se pudo grabar la direccion del empleado');
    }
    

  }

}
