import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  imports:[PrinterModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
