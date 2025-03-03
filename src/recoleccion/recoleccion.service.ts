import { ConflictException, Injectable } from '@nestjs/common';
import { Recoleccion } from './entities/recoleccion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecoleccionDto } from './dto/create-recoleccion.dto';

@Injectable()
export class RecoleccionService {

constructor(
  @InjectRepository(Recoleccion)
  private readonly repository:Repository<Recoleccion>
) { 
  
}

  async create(createRecoleccionDto: CreateRecoleccionDto) {
    try{
    console.log(createRecoleccionDto);
      return await this.repository.save(createRecoleccionDto)
    }catch({ name, message } ){
    
      throw new ConflictException('Error creando recoleccion ',message)
    }
   
  }
  async findAll() {
    return await this.repository.find()
  }

  async findRecolecciones() {
    const estado='ENTREGADA'
 
 
   }
}
