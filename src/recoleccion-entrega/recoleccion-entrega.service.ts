import { Injectable } from '@nestjs/common';
import { CreateRecoleccionEntregaDto } from './dto/create-recoleccion-entrega.dto';
import { UpdateRecoleccionEntregaDto } from './dto/update-recoleccion-entrega.dto';

@Injectable()
export class RecoleccionEntregaService {
  create(createRecoleccionEntregaDto: CreateRecoleccionEntregaDto) {
    return 'This action adds a new recoleccionEntrega';
  }

  findAll() {
    return `This action returns all recoleccionEntrega`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recoleccionEntrega`;
  }

  update(id: number, updateRecoleccionEntregaDto: UpdateRecoleccionEntregaDto) {
    return `This action updates a #${id} recoleccionEntrega`;
  }

  remove(id: number) {
    return `This action removes a #${id} recoleccionEntrega`;
  }
}
