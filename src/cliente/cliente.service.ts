import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { BaseService } from 'src/constants/BaseService';
import { Direccion } from 'src/direccion/entities/direccion.entity';

@Injectable()
export class ClienteService {


  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>
  ) {

  }
  async createCliente(createClienteDto: CreateClienteDto) {

    const maxLength = 5; // maxLength is the max string length, not max # of fills

    const c = await this.clienteRepository.save(createClienteDto)

    const res = c.id.toString().padStart(maxLength, "0");
    c.codigoCliente=res;

    return await this.updateCodigoCliente(c.id, { codigoCliente: 'C-'+res});
  }
  async updateCliente(updateClienteDto: UpdateClienteDto) {
    console.log('cliente a actualizar',updateClienteDto)
    if(!updateClienteDto.id){
      throw new ConflictException('El cliente no existe')
    }
    const clienteExiste :Cliente = await this.findCliente(updateClienteDto.id);
    if(!clienteExiste ){
      throw new ConflictException('El cliente con el id '+updateClienteDto.id+ ' no existe')
    }
    if(clienteExiste.deleted){
      throw new ConflictException('El cliente con el id '+updateClienteDto.id+ ' ya esta borrado')

    }

    const c = await this.clienteRepository.save(updateClienteDto)

    return c;
  }

  async findAll() {
    return await this.clienteRepository.find({where:{deleted:false}})

    return this.clienteRepository
      .createQueryBuilder('cliente')
      .orderBy('cliente.id', 'DESC')
      .select(['id AS cliente_id'])
      .getRawMany() // or .getMany()

  }
  async findSend() {

   return await this.clienteRepository.createQueryBuilder("cliente")
    .leftJoinAndSelect("cliente.direcciones", "direccion")
   // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
    .where('cliente.id=direccion.clienteid')
    .where('cliente.deleted=false')
    .getMany()


  }

  async findCliente(id: number) {
    return await this.clienteRepository.findOne({ where: {id}})
  }

  async updateCodigoCliente(id: number, updateClienteDto: UpdateClienteDto) {//esto es para actualizar el codigo del cliente

    return await this.clienteRepository.update(id, updateClienteDto);
  }

  async removeCliente(id: number) {
    const clienteExiste :Cliente = await this.findCliente(id);
    if(clienteExiste ==null){
      throw new ConflictException('El cliente con el id '+id+ ' no existe')
    }
    if(clienteExiste.deleted){
      throw new ConflictException('El cliente con el id '+id+ ' ya esta borrado')

    }
    const rows:UpdateResult=await this.clienteRepository.update({id},{deleted:true});
    return rows.affected==1;

    
  }
}
