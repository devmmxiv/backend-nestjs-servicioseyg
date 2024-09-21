import { Cliente } from "src/cliente/entities/cliente.entity";
import { ESTATUSRECOLECCION } from "src/constants/status_recoleccion";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";

export class CreateRecoleccionEntregaDto {
    id?:number;
    nombreRecibe:string;
    apellidoRecibe: string;
    telefonoRecibe: string;
    montoCobrar: number;
    costoEnvio: number;
    total: number;
    direccionEntrega: string;
    estado: ESTATUSRECOLECCION;
    clienteEnvia: Cliente;
    direccionClienteEnvia:Direccion;
    municipioRecibe:Municipio;

}
