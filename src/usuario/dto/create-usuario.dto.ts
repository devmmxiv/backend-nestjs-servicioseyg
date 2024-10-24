import { IsOptional, IsString } from "class-validator";


export class CreateUsuarioDto {
    @IsString()
    username:string;
    @IsString()
    password:string;
    @IsString()
    @IsOptional()
    correo?:string;
    @IsOptional()
    estado?:Boolean;
    
}
