import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateBancoDto } from "src/banco/dto/create-banco.dto";
import { CreateClienteDto } from "src/cliente/dto/create-cliente.dto";
import { TIPOCUENTABANCARIA } from "src/constants/tipo-cuentas";

export class CreateCuentaBancariaDto {
    @IsNumber()
    id?:number;

    @IsString()
    numeroCuenta:string;
    
    @IsEnum({type:'enum',enum:TIPOCUENTABANCARIA})
    tipoCuenta:TIPOCUENTABANCARIA
   
    @IsOptional()
    @Type(()=>CreateBancoDto)
    banco:CreateBancoDto;

    @IsNotEmpty()
    @Type(()=>CreateClienteDto)
    cliente:CreateClienteDto;



}
