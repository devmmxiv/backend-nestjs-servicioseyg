import { IsNumber } from "class-validator";
import { RecoleccionEntrega } from "src/recoleccion-entrega/entities/recoleccion-entrega.entity";

export class CreateCierreDto {
    @IsNumber()
    id?: number;
    recolecciones: RecoleccionEntrega[]




}
