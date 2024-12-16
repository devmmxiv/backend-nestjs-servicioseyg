import { Type } from "class-transformer";
import { IsNotEmpty, isNumber, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateClienteDto } from "src/cliente/dto/create-cliente.dto";
import { TIPODIRECCION } from "src/constants/direccion-enum";
import { CreateEmpleadoDto } from "src/empleado/dto/create-empleado.dto";

import { CreateMunicipioDto } from "src/municipio/dto/create-municipio.dto";


export class CreateDireccionEmpleadoDto {
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
    @Type(()=>CreateEmpleadoDto)
    empleado:CreateEmpleadoDto;

    tipoDireccion:TIPODIRECCION
}
