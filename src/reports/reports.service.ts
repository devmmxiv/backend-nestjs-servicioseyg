import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { promises } from 'dns';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { CierreReport } from './documents/cierre.report';
import { ClienteService } from 'src/cliente/cliente.service';
import { CierreService } from 'src/cierre/cierre.service';
import { Cierre, CierreDetalle } from 'src/cierre/entities/cierre.entity';
import { buffer } from 'stream/consumers';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { CierreClienteReport } from './documents/cierreCliente.report';

@Injectable()
export class ReportsService {

    /**
     *
     */
    constructor(private readonly printer:PrinterService,
        private readonly cierreService:CierreService,
        private readonly clienteService:ClienteService
    ) {
      
        
    }
    async getCierreReport(idCierre:number,idCliente:number):Promise<PDFKit.PDFDocument>{
    
        const cierre:CierreDetalle= await this.cierreService.cierreCompleto(idCierre,idCliente);
        if(cierre.id>0){
            const docDefinition:TDocumentDefinitions=CierreReport(cierre);
   
        
            return this.printer.createPdf(docDefinition);
        }else{
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
     
    }
    async getCierreClienteReport(idCliente:number,fechaInicio:string):Promise<PDFKit.PDFDocument>{
    
        const cliente :Cliente[] = await this.clienteService.findClienteRecolecciones(idCliente,fechaInicio)
        if(cliente[0].id>0){
            const docDefinition:TDocumentDefinitions=CierreClienteReport(cliente[0]);
   
        
            return this.printer.createPdf(docDefinition);
        }else{
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
     
    }
}
