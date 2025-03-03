import { Type } from "class-transformer";
import { IsArray, IsBoolean,  IsNumber,  IsOptional, IsString } from "class-validator";
import { ESTATUSRECOLECCION } from "src/constants/status_recoleccion";
import { CreateCuentaBancariaDto } from "src/cuenta-bancaria/dto/create-cuenta-bancaria.dto";
import { CreateDireccionDto } from "src/direccion/dto/create-direccion.dto";
import { IsNull } from "typeorm";


export class CreateDetalleRecoleccionDTO {
    id?:number;

    @IsString()
    nombreCompleto:string;

    @IsString()
    telefono:string;

    @IsString()
    direccion:string;

    @IsNumber()
    idMunicipio:string;

    @IsNumber()
    zona:number;

    totalCobrar: number;
     preciodeEnvio: number;

    
    
     estado: ESTATUSRECOLECCION;
}