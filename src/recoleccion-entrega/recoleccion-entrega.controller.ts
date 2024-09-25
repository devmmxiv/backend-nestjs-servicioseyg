import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recoleccionEntregaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecoleccionEntregaDto: UpdateRecoleccionEntregaDto) {

    return this.recoleccionEntregaService.update(id, updateRecoleccionEntregaDto);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recoleccionEntregaService.remove(+id);
  }
}
