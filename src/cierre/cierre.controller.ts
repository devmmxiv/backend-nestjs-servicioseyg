import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CierreService } from './cierre.service';
import { CreateCierreDto } from './dto/create-cierre.dto';
import { UpdateCierreDto } from './dto/update-cierre.dto';

@Controller('cierre')
export class CierreController {
  constructor(private readonly cierreService: CierreService) {}

  @Post()
  create(@Body() createCierreDto: CreateCierreDto) {
    return this.cierreService.create(createCierreDto);
  }

  @Get()
  findAll() {
    return this.cierreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cierreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCierreDto: UpdateCierreDto) {
    return this.cierreService.update(+id, updateCierreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cierreService.remove(+id);
  }
  @Get('/cierre/test')
  test(){
    return this.cierreService.cierreCompleto(5)
  }
}
