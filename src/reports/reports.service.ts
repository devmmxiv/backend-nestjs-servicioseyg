import { Injectable } from '@nestjs/common';
import { promises } from 'dns';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { CierreReport } from './documents/cierre.report';

@Injectable()
export class ReportsService {

    /**
     *
     */
    constructor(private readonly printer:PrinterService) {
      
        
    }
    async getCierreReport():Promise<PDFKit.PDFDocument>{

        const docDefinition:TDocumentDefinitions=CierreReport();
        return   this.printer.createPdf(docDefinition);
    }
}
