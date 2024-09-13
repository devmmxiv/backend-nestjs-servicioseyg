import { Module } from '@nestjs/common';
import { CuentaBancariaService } from './cuenta-bancaria.service';
import { CuentaBancariaController } from './cuenta-bancaria.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaBancaria } from './entities/cuenta-bancaria.entity';
import { Banco } from '../banco/entities/banco.entity';
import { BancoService } from '../banco/banco.service';

@Module({
  imports:[TypeOrmModule.forFeature([CuentaBancaria])]
,  controllers: [CuentaBancariaController],
  providers: [CuentaBancariaService]
})
export class CuentaBancariaModule {}
