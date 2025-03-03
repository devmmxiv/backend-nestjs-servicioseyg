
import { Type } from "class-transformer";
import { IsArray, IsNumber } from "class-validator";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { ESTATUS_CABECERA_RECOLECCION, ESTATUSRECOLECCION } from "src/constants/status_recoleccion";
import { TIPOPAGO } from "src/constants/tipo_pago";
import { CreateDetalleRecoleccionDTO } from "src/detalle-recoleccion/create-detalle-recoleccion.dto";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";

export class CreateRecoleccionDto {
    id?: number;

    clienteEnvia: Cliente;

 
    @IsNumber()
    cantidadPaquetes: number
    idEmpleadoAsignado:number
    estado: ESTATUS_CABECERA_RECOLECCION;

    @IsArray()
    @Type(() => CreateDetalleRecoleccionDTO)
    detalle: CreateDetalleRecoleccionDTO[]
}
