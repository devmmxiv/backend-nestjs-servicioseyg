import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRecoleccionEntregaDto } from './dto/create-recoleccion-entrega.dto';
import { UpdateRecoleccionEntregaDto } from './dto/update-recoleccion-entrega.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecoleccionEntrega } from './entities/recoleccion-entrega.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ESTATUSRECOLECCION } from 'src/constants/status_recoleccion';

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

  async update(id: number, recoleccion: UpdateRecoleccionEntregaDto) {

    console.log('update recoleccion servicio',recoleccion.estado)

    try{
      const rows:UpdateResult=await this.repository.update(id,{estado:recoleccion.estado});
      return rows.affected==1;
    }catch({ name, message } ){
      throw new ConflictException('Error actualizando recoleccion ',message)
    }
  }



  async remove(id: number) {
    return await this.repository.delete(id) 
  }
  async findRecolecciones() {
    const estado='ENTREGADA'
    return await this.repository.createQueryBuilder("recoleccionEntrega")
     .leftJoinAndSelect("recoleccionEntrega.clienteEnvia", "cliente")
     .leftJoinAndSelect("recoleccionEntrega.municipioRecibe","municipio")
    // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
     .where('recoleccionEntrega.idClienteEnvia=cliente.id')
     .where('recoleccionEntrega.idMunicipioRecibe=municipio.id')
     .where('recoleccionEntrega.estado != :estado',{estado})
     .getMany()
 
 
   }
}
