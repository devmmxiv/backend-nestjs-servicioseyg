import { Injectable } from '@nestjs/common';
import { response } from 'express';

@Injectable()
export class FileService {
    /**
     *
     */
    constructor() {
      
    }
    uploadFile(file:Express.Multer.File){
        if(file){
            const response={
                originalName:file.originalname,
                fileName:file.filename
            }
            return response;
        }
        return null;
    }
    uploadFiles(files:Express.Multer.File[]){
        const responses=[];
        for(const file of files){
            const fileUpload=this.uploadFile(file);
            if(fileUpload){
             
                responses.push(fileUpload);
            }else{
                console.log('Eroror');
            }
            
   
        }
        console.log(responses);
        return responses;
    }
}
