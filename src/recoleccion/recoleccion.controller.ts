import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecoleccionService } from './recoleccion.service';
import { CreateRecoleccionDto } from './dto/create-recoleccion.dto';

@Controller('recoleccion')
export class RecoleccionController {

    constructor(private readonly recoleccionService:RecoleccionService){}
      @Post()
      create(@Body() createRecoleccionDto: CreateRecoleccionDto) {
       
        return this.recoleccionService.create(createRecoleccionDto);
      }
    
  @Get()
  findAll() {
    return this.recoleccionService.findAll();
  }

}
