import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepository:Repository<Direccion>
  ) {
   
    
  }
  async create(createDireccionDto: CreateDireccionDto) {
    try{
      return await this.direccionRepository.save(createDireccionDto)
    }catch(error){

      throw new ConflictException('No se pudo grabar la direccion');
    }
    

  }

  async findAll() {
    return await this.direccionRepository.find()
  }

  async findOne(id: number) {
    return await this.direccionRepository.findBy({id})
  }

  async update(id: number, updateDireccionDto: UpdateDireccionDto) {
    return `This action updates a #${id} direccion`;
  }

  async remove(id: number) {
    return `This action removes a #${id} direccion`;
  }
}
