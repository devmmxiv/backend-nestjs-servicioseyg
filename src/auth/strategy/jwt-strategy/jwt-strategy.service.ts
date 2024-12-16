import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import {Strategy,ExtractJwt} from 'passport-jwt'

import { JwtPayload } from 'src/auth/dto/jwt-payload';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    /**
     *
     */
    constructor(
        private configService:ConfigService,
        private usurioService:UsuarioService
    ) {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:configService.get('auth.secretKey')
        });
        
    }
    async validate(payload:JwtPayload){
        const user=await this.usurioService.findByUsername(payload.username);
        if(!user){
            throw new UnauthorizedException();
        }
        user.password=undefined;
        return user;
    }
}
