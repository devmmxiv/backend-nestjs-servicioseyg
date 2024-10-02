import { PartialType } from '@nestjs/mapped-types';
import { CreateCierreDto } from './create-cierre.dto';

export class UpdateCierreDto extends PartialType(CreateCierreDto) {}
