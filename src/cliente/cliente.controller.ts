import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { DireccionService } from 'src/direccion/direccion.service';
import { CierreService } from 'src/cierre/cierre.service';

@Controller('cliente')
export class ClienteController {
  constructor(

    private readonly clienteService: ClienteService,
    
  ) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    console.log(`Cliente en controller ${createClienteDto}`)
    return this.clienteService.createCliente(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }
  @Get('/clienterecolecciones/:id/:fecha')
  findClienteRecolecciones(@Param('id') id: number,@Param('fecha') fechaInicio: string) {
    console.log(`fecha inicio ${fechaInicio}`)
    return this.clienteService.findClienteRecolecciones(id,fechaInicio);
  }
  @Get('/getallactive')
  findSend() {
    return this.clienteService.findSend();
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
  
    return this.clienteService.findCliente(id);
  }

  @Put()
  update(@Body() updateClienteDto: UpdateClienteDto) {
    console.log('controller id',updateClienteDto.id)
    return this.clienteService.updateCliente(updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clienteService.removeCliente(id);
  }
  @Get('/recolecciones/cierre/:idCierre/:idCliente')
  test(@Param('idCierre') idCierre: number,@Param('idCierre') idCliente: number) {
    return this.clienteService.ClientesRecoleccionesCerradas(idCierre,idCliente)
  }
  @Get('/clientebyusername/:username')
  clientebyUsername(@Param('username') username: string) {
    return this.clienteService.ClienteByUsername(username)
  }

}
