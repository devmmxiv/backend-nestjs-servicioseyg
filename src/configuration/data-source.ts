import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
//import { SnakeNamingStrategy } from "typeorm-naming-strategies";

ConfigModule.forRoot({
    envFilePath:`.${process.env.NODE_ENV}.env`,
    isGlobal:true
  });
  const configService=new ConfigService();

  export const DataSourceConfig:DataSourceOptions={
    
    type:'mysql',
    username:configService.get('DB_USER'),
    host:configService.get('DB_HOST'),
    port:configService.get('DB_PORT'),
    password:configService.get('DB_PASSWORD'),
    database:configService.get('DB_NAME'),
    entities:[__dirname+'/../**/**/*.entity{.ts,.js}'],
    migrations:[__dirname+'/../../migrations/*{.ts,.js}'],
    synchronize:true,
    migrationsRun:true,
    logging:false,
    //namingStrategy:new SnakeNamingStrategy()

}
export const AppDS=new DataSource(DataSourceConfig);