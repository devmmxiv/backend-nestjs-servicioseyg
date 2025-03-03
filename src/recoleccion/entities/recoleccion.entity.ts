import { IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";
import { Cierre } from "src/cierre/entities/cierre.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { ESTATUS_CABECERA_RECOLECCION, ESTATUSRECOLECCION } from "src/constants/status_recoleccion";
import { TIPOPAGO } from "src/constants/tipo_pago";
import { DetalleRecoleccion } from "src/detalle-recoleccion/entities/detalle-recoleccion.entity";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { Empleado } from "src/empleado/entities/empleado.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recoleccion {

    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

  
    @CreateDateColumn()
    fechaRecoleccion: Date;

    @Column({ type: Boolean, default:false })
    cerrada: boolean;
   
    @Column({type:'enum',enum:ESTATUS_CABECERA_RECOLECCION,default:ESTATUS_CABECERA_RECOLECCION.CREADA})
    estado: ESTATUS_CABECERA_RECOLECCION;
    @Column({ type: 'int',nullable: false, default:1 })
    cantidadPaquetes: number;

    @ManyToOne(() => Cliente,(cliente)=>cliente.envios)
    @JoinColumn({
        name: 'idClienteEnvia',
      })
    clienteEnvia: Cliente;


  

    @ManyToOne(() => Empleado,(empleado)=>empleado.enviosRecolecta)
    @JoinColumn({
        name: 'idEmpleadoRecolecto',
      })
    empleadoRecolecta?: Empleado;

    @ManyToOne(() => Empleado,(empleado)=>empleado.enviosAsignados)
    @JoinColumn({
        name: 'idEmpleadoAsignado',
      })
      empleadoAsignado?: Empleado;
    @OneToMany(() => DetalleRecoleccion,(detalle)=>detalle.recoleccion,{cascade:['insert','update'],eager:true})
    detalle: DetalleRecoleccion[]

}
