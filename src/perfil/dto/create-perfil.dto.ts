import { IsOptional, IsString } from "class-validator";

export class CreatePerfilDto {
    @IsString()
    usuario:string;
    @IsString()
    password:string;
    @IsString()
    @IsOptional()
    correo?:string;
    @IsOptional()
    estado?:Boolean;
    
}
