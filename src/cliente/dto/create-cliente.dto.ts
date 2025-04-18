import { Type } from "class-transformer";
import { IsArray, IsBoolean,  IsOptional, IsString } from "class-validator";
import { CreateCuentaBancariaDto } from "src/cuenta-bancaria/dto/create-cuenta-bancaria.dto";
import { CreateDireccionDto } from "src/direccion/dto/create-direccion.dto";
import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto";


export class CreateClienteDto {
    id?:number;
    @IsString()
    codigoCliente:string;
    @IsString()
    nombre:string;
    @IsString()
    apellido:string;
    @IsString()
    telefono:string;
    @IsString()
    @IsOptional()
    nombrePagina:string;
    @IsBoolean()
    estado?:boolean;

    @IsArray()
    @Type(()=>CreateDireccionDto)
    direcciones:CreateDireccionDto[]

    @IsArray()
    @Type(()=>CreateCuentaBancariaDto)
    cuentas:CreateCuentaBancariaDto[]


   //@Type(()=>CreatePerfilDto)
   // perfil:CreatePerfilDto[]

}
