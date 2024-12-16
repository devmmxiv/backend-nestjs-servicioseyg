import { ConflictException, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
    imports:[MulterModule.register({
      //dest:'./files/upload',
      limits:{
        fileSize:2 *1024 *1024
      },
      fileFilter:function(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
          return cb(new ConflictException("Solo Imagenes"),false);
        }
        cb(null,true)
      },
      storage:diskStorage({
        destination:function(req,file,cb){
        cb(null,'./files/upload')
      },
      filename:function(req,file,cb){
        let filenameParts=file.originalname.split('.');
        filenameParts=filenameParts.slice(0,filenameParts.length-1);
        const filename=filenameParts.join('.');
        if(file.mimetype){
          const ext =file.mimetype.split('/')[1];
          cb(null,filename+'-'+Date.now()+'.'+ext);
        }else{
          cb(null,filename+'-'+Date.now());
        }
      }  
    })
    })],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
