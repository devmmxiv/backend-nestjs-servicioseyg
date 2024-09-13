import { Injectable } from '@nestjs/common';
import { CreateCuentaBancariaDto } from './dto/create-cuenta-bancaria.dto';
import { UpdateCuentaBancariaDto } from './dto/update-cuenta-bancaria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentaBancaria } from './entities/cuenta-bancaria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CuentaBancariaService {
  /**
   *
   */
  constructor(
    @InjectRepository(CuentaBancaria)
    private readonly cuentaRepository :Repository<CuentaBancaria>
    ) {
    
    
  }
  async create(createCuentaBancariaDto: CreateCuentaBancariaDto) {
    return await this.cuentaRepository.save(createCuentaBancariaDto)
  }

  findAll() {
    return `This action returns all cuentaBancaria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentaBancaria`;
  }

  update(id: number, updateCuentaBancariaDto: UpdateCuentaBancariaDto) {
    return `This action updates a #${id} cuentaBancaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuentaBancaria`;
  }
}
