import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateDepartamentoDto } from "src/departamento/dto/create-departamento.dto";

export class CreateMunicipioDto {
    @IsNumber()
    id:number
    @IsNotEmpty()
    nombre:string;

    @Type(()=>CreateDepartamentoDto)
    departamento:CreateDepartamentoDto;
}
