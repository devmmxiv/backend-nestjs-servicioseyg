import { IsOptional, IsString } from "class-validator";

export class CreateBancoDto {

    @IsOptional()
    id?:number;
    @IsString()
    nombre:string;



}
