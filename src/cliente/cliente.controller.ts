import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { DireccionService } from 'src/direccion/direccion.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService,
    private readonly direccionService:DireccionService
  ) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
       
    return this.clienteService.createCliente(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
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
  @Get('/recolecciones/cierre/:idCierre')
  test(@Param('idCierre') idCierre: number) {
    return this.clienteService.ClientesRecoleccionesCerradas(idCierre)
  }
}
