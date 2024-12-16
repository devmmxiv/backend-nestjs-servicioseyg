import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
//import { SnakeNamingStrategy } from "typeorm-naming-strategies";

ConfigModule.forRoot({
    envFilePath:`env/.${process.env.NODE_ENV}.env`,
    isGlobal:true
  });
  const configService=new ConfigService();
console.log()
  export const DataSourceConfig:DataSourceOptions={
    
    type:'mysql',
    username:process.env.DB_USER || configService.get('DB_USER'),
    host:process.env.DB_HOST || configService.get('DB_HOST'),
    port:Number(process.env.DB_PORT) || configService.get('DB_PORT'),
    password:process.env.DB_PASSWORD ||configService.get('DB_PASSWORD'),
    database:process.env.DB_NAME ||configService.get('DB_NAME'),
    entities:[__dirname+'/../**/**/*.entity{.ts,.js}'],
    migrations:[__dirname+'/../../migrations/*{.ts,.js}'],
    synchronize:false,
    migrationsRun:true,
    logging:false,
    timezone: 'Z',
    //namingStrategy:new SnakeNamingStrategy()

}
export const AppDS=new DataSource(DataSourceConfig);