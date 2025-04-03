import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { RecoleccionEntregaService } from './recoleccion-entrega.service';
import { CreateRecoleccionEntregaDto, InsertRecoleccionDTO } from './dto/create-recoleccion-entrega.dto';
import { UpdateRecoleccionEntregaDto } from './dto/update-recoleccion-entrega.dto';
import { UpdateEstadoRecoleccionEntregaDto } from './dto/update-estado-recoleccion';

@Controller('recoleccion-entrega')
export class RecoleccionEntregaController {
  
  constructor(private readonly recoleccionEntregaService: RecoleccionEntregaService) {}

  @Post()
  create(@Body() createRecoleccionEntregaDto: CreateRecoleccionEntregaDto) {
   
    return this.recoleccionEntregaService.create(createRecoleccionEntregaDto);
  }
  @Post('insertrecoleccion')
  insertRecoleccion(@Body() insertRecoleccionDTO: InsertRecoleccionDTO) {
   
    return this.recoleccionEntregaService.insertRecoleccion(insertRecoleccionDTO);
  }
  @Get()
  findAll() {
    return this.recoleccionEntregaService.findRecolecciones();
  }
  @Get('/recoleccionclienteenvia/:id')
  findRecoleccionesClienteEnvia(@Param('id') id: number) {
 
    return this.recoleccionEntregaService.findRecoleccionesPorClienteEnvia(id);
  }

  @Get('/recoleccionespagination/:take/:skip')
  findRecoleccionesPagination(@Param('take'  ,ParseIntPipe) take: number,@Param('skip' , ParseIntPipe) skip: number ){
 
    return this.recoleccionEntregaService.findRecoleccionesPagination(take,skip);
  }
  @Get('/recoleccionesbycliente/:id')
  findRecoleccionesByCliente(@Param('id') id: number) {
 
    return this.recoleccionEntregaService.findRecoleccionesByCliente(id);
  }
  @Get('/recoleccionempleadoadmin')
  findRecoleccionesEmpleadoAdmin() {
 
    return this.recoleccionEntregaService.findRecoleccionesPorEmpleadoAdmin();
  }
  @Get('/recoleccionempleado/:id')
  findRecoleccionesEmpleado(@Param('id') id: number) {
 
    return this.recoleccionEntregaService.findRecoleccionesPorEmpleado(id);
  }


  @Get('/recoleccion/:id')
  findOne(@Param('id') id: string) {
    return this.recoleccionEntregaService.findOne(+id);
  }
  @Get('/datoscierre')
  findDatosCierre() {

    return this.recoleccionEntregaService.findDatosCierre();

  }
  @Get('/recoleccionesestado')
  findRecoleccionesEstado() {

    return this.recoleccionEntregaService.findRecoleccionesEstado();

  }
  
  @Get('/listadorecoleccionescierre')
  listadoRecolecciones() {

    return this.recoleccionEntregaService.ListadoRecolecionesCierre();

  }


  @Put('/update/:id')
  updateRecoleccion(@Param('id') id: number, @Body() updateRecoleccionEntregaDto: UpdateRecoleccionEntregaDto) {

    return this.recoleccionEntregaService.updateRecoleccion(id, updateRecoleccionEntregaDto);
  }


  @Patch('/update/estado/:id')
  update(@Param('id') id: number, @Body() updateEstadoRecoleccionEntregaDto:UpdateEstadoRecoleccionEntregaDto 
  ) {
   
    return this.recoleccionEntregaService.updateEstado(id, updateEstadoRecoleccionEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recoleccionEntregaService.remove(+id);
  }
  @Get('/clientesbycierre/:id')
  getClientesByIdCierre(@Param('id') id: number){

    return this.recoleccionEntregaService.findClientesRecolecciones(id)
  }
}
