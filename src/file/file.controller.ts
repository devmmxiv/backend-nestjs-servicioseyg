import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
    /**
     *
     */
    constructor(private fileService:FileService) {
            
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file:Express.Multer.File){
        return this.fileService.uploadFile(file);
    }
    @Post('uploads')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFiles(@UploadedFiles() files:Array<Express.Multer.File>){
        return this.fileService.uploadFiles(files);
    }
}
