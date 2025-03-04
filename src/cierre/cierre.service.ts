import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCierreDto } from './dto/create-cierre.dto';
import { UpdateCierreDto } from './dto/update-cierre.dto';
import { Cierre,  CierreDetalle, CierreEmpleadoDetalle } from './entities/cierre.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecoleccionEntrega } from 'src/recoleccion-entrega/entities/recoleccion-entrega.entity';
import { RecoleccionEntregaService } from 'src/recoleccion-entrega/recoleccion-entrega.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { EmpleadoService } from 'src/empleado/empleado.service';

@Injectable()
export class CierreService {
  /**
   *
   */
  constructor(
    @InjectRepository(Cierre)
    private readonly repository:Repository<Cierre>,
    private readonly serviceCliente:ClienteService,
    private readonly serviceEmpleado:EmpleadoService
  ) {
  }

  async create(createCierreDto: CreateCierreDto) {
    try{
     const c = await  this.repository.save(createCierreDto)
      if(c.id>0){ //esto ya no porque lo hace el insert porque esta en cascade update true en la entidad
      //  this.recoleccionService.asignarCierre(c.id)
      }
      return c;
    }catch({ name, message } ){
      throw new ConflictException('Error creando cierre ',message)
    }
  
  }
  async cierreCompleto(idCierre:number,idCliente:number){
    let cierre=new CierreDetalle()
   
    try {
  
      const c =await this.repository.findOne({where:{id:idCierre}})

      if(c === null){
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      
      const clientes=await this.serviceCliente.ClientesRecoleccionesCerradas(idCierre,idCliente)
      cierre.id=c.id
      cierre.fechaCierre=c.fechaCierre
      cierre.clientesRecoleciones=clientes;

      return cierre
    } catch (error) {

      throw error
      
    }
  }
  async cierreporEmpleado(idCierre:number,idEmpleado:number){
    let cierre=new CierreEmpleadoDetalle()
   
    try {
  
      const c =await this.repository.findOne({where:{id:idCierre}})

      if(c === null){
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      
      const empleadoscierre=await this.serviceEmpleado.cierreporempleado(idCierre,idEmpleado)
      cierre.id=c.id
      cierre.fechaCierre=c.fechaCierre
      cierre.empleadoRecolecciones=empleadoscierre;

      return cierre
    } catch (error) {

      throw error
      
    }
  }
  async findAll() {
    return this.repository.createQueryBuilder('cierre')
    .select(['id','fechaCierre'])
    .addSelect(qb=>{ 
      return qb.select('COUNT(*) ')
      .from(RecoleccionEntrega,
         'r')
         .where('r.idCierre=cierre.id')},'cantidad')
    .orderBy({ 'cierre.fechaCierre': 'DESC' })

    .getRawMany();

 
  }

  findOne(id: number, idCliente:number) {
    return `This action returns a #${id} cierre`;
  }

  update(id: number, updateCierreDto: UpdateCierreDto) {
    return `This action updates a #${id} cierre`;
  }

  remove(id: number) {
    return `This action removes a #${id} cierre`;
  }
}
