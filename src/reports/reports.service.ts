import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { promises } from 'dns';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { CierreReport } from './documents/cierre.report';
import { ClienteService } from 'src/cliente/cliente.service';
import { CierreService } from 'src/cierre/cierre.service';
import { Cierre, CierreDetalle } from 'src/cierre/entities/cierre.entity';
import { buffer } from 'stream/consumers';

@Injectable()
export class ReportsService {

    /**
     *
     */
    constructor(private readonly printer:PrinterService,
        private readonly cierreService:CierreService

    ) {
      
        
    }
    async getCierreReport(idCierre:number):Promise<PDFKit.PDFDocument>{
        const cierre:CierreDetalle= await this.cierreService.cierreCompleto(idCierre);
        if(cierre.id>0){
        const docDefinition:TDocumentDefinitions=CierreReport(cierre);
   
        
       return this.printer.createPdf(docDefinition);
        }else{
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
     
    }
}
