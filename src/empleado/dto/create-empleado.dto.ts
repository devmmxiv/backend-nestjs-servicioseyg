import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsString } from "class-validator";
import { CreateDireccionEmpleadoDto } from "src/direccion/dto/create-direccion-empleado";

export class CreateEmpleadoDto {
    id?:number;
    @IsString()
    codigoEmpleado:string;
    @IsString()
    nombre:string;
    @IsString()
    apellido:string;
    @IsString()
    telefono:string;

    @IsBoolean()
    estado?:boolean;

    @IsArray()
    @Type(()=>CreateDireccionEmpleadoDto)
    direcciones:CreateDireccionEmpleadoDto[]


}
