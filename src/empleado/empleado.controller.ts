import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }

  @Get()
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadoService.update(+id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(+id);
  }

  @Get('/empleadobyusername/:username')
  empleadobyUsername(@Param('username') username: string) {
    return this.empleadoService.empleadoByUsername(username)
  }
  @Get('/empleadobyusernameforperfil/:username')
  empleadobyUsernameforPerfil(@Param('username') username: string) {
    return this.empleadoService.empleadoByUsernameforperfil(username)
  }
  @Get('/empleadostecnicos/tecnico')
  empleadosTecnicos() {

    return this.empleadoService.empleadosTecnicos();
  }
  /*@Get('/empleadocierre/:idCierre/:idEmpleado')//este controlador se usar solo para pruebas ya que se consulta la informacion por postman
  empleadoCierre(@Param('idCierre') idCierre: number ,@Param('idEmpleado') idEmpleado: number) {
    console.log("entreg aqui")
    return this.empleadoService.cierreporempleado(idCierre,idEmpleado);
  }*/
}
