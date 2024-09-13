import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaBancariaDto } from './create-cuenta-bancaria.dto';

export class UpdateCuentaBancariaDto extends PartialType(CreateCuentaBancariaDto) {}
