import { PartialType } from '@nestjs/mapped-types';
import { CreateRecoleccionEntregaDto } from './create-recoleccion-entrega.dto';

export class UpdateRecoleccionEntregaDto extends PartialType(CreateRecoleccionEntregaDto) {}
