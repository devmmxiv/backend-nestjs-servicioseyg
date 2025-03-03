import { Cliente } from "src/cliente/entities/cliente.entity";
import { ESTATUSRECOLECCION } from "src/constants/status_recoleccion";
import { TIPOPAGO } from "src/constants/tipo_pago";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { Empleado } from "src/empleado/entities/empleado.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";

export class CreateRecoleccionEntregaDto {
    id?:number;
    nombreRecibe:string;
    apellidoRecibe: string;
    telefonoRecibe: string;
    montoCobrar: number;
    precioEnvio: number;
    total: number;
    direccionEntrega: string;
    zonaEntrega:number;
    estado: ESTATUSRECOLECCION;
    clienteEnvia: Cliente;
    direccionClienteEnvia:Direccion;
    municipioRecibe:Municipio;
    tipoPago:TIPOPAGO;
    idEmpleadoAsignado:number;
    idEmpleadoEntrega:number;
    

}
export class InsertRecoleccionDTO {
    id?:number;
    nombreRecibe:string;
    apellidoRecibe: string;
    telefonoRecibe: string;
    montoCobrar: number;
    precioEnvio: number;
    total: number;
    direccionEntrega: string;
    zonaEntrega:number;
    estado: ESTATUSRECOLECCION;
    clienteEnvia: Cliente;
    direccionClienteEnvia:Direccion;
    municipioRecibe:Municipio;
    tipoPago:TIPOPAGO;
    idEmpleadoAsignado:Empleado;

    

}

