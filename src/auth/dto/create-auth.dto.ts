
    import { IsOptional, IsString } from "class-validator";

    export class CreateAuthDto {
    @IsString()
    username:string;
    @IsString()
    password:string;
    @IsString()
    @IsOptional()
    correo?:string;
    @IsOptional()
    estado?:Boolean;
    


}
