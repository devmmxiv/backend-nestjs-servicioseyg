import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { BaseService } from 'src/constants/BaseService';

@Injectable()
export class ClienteService {


  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>
  ) {

  }
  async create(createClienteDto: CreateClienteDto) {

    const maxLength = 5; // maxLength is the max string length, not max # of fills

    const c = await this.clienteRepository.save(createClienteDto)

    const res = c.id.toString().padStart(maxLength, "0");
    c.codigoCliente=res;

    return await this.update(c.id, { codigoCliente: 'C-'+res});
  }

  async findAll() {
    return await this.clienteRepository.find()
  }

  async findOne(id: number) {
    return await this.clienteRepository.findBy({ id })
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return await this.clienteRepository.update(id, updateClienteDto);
  }

  async remove(id: number) {
    return await this.clienteRepository.softRemove({ id });
  }
}
