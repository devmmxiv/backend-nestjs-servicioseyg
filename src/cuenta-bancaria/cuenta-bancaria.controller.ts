import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuentaBancariaService } from './cuenta-bancaria.service';
import { CreateCuentaBancariaDto } from './dto/create-cuenta-bancaria.dto';
import { UpdateCuentaBancariaDto } from './dto/update-cuenta-bancaria.dto';

@Controller('cuenta-bancaria')
export class CuentaBancariaController {
  constructor(private readonly cuentaBancariaService: CuentaBancariaService) {}

  @Post()
  create(@Body() createCuentaBancariaDto: CreateCuentaBancariaDto) {
    return this.cuentaBancariaService.create(createCuentaBancariaDto);
  }

  @Get()
  findAll() {
    return this.cuentaBancariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentaBancariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentaBancariaDto: UpdateCuentaBancariaDto) {
    return this.cuentaBancariaService.update(+id, updateCuentaBancariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentaBancariaService.remove(+id);
  }
}
