import { Injectable } from '@nestjs/common';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Banco } from './entities/banco.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BancoService {

  /**
   *
   */
  constructor(
    @InjectRepository(Banco)
    private readonly repositoryBanco:Repository<Banco>
  ) {
    
    
  }
  async create(createBancoDto: CreateBancoDto) {
    return await this.repositoryBanco.save(createBancoDto);
  }

  async findAll() {
    return await  this.repositoryBanco.find(); 
  }

  findOne(id: number) {
    return `This action returns a #${id} banco`;
  }

  update(id: number, updateBancoDto: UpdateBancoDto) {
    return `This action updates a #${id} banco`;
  }

  remove(id: number) {
    return `This action removes a #${id} banco`;
  }
}
