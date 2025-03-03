import { IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";
import { Cierre } from "src/cierre/entities/cierre.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { ESTATUSRECOLECCION } from "src/constants/status_recoleccion";
import { TIPOPAGO } from "src/constants/tipo_pago";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { Empleado } from "src/empleado/entities/empleado.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";
import { Recoleccion } from "src/recoleccion/entities/recoleccion.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DetalleRecoleccion {

    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

  
    @CreateDateColumn()
    fechaRecoleccion: Date;

    
    @CreateDateColumn()
    fechaEntrega: Date;
    
    @Column({ type: String, nullable: false, length:200  })
    nombreCompleto: string;


    @Column({ type: String, nullable: false, length: 50 })
    telefono: string;

   // @Column({ type: 'decimal',  precision: 6, scale: 2,nullable: false, default:0.00 })
    //precioProducto: number;

    @Column({ type: 'decimal',  precision: 6, scale: 2,nullable: false, default:0.00 })
    preciodeEnvio: number;
    @Column({ type: 'decimal',  precision: 6, scale: 2,nullable: false, default:0.00,comment:"este monto se le paga al mensajero por entregar en ciertos lugares" })
    pagoExtra: number;
    @Column({ type: 'decimal',  precision: 6, scale: 2,nullable: false, default:0.00, comment:"Este es el monto que se cobra al cliente que recibe"})
    totalCobrar: number;
    @Column({ type: String, nullable: false, length: 200 })
    direccion: string;

    @Column({ type: 'int',nullable: false, default:0 })
    zona: number;

    @Column({type:'enum',enum:ESTATUSRECOLECCION,default:ESTATUSRECOLECCION.CREADA})
    estado: ESTATUSRECOLECCION;

    @Column({type:'enum',enum:TIPOPAGO,default:TIPOPAGO.EFECTIVO})
    tipoPago: TIPOPAGO;

    @Column({ type: Number, nullable: true })
    latitud?: number;

    @Column({ type: Number, nullable: true })
    altitud?: number;



    @Column({ type: String,  nullable: true, length: 200 })
    observaciones: String;
    @ManyToOne(() => Recoleccion,(recoleccion)=>recoleccion.detalle)
    @JoinColumn({
        name: 'idRecoleccion',
      })
    recoleccion: Recoleccion;

    @ManyToOne(()=>Municipio,(municipio)=>municipio.entregas)
    @JoinColumn({
        name: 'idMunicipioRecibe',
      })
    municipioRecibe:Municipio;

 
    @ManyToOne(() =>Cierre,(cierre)=>cierre.recolecciones)
    @JoinColumn({
      name: 'idCierre',
    })
    cierre: Cierre

    @ManyToOne(() => Empleado,(empleado)=>empleado.enviosEntrega)
    @JoinColumn({
        name: 'idEmpleadoEntrego',
      })
    empleadoEntrega?: Empleado;

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

}
