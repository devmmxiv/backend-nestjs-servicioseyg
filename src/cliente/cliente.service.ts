import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, UpdateResult } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { ESTATUSRECOLECCION } from 'src/constants/status_recoleccion';
import { TIPODIRECCION } from 'src/constants/direccion-enum';

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

    const c = await this.clienteRepository.save(createClienteDto)
    if(!c.id){
      throw new ConflictException('No se pudo Crear  el cliente')
    }
    const res = c.id.toString().padStart(maxLength, "0");
    c.codigoCliente=res;
    
    return await this.updateCodigoCliente(c.id, { codigoCliente: 'C-'+res});
    }catch(error){
      throw new ConflictException('Error al crear cliente'+ error)
    }
 
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

    return this.clienteRepository.createQueryBuilder("cliente")
    .leftJoinAndSelect("cliente.direcciones","direcciones")
    .leftJoinAndSelect("cliente.cuentas","cuentas")
    .leftJoinAndSelect("cliente.usuario","usuario")
    .leftJoinAndSelect("cuentas.banco","banco")
    .leftJoinAndSelect("direcciones.municipio","municipio")
    .where("cliente.deleted=:deleted", { deleted: false})
    .select(["cliente","direcciones","cuentas","usuario.username","banco","municipio"]).getMany();



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
  async findClienteRecolecciones(id: number,fecha :string) {
    try{
      const temp=new Date(fecha);
      const fechaInicio=new Date(temp.getUTCFullYear(),temp.getUTCMonth(),1);
      //console.log(fechaInicio)
      const fechaFin=new Date(temp.getUTCFullYear(),temp.getUTCMonth()+1,0,17);
     // console.log(fechaFin);
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
            fechaEntrega :Between(fechaInicio,fechaFin),
             cerrada:true
          
          },
     
      },
      order:{
        envios:{
          fechaEntrega : "ASC"
        }
      }
      }
    );
    return clientes;
  }catch{
      throw new ConflictException('El cliente no existe')
    }

  }
  async findClientegroupRecolecciones(id: number) {
    try{

   
     // console.log(fechaFin);
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
            estado:ESTATUSRECOLECCION.CREADA,
             cerrada:false
          
          },
     
      },
      order:{
        envios:{
          fechaEntrega : "ASC"
        }
      }
      }
    );
    return clientes;
  }catch{
      throw new ConflictException('El cliente no existe')
    }

  }
  async updateCodigoCliente(id: number, updateClienteDto: UpdateClienteDto) {//esto es para actualizar el codigo del cliente
    //console.log('cliente a actualizar',updateClienteDto.codigoCliente)
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
          cierre:true,
          municipioRecibe:true
       
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
    .leftJoinAndSelect("cliente.direcciones","direccion")
    .leftJoinAndSelect("direccion.municipio","municipio")
    .where("cliente.username = :usuario", { usuario: usuario})
    .getOne()
   
    return cliente;
  }
 
  async ClienteRecoleccionesNoCerradas(id:number){

    const cliente = await this.clienteRepository  
    .createQueryBuilder("cliente")
    .leftJoinAndSelect("cliente.direcciones","direccion").andWhere('direcciones.tipoDireccion=:tipo',{tipo:"principal"})
    .leftJoinAndSelect("cliente.envios","recolecciones")
    .leftJoinAndSelect("recolecciones.municipioRecibe","municipioRecibe")
    .leftJoinAndSelect("recolecciones.empleadoAsignado","empleado")
    .leftJoinAndSelect("direccion.municipio","municipio")
    .where("cliente.id = :id", { id: id})
    .andWhere("recolecciones.cerrada=:cerrada",{cerrada:false})
    //
    //.andWhere("direccion.tipoDireccion:tipo",{tipo:TIPODIRECCION.PRINCIPAL})
    .getMany()
   
    return cliente;
  }
   
  async ClienteRecoleccionesNoCerradasAdministrador(){
try{
    const cliente = await this.clienteRepository  
    .createQueryBuilder("cliente")
    .leftJoinAndSelect("cliente.direcciones","direccion").andWhere('direcciones.tipoDireccion=:tipo',{tipo:"principal"})
    .leftJoinAndSelect("cliente.envios","recolecciones")
    .leftJoinAndSelect("recolecciones.municipioRecibe","municipioRecibe")
    .leftJoinAndSelect("recolecciones.empleadoAsignado","empleado")
    .leftJoinAndSelect("direccion.municipio","municipio")
   .where("recolecciones.cerrada=:cerrada",{cerrada:false})
    .getMany()
   
    return cliente;
}catch(e){
  throw new ConflictException('Error consultar recolecciones no cerradas'+ e)
}
  }
  async ClientesRecoleccionesNoCerradasPorEmpleado(idEmpleado:number){
try{
    const cliente = await this.clienteRepository  
    .createQueryBuilder("cliente")
    .leftJoinAndSelect("cliente.direcciones","direccion")
    .leftJoinAndSelect("cliente.envios","recolecciones")
    .leftJoinAndSelect("recolecciones.municipioRecibe","municipioRecibe")
    .leftJoinAndSelect("recolecciones.empleadoAsignado","empleado")
    .leftJoinAndSelect("direccion.municipio","municipio")
    .where("empleado.id = :id", { id: idEmpleado})
    .andWhere("recolecciones.cerrada=:cerrada",{cerrada:false})
    //
    //.andWhere("direccion.tipoDireccion:tipo",{tipo:TIPODIRECCION.PRINCIPAL})
    .getMany()
   
    return cliente;
}catch(e){
  throw new ConflictException('Error consultar recolecciones no cerradas  por empleado'+ e)
}
  }
}
