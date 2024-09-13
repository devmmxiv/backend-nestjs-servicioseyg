import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Direccion])],
  controllers: [DireccionController],
  providers: [DireccionService],
})
export class DireccionModule {}
