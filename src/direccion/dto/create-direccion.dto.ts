import { Type } from "class-transformer";
import { IsNotEmpty, isNumber, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateClienteDto } from "src/cliente/dto/create-cliente.dto";
import { TIPODIRECCION } from "src/constants/direccion-enum";

import { CreateMunicipioDto } from "src/municipio/dto/create-municipio.dto";


export class CreateDireccionDto {
    @IsNumber()
    id?:number;

    @IsString()
    direccionCompleta:string;

    @IsNumber()
    @IsPositive()
    calle?:number;

    @IsNumber()
    @IsPositive()
    avenida?:number;
    
    @IsNumber()
    @IsPositive()
    zona:number;
    
    @IsNotEmpty()
    @Type(()=>CreateMunicipioDto)
    municipio:CreateMunicipioDto;

    @IsNotEmpty()
    @Type(()=>CreateClienteDto)
    cliente:CreateClienteDto;

    tipoDireccion:TIPODIRECCION
}
