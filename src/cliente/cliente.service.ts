import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, UpdateResult } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { BaseService } from 'src/constants/BaseService';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { RecoleccionEntrega } from 'src/recoleccion-entrega/entities/recoleccion-entrega.entity';
import { Cierre } from 'src/cierre/entities/cierre.entity';
import { IsLatitude } from 'class-validator';
import { CuentaBancaria } from 'src/cuenta-bancaria/entities/cuenta-bancaria.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { dateFormatter } from 'src/utils/utilidades';

@Injectable()
export class ClienteService {


  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>
  ) {

  }
  async createCliente(createClienteDto: CreateClienteDto) {
    try{
    const maxLength = 5; // maxLength is the max string length, not max # of fills
    console.log(`Cliente a crear `)
    const c = await this.clienteRepository.save(createClienteDto)
    return c;
    }catch(error){
      throw new ConflictException('Error al crear cliente'+ error)
    }
   /* console.log(`Cliente creado ${c}`);
    if(!c.id){
      throw new ConflictException('No se pudo Crear  el cliente')
    }
    const res = c.id.toString().padStart(maxLength, "0");
    c.codigoCliente=res;
    
    return await this.updateCodigoCliente(c.id, { codigoCliente: 'C-'+res});
 */
  }
  async updateCliente(updateClienteDto: UpdateClienteDto) {
    
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
    return await this.clienteRepository.findOne({ 
      where: {id
      }
    })
  }
  async findClienteRecolecciones(id: number,fechaInicio :string) {
    try{
      const temp=new Date(fechaInicio);
      console.log(temp)
      const fechaFin1=new Date(temp.getUTCFullYear(),temp.getUTCMonth()+1,0,17);
      console.log(fechaFin1);
    const clientes=await this.clienteRepository.find(
      {
        select:{
          envios:{
          
          }
        }
      ,
      relations:{
     
      },
 
      where: {
        id,
          envios: {
            fechaEntrega :Between(temp,fechaFin1),
             cerrada:true
          
          },
     
      }
      }
    );
    return clientes;
  }catch{
      throw new ConflictException('El cliente no existe')
    }

  }

  async updateCodigoCliente(id: number, updateClienteDto: UpdateClienteDto) {//esto es para actualizar el codigo del cliente
    console.log('cliente a actualizar',updateClienteDto.codigoCliente)
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
  async ClientesRecoleccionesCerradas(idCierre:number,idCliente :number){

    const users= await this.clienteRepository.find(
      {
      select:{
          
      },
      relations: {
        envios: {
          cierre:true
       
        },
    },
 
    where: {
        envios: {
            cierre:{
              id:idCierre
            },
           
        
        },
        ...(idCliente>0 && {id:idCliente})
    }

  })

  return users;
  }

  async ClienteByUsername(usuario:string){

    const cliente = await this.clienteRepository  
    .createQueryBuilder("cliente")
    .where("cliente.username = :usuario", { usuario: usuario})
    .getOne()

    return cliente;
  }

  
}
