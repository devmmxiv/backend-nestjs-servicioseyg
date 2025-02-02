import { Direccion } from "src/direccion/entities/direccion.entity";
import { DireccionEmpleado } from "src/direccion/entities/direccion_empleado.entity";
import { RecoleccionEntrega } from "src/recoleccion-entrega/entities/recoleccion-entrega.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empleado {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type: String, nullable:true,length:50 })
    codigoEmpleado:string;
    @Column({type: Boolean, default:true })
    estado:boolean;
    @Column({type: String, nullable:false,length:50 })
    nombre:string;
    @Column({type: String, nullable:false,length:50 })
    apellido:string;

    @Column({type: String, nullable:false,length:30 })
    telefono:string;
    
    @Column({type: Boolean, default:false })
    esAdministrador:boolean

    @OneToMany(() => DireccionEmpleado,(direccion)=>direccion.empleado,{cascade:['insert','update'],eager:true})
    direcciones: DireccionEmpleado[]

    @OneToMany(()=>RecoleccionEntrega,(entrega)=>entrega.empleadoRecolecta,{eager:true})
    enviosRecolecta:RecoleccionEntrega[]

    @OneToMany(()=>RecoleccionEntrega,(entrega)=>entrega.empleadoEntrega,{eager:true})
    enviosEntrega:RecoleccionEntrega[]

    @OneToMany(()=>RecoleccionEntrega,(entrega)=>entrega.empleadoAsignado,{eager:true})
    enviosAsignados:RecoleccionEntrega[]
    
    @OneToOne(() => Usuario)
    @JoinColumn({name:'username'})
    usuario: Usuario
}
