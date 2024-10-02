import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DireccionModule } from './direccion/direccion.module';
import { MunicipioModule } from './municipio/municipio.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { RecoleccionEntregaModule } from './recoleccion-entrega/recoleccion-entrega.module';
import { PerfilModule } from './perfil/perfil.module';
import { ReportsModule } from './reports/reports.module';
import { PrinterModule } from './printer/printer.module';
import { CuentaBancariaModule } from './cuenta-bancaria/cuenta-bancaria.module';
import { BancoModule } from './banco/banco.module';

import configurationMaria from './configuration/configuration-maria';
import { DataSource } from 'typeorm';
import { DataSourceConfig } from './configuration/data-source';
import { ConfigModule } from '@nestjs/config';
import { CierreModule } from './cierre/cierre.module';







@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),

    TypeOrmModule.forRoot({
      ...DataSourceConfig
     /* "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "Cocacola17",
      "database": "servicioseyg",
      "synchronize": true,
      "logging": false,
      "autoLoadEntities": true,*/

   }),
    ClienteModule,
    DireccionModule, 
    MunicipioModule,
    DepartamentoModule,
    RecoleccionEntregaModule,

    PerfilModule,

    ReportsModule,

    PrinterModule,
    CuentaBancariaModule,
    BancoModule,
    CierreModule

  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
