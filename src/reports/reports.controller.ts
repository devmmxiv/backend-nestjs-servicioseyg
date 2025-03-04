import { Controller, Get, HttpException, HttpStatus, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import {Response} from 'express'
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('cierre/:idCierre/:idCliente')
  async getcierreReport(@Param('idCierre') idCierre: number,@Param('idCliente') idCliente: number,@Res() response:Response){
   
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

  @Get('cierreporempleado/:idCierre/:idEmpleado')
  async getcierreEmpleadoReport(@Param('idCierre') idCierre: number,@Param('idEmpleado') idEmpleado: number,@Res() response:Response){
   
    try{
    const pdfDoc=await this.reportsService.getCierreEmpleadoReport(idCierre,idEmpleado);
  
    response.setHeader('Content-type','application/pdf')
    pdfDoc.info.Title='Cierre Por Mensajero';
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
