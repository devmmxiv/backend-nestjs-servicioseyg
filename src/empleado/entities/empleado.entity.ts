import { Direccion } from "src/direccion/entities/direccion.entity";
import { RecoleccionEntrega } from "src/recoleccion-entrega/entities/recoleccion-entrega.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empleado {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type: String, nullable:true,length:50 })
    codigoEmpmleado:string;
    @Column({type: Boolean, default:true })
    estado:boolean;
    @Column({type: String, nullable:false,length:50 })
    nombre:string;
    @Column({type: String, nullable:false,length:50 })
    apellido:string;

    @Column({type: String, nullable:false,length:30 })
    telefono:string;
    
    @Column({type: Boolean, default:false })
    esAdministrado:boolean

    @OneToMany(() => Direccion,(direccion)=>direccion.cliente,{cascade:['insert','update'],eager:true})
    direcciones: Direccion[]

    @OneToMany(()=>RecoleccionEntrega,(entrega)=>entrega.empleadoRecolecta,{eager:true})
    enviosRecolecta:RecoleccionEntrega[]

    @OneToMany(()=>RecoleccionEntrega,(entrega)=>entrega.empleadoEntrega,{eager:true})
    enviosEntrega:RecoleccionEntrega[]
}
