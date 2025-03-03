import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
import { TIPODIRECCION } from 'src/constants/direccion-enum';
import { TIPOEMPLEADO } from 'src/constants/tipo_empleado';

@Injectable()
export class EmpleadoService {


  constructor(
    @InjectRepository(Empleado)
    private readonly repositoryEmpleado:Repository<Empleado>
    
  ) {
    
    
  }
  create(createEmpleadoDto: CreateEmpleadoDto) {
    return 'This action adds a new empleado';
  }

 async  findAll() {
    return await this.repositoryEmpleado.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} empleado`;
  }

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  }
  
  async empleadoByUsername(usuario:string){

    const empleado = await this.repositoryEmpleado  
    .createQueryBuilder("empleado")
    .where("empleado.username = :usuario", { usuario: usuario})
    .getOne();

    
    if(!empleado){
      throw new ConflictException('El empleado  '+usuario+ ' no existe')
    }
    return empleado;
  }
   async empleadoByUsernameforperfil(usuario:string){
  
      const empleado = await this.repositoryEmpleado  
      .createQueryBuilder("empleado")
      .leftJoinAndSelect("empleado.direcciones","direccion")
      .leftJoinAndSelect("direccion.municipio","municipio")
      .where("empleado.username = :usuario", { usuario: usuario})
  
   
      .getOne()

      return empleado;
    }

    async empleadosTecnicos(){

      const empleados = await this.repositoryEmpleado 
      .createQueryBuilder("empleado")
      .select(["empleado.id","empleado.nombre","empleado.apellido"])
      .where("empleado.tipoEmpleado = :usuario", { usuario: TIPOEMPLEADO.TECNICO})
      .getMany()
      return empleados
    }
}
  