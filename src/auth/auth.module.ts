import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategyService } from './strategy/jwt-strategy/jwt-strategy.service';

import { UsuarioModule } from 'src/usuario/usuario.module';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports:[
    
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
     
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{
     
        return {
          
          secret:configService.get<string>('auth.secretKey'),
          signOptions:{expiresIn:'3600s'}
        }
      }
    }),
    UsuarioModule,ClienteModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategyService],
})
export class AuthModule {}
