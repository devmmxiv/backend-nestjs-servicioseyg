import { Injectable } from '@nestjs/common';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MunicipioService {
constructor(
  @InjectRepository(Municipio)
  private readonly municipioRepository:Repository<Municipio>
){}

  async create(createMunicipioDto: CreateMunicipioDto) {
    return await this.municipioRepository.save(createMunicipioDto); 
  }

  async findAll() {

    return await this.municipioRepository.find();
  }

  async findOne(id: number) {
    return await this.municipioRepository.findBy({id})
  }

  async update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    return await this.municipioRepository.update(id,updateMunicipioDto)
  }

  async remove(id: number) {
    return  await this.municipioRepository.delete({id});
  }
}
