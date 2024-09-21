import { registerAs } from "@nestjs/config"

export default registerAs('maria',()=>({
   /* type:'mysql',
    username: process.env.DB_USER, // .configService.get('DB_USER'),
    host: process.env.DB_HOST,//configService.get('DB_HOST'),
    port: process.env.DB_PORT,//configService.get('DB_PORT'),
    password: process.env.DB_PASSWORD,//configService.get('DB_PASSWORD'),
    database: process.env.DB_NAME,//configService.get('DB_NAME'),
  
    synchronize:true,

    logging:false,
    autoLoadEntities: true
  //  namingStrategy:new SnakeNamingStrategy()
*/
}))

