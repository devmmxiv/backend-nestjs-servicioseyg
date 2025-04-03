import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRecoleccionEntregaDto, InsertRecoleccionDTO } from './dto/create-recoleccion-entrega.dto';
import { UpdateRecoleccionEntregaDto } from './dto/update-recoleccion-entrega.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecoleccionEntrega } from './entities/recoleccion-entrega.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { ESTATUSRECOLECCION } from 'src/constants/status_recoleccion';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { UpdateEstadoRecoleccionEntregaDto } from './dto/update-estado-recoleccion';
import { Alias } from 'typeorm/query-builder/Alias';

@Injectable()
export class RecoleccionEntregaService {
constructor(
  @InjectRepository(RecoleccionEntrega)
  private readonly repository:Repository<RecoleccionEntrega>
) {
  
  
}

  async create(createRecoleccionEntregaDto: CreateRecoleccionEntregaDto) {
    try{
    
      return await this.repository.save(createRecoleccionEntregaDto)
    }catch({ name, message } ){
      console.log(name ,message)
      throw new ConflictException('Error creando recoleccion ',message)
    }
   
  }
  async insertRecoleccion(insertRecoleccionDto: InsertRecoleccionDTO) {
    try{
  
      return await this.repository.save(insertRecoleccionDto)
    }catch({ name, message } ){
    
      throw new ConflictException('Error creando recoleccion ',message)
    }
   
  }

 async findAll() {
    return await this.repository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} recoleccionEntrega10`;
  }

  async updateEstado(id: number, recoleccion: UpdateEstadoRecoleccionEntregaDto) {

   try{
      const rows:UpdateResult=await this.repository.update(id,{estado:recoleccion.estado});
      return rows.affected==1;
    }catch({ name, message } ){
      throw new ConflictException('Error actualizando recoleccion ',message)
    }
  }
  async updateRecoleccion(id: number, recoleccion: UpdateRecoleccionEntregaDto) {

    try{
       const rows:UpdateResult=await this.repository.update(id,recoleccion);
       return rows.affected==1;
     }catch({ name, message } ){
    
       throw new ConflictException('Error actualizando recoleccion ',message)
     }
   }
  async asignarCierre(id:number) {

    try{
   
  
     return await  this.repository
      .createQueryBuilder()
      .update()
      .set({ cierre: {id:id}, cerrada:true })
      .where("estado in(:estados)",{estados:['ENTREGADA','NO RECIBIDA']})
      .execute()
       
     }catch({ name, message } ){
    
       throw new ConflictException('Error asignado idCierre ',message)
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
     .leftJoinAndSelect("recoleccionEntrega.empleadoRecolecta","empleado")
     .leftJoinAndSelect("recoleccionEntrega.empleadoEntrega","empleado1")
     .leftJoinAndSelect("recoleccionEntrega.empleadoAsignado","empleadoA")
    // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
     .where('recoleccionEntrega.idClienteEnvia=cliente.id')
     .where('recoleccionEntrega.idMunicipioRecibe=municipio.id')
     .where('recoleccionEntrega.estado != :estado',{estado})
     .andWhere('recoleccionEntrega.cerrada=false')
     .orderBy('recoleccionEntrega.fechaCreacion','DESC')
     .getMany()
 
   }
   async findRecoleccionesPagination(take:number,page:number){
    const estado='ENTREGADA'
    const e= await this.repository.createQueryBuilder("recoleccionEntrega")
     .leftJoinAndSelect("recoleccionEntrega.clienteEnvia", "cliente")
     .leftJoinAndSelect("recoleccionEntrega.municipioRecibe","municipio")
     .leftJoinAndSelect("recoleccionEntrega.empleadoRecolecta","empleado")
     .leftJoinAndSelect("recoleccionEntrega.empleadoEntrega","empleado1")
     .leftJoinAndSelect("recoleccionEntrega.empleadoAsignado","empleadoA")
    // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
     .where('recoleccionEntrega.idClienteEnvia=cliente.id')
     .where('recoleccionEntrega.idMunicipioRecibe=municipio.id')
     .where('recoleccionEntrega.estado != :estado',{estado})
     .andWhere('recoleccionEntrega.cerrada=false')
     .orderBy('recoleccionEntrega.fechaCreacion','DESC')
     .take(take)
     .skip(page-1)
     const entregas=await e.getMany();
     const total_registros=await e.getCount();
     return this.paginateResponse(entregas,total_registros,take,page)
   }

   paginateResponse(data,total_registros,take,page) {
    
    const a=page+1;
    const result=data;
    const total=total_registros;
    const lastPage=Math.ceil(total/take);
    const nextPage=page+1 >lastPage ? null :page+1;

    const prevPage=page-1 < 1 ? 0 :page-1;
    return {
      statusCode: 'success',
      data: [...result],
      count: total,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    }
  }
   async findRecoleccionesPorEmpleado(id:number) {
    //console.log("recoleccionporempleado",id)
    const estado='ENTREGADA'
    return await this.repository.createQueryBuilder("recoleccionEntrega")
     .leftJoinAndSelect("recoleccionEntrega.clienteEnvia", "cliente")
     .leftJoinAndSelect("cliente.direcciones","direcciones")
     .leftJoinAndSelect("direcciones.municipio","municipio")
    // .leftJoinAndSelect("recoleccionEntrega.municipioEnvia","municipio")
     .leftJoinAndSelect("recoleccionEntrega.municipioRecibe","municipioe")
     .leftJoinAndSelect("recoleccionEntrega.empleadoRecolecta","empleado")
    // .leftJoinAndSelect("recoleccionEntrega.empleadoEntrega","empleado1")
     .leftJoinAndSelect("recoleccionEntrega.empleadoAsignado","empleadoA")
    // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
     .where('recoleccionEntrega.idClienteEnvia=cliente.id')
    // .where('recoleccionEntrega.idDireccionEnvia=direccion.id')
    // .where('recoleccionEntrega.idMunicipioEnvia=municipioe.id')
    // .where('recoleccionEntrega.idMunicipioRecibe=municipio.id')
    // .where('recoleccionEntrega.estado != :estado',{estado})
     .andWhere('recoleccionEntrega.cerrada=false')
     .andWhere('recoleccionEntrega.idEmpleadoAsignado=:id',{id})

     .getMany()
 
   }
 
   async findRecoleccionesPorClienteEnvia(id:number) {
    const estado='ENTREGADA'

    return await this.repository.createQueryBuilder("recoleccionEntrega")
     .leftJoinAndSelect("recoleccionEntrega.clienteEnvia", "cliente")
     .leftJoinAndSelect("cliente.direcciones","direcciones")
     .leftJoinAndSelect("direcciones.municipio","municipioCliente")
     .leftJoinAndSelect("recoleccionEntrega.municipioRecibe","municipio")
     .leftJoinAndSelect("recoleccionEntrega.empleadoRecolecta","empleado")
     .leftJoinAndSelect("recoleccionEntrega.empleadoAsignado","empleado1")
    // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
     .where('recoleccionEntrega.idClienteEnvia=cliente.id')
    // .where('recoleccionEntrega.idMunicipioRecibe=municipio.id')
    // .where('recoleccionEntrega.estado != :estado',{estado})
     .andWhere('recoleccionEntrega.cerrada=false')
     .andWhere('recoleccionEntrega.idClienteEnvia=:id',{id})

     .getMany()
 
   }
   async findRecoleccionesByCliente(id:number) {
    const estado='ENTREGADA'

    return await this.repository.createQueryBuilder("recoleccionEntrega")

     .leftJoinAndSelect("recoleccionEntrega.clienteEnvia", "cliente")
     .leftJoinAndSelect("recoleccionEntrega.municipioRecibe","municipio")
     .leftJoinAndSelect("recoleccionEntrega.empleadoRecolecta","empleado")
     .leftJoinAndSelect("recoleccionEntrega.empleadoAsignado","empleadoAsignado")

    // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
     .where('recoleccionEntrega.idClienteEnvia=cliente.id')
     .andWhere('recoleccionEntrega.idMunicipioRecibe=municipio.id')
     .andWhere('recoleccionEntrega.estado != :estado',{estado})
     .andWhere('recoleccionEntrega.cerrada=false')
     .andWhere('recoleccionEntrega.idClienteEnvia=:id',{id})
    .select(['recoleccionEntrega.id','recoleccionEntrega.precioEnvio','recoleccionEntrega.totalCobrar',
      'cliente.id',
      'recoleccionEntrega.estado','recoleccionEntrega.fechaCreacion',
      'recoleccionEntrega.direccionEntrega','recoleccionEntrega.zonaEntrega','recoleccionEntrega.tipoPago',
      'recoleccionEntrega.nombreRecibe','recoleccionEntrega.apellidoRecibe','recoleccionEntrega.telefonoRecibe'
      ,'municipio.id','municipio.nombre','empleadoAsignado.nombre','empleadoAsignado.id','empleadoAsignado.apellido'
 
    ])
     .getMany()
 
   }
   async findRecoleccionesPorEmpleadoAdmin() {
     const estado='ENTREGADA'
    try{
      return await this.repository.createQueryBuilder("recoleccionEntrega")
      .leftJoinAndSelect("recoleccionEntrega.clienteEnvia", "cliente")
      .leftJoinAndSelect("cliente.direcciones","direcciones")
     .leftJoinAndSelect("direcciones.municipio","municipio")
     // .leftJoinAndSelect("recoleccionEntrega.direccionEnvia","direccion")
      //.leftJoinAndSelect("recoleccionEntrega.municipioEnvia","municipio")
      .leftJoinAndSelect("recoleccionEntrega.municipioRecibe","municipioe")
      .leftJoinAndSelect("recoleccionEntrega.empleadoRecolecta","empleado")
    //  .leftJoinAndSelect("recoleccionEntrega.empleadoEntrega","empleado1")
      .leftJoinAndSelect("recoleccionEntrega.empleadoAsignado","empleadoA")
     // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
      .where('recoleccionEntrega.idClienteEnvia=cliente.id')
     // .where('recoleccionEntrega.idDireccionEnvia=direccion.id')
      //.where('recoleccionEntrega.idMunicipioEnvia=municipioe.id')
      .where('recoleccionEntrega.idMunicipioRecibe=municipio.id')
      .where('recoleccionEntrega.estado != :estado',{estado})
      .where('recoleccionEntrega.cerrada=false')
      //.where('recoleccionEntrega.idEmpleadoAsignado=:id',{id})
 
      .getMany()
  
    }catch({ name, message } ){
      throw new ConflictException('Error consultando recoleccion por administrador ',message)
    }
   }
   async findDatosCierre() {
    try{
      //createQueryBuilder("user").groupBy("user.name").addGroupBy("user.id")
      return await this.repository.createQueryBuilder("recoleccionEntrega")
      .select(["recoleccionEntrega.estado estado"])
      .addSelect("COUNT(recoleccionEntrega.estado)", "cantidad")

     .where('recoleccionEntrega.estado in(:estados)',{estados:['ENTREGADA','NO RECIBIDA']})
     .andWhere('recoleccionEntrega.cerrada=false')
      .groupBy("recoleccionEntrega.estado")
      //.addGroupBy('DATE(recoleccionEntrega.fechaCreacion)')
      .getRawMany()
                                          
    }catch({ name, message } ){
      throw new ConflictException('Error consultando recoleccion ',message)
    }
   }
   async ListadoRecolecionesCierre() {
    try{


      return await this.repository.createQueryBuilder("recoleccionEntrega")
       .leftJoinAndSelect("recoleccionEntrega.clienteEnvia", "cliente")
       .leftJoinAndSelect("recoleccionEntrega.municipioRecibe","municipio")
       .leftJoinAndSelect("recoleccionEntrega.empleadoAsignado","empleado")
      // .select(['cliente.id','cliente.codigoCliente','cliente.apellido','cliente.nombre','direccion.direccionCompleta','direccion'])
       .where('recoleccionEntrega.idClienteEnvia=cliente.id')
       .where('recoleccionEntrega.idMunicipioRecibe=municipio.id')
       .where('recoleccionEntrega.idEmpleadoAsignado=m.id')
       .where('recoleccionEntrega.estado in(:estados)',{estados:['ENTREGADA','NO RECIBIDA']})
       .andWhere('recoleccionEntrega.cerrada=false')
       .getMany()
   
                                          
    }catch({ name, message } ){
      throw new ConflictException('Error consultando recolecciones ',message)
    }
   }

    async findRecoleccionesEstado() {
      try{
        //createQueryBuilder("user").groupBy("user.name").addGroupBy("user.id")
        return await this.repository.createQueryBuilder("recoleccionEntrega")
        .select(["recoleccionEntrega.estado estado"])
        .addSelect("COUNT(recoleccionEntrega.estado)", "cantidad")
  
        .where('recoleccionEntrega.cerrada=false')
        //.addSelect("SUM(user.photosCount)", "sum")
        .groupBy("recoleccionEntrega.estado")
         .getRawMany()

                                           
      }catch({ name, message } ){
        throw new ConflictException('Error consultando recoleccion ',message)
      }
   // 
   /* */
 
 
   }
   //para reportes
   async findClientesRecolecciones(idCierre:number){
    
    const clientes:Cliente[]=await this.repository.createQueryBuilder("recoleccionEntrega")
    .leftJoin("recoleccionEntrega.clienteEnvia", "cliente")
    .select("cliente.id,cliente.codigoCliente,cliente.nombre,cliente.apellido,cliente.nombrePagina,cliente.telefono")
    .where('recoleccionEntrega.idCierre=:idCierre',{idCierre:idCierre})
    .groupBy("cliente.id,cliente.codigoCliente,cliente.nombre,cliente.apellido,cliente.nombrePagina,cliente.telefono")
    .getRawMany();
    
    let recolecciones:RecoleccionEntrega[]
    clientes.forEach(async c => {
      const a:RecoleccionEntrega[] =await   this.repository.createQueryBuilder("recoleccionEntrega")
      .where('recoleccionEntrega.idCierre=:idCierre',{idCierre:idCierre})

      .andWhere('recoleccionEntrega.idClienteEnvia=:idCliente',{idCliente:c.id})
      .getMany();
      c.envios=a
    });


   return clientes

    
   }

}
 