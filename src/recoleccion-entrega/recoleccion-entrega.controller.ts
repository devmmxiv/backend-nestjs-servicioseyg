import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RecoleccionEntregaService } from './recoleccion-entrega.service';
import { CreateRecoleccionEntregaDto } from './dto/create-recoleccion-entrega.dto';
import { UpdateRecoleccionEntregaDto } from './dto/update-recoleccion-entrega.dto';

@Controller('recoleccion-entrega')
export class RecoleccionEntregaController {
  constructor(private readonly recoleccionEntregaService: RecoleccionEntregaService) {}

  @Post()
  create(@Body() createRecoleccionEntregaDto: CreateRecoleccionEntregaDto) {

    return this.recoleccionEntregaService.create(createRecoleccionEntregaDto);
  }

  @Get()
  findAll() {
    return this.recoleccionEntregaService.findRecolecciones();
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
    console.log('update',updateRecoleccionEntregaDto)
    return this.recoleccionEntregaService.updateRecoleccion(id, updateRecoleccionEntregaDto);
  }


  @Patch('/update/estado/:id')
  update(@Param('id') id: number, @Body() updateRecoleccionEntregaDto: UpdateRecoleccionEntregaDto) {

    return this.recoleccionEntregaService.updateEstado(id, updateRecoleccionEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recoleccionEntregaService.remove(+id);
  }
  @Get('test')
  test(){
    return this.recoleccionEntregaService.findClientesRecolecciones(5)
  }
}
