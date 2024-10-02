import { Controller, Get, HttpException, HttpStatus, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import {Response} from 'express'
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('cierre/:idCierre')
  async getcierreReport(@Param('idCierre') idCierre: number,@Res() response:Response){

    try{
    const pdfDoc=await this.reportsService.getCierreReport(idCierre);
  
    response.setHeader('Content-type','application/pdf')
    pdfDoc.info.Title='Cierre Diario';
    pdfDoc.pipe(response);

    pdfDoc.end();

    return pdfDoc
    }catch(error){
      throw error
    }
  }
}
