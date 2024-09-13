import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentoService {

  /**
   *
   */
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository:Repository<Departamento>
  ) {
    
    
  }
  async create(createDepartamentoDto: CreateDepartamentoDto) {
    return  await this.departamentoRepository.save(createDepartamentoDto);
  }

  async  findAll() {
    return await this.departamentoRepository.find()
  }

  async findOne(id: number) {
    return  await this.departamentoRepository.findBy({id})
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return `This action updates a #${id} departamento`;
  }

  async remove(id: number) {
    return await this.departamentoRepository.delete({id})
  }
}
