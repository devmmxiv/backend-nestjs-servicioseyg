import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { ClienteService } from 'src/cliente/cliente.service';
import { ClienteModule } from 'src/cliente/cliente.module';
import { CierreModule } from 'src/cierre/cierre.module';

@Module({
  imports:[PrinterModule,CierreModule,ClienteModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
