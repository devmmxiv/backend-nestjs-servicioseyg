import { IsNotEmpty, IsString } from "class-validator";

export class CreateDepartamentoDto {

    @IsNotEmpty()
    @IsString()
    nombre:string;

    
}
