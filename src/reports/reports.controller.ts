import { Controller, Get, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import {Response} from 'express'
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('cierre')
  async getcierreReport(@Res() response:Response){
    const pdfDoc=await this.reportsService.getCierreReport();
    response.setHeader('Content-type','application/pdf')
    pdfDoc.info.Title='Cierre Diario';
    pdfDoc.pipe(response);

    pdfDoc.end();
  }
}
