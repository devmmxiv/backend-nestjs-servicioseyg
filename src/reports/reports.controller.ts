import { Controller, Get, HttpException, HttpStatus, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import {Response} from 'express'
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('cierre/:idCierre/:idCliente')
  async getcierreReport(@Param('idCierre') idCierre: number,@Param('idCliente') idCliente: number,@Res() response:Response){
    console.log(`id cierre ${idCierre} id cliente ${idCliente}`)
    try{
    const pdfDoc=await this.reportsService.getCierreReport(idCierre,idCliente);
  
    response.setHeader('Content-type','application/pdf')
    pdfDoc.info.Title='Cierre Diario';
    pdfDoc.pipe(response);

    pdfDoc.end();

    return pdfDoc
    }catch(error){
      throw error
    }
  }



@Get('cierrecliente/:idCliente/:fecha/')
async getEntregasClienteReport(@Param('idCliente') idCliente: number,@Param('fecha') fechaInicio: string,

@Res() response:Response){

  try{
  const pdfDoc=await this.reportsService.getCierreClienteReport(idCliente,fechaInicio);

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
