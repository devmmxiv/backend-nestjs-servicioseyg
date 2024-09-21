import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRecoleccionEntregaDto } from './dto/create-recoleccion-entrega.dto';
import { UpdateRecoleccionEntregaDto } from './dto/update-recoleccion-entrega.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecoleccionEntrega } from './entities/recoleccion-entrega.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecoleccionEntregaService {

/**
 *
 */
constructor(
  @InjectRepository(RecoleccionEntrega)
  private readonly repository:Repository<RecoleccionEntrega>
) {
  
  
}

  async create(createRecoleccionEntregaDto: CreateRecoleccionEntregaDto) {
    try{
      return await this.repository.save(createRecoleccionEntregaDto)
    }catch({ name, message } ){
      throw new ConflictException('Error creando recoleccion ',message)
    }
   
  }

 async findAll() {
    return await this.repository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} recoleccionEntrega`;
  }

  update(id: number, updateRecoleccionEntregaDto: UpdateRecoleccionEntregaDto) {
    return `This action updates a #${id} recoleccionEntrega`;
  }

  remove(id: number) {
    return `This action removes a #${id} recoleccionEntrega`;
  }
}
