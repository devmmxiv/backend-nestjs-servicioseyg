
import { Cliente } from "src/cliente/entities/cliente.entity";
import { TIPODIRECCION } from "src/constants/direccion-enum";
import { Empleado } from "src/empleado/entities/empleado.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";
import { RecoleccionEntrega } from "src/recoleccion-entrega/entities/recoleccion-entrega.entity";
import { Column, Entity, Index,  ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(['empleado', 'tipoDireccion'], { unique: true }) // Here
export class DireccionEmpleado {
    
    @PrimaryGeneratedColumn()
    id?:number;
    @Column({type: String, nullable:false,length:200 })
    direccionCompleta:string;
    @Column({type: Number, nullable:true})
    calle?:number;
    @Column({type: Number, nullable:true})
    avenida?:number;
    @Column({type: Number, nullable:false})
    zona:number;


    @ManyToOne(() => Empleado,(empleado)=>empleado.direcciones)
    empleado: Empleado


    @ManyToOne(()=>Municipio,(municipio)=>municipio.direcciones,{eager:true})
    municipio:Municipio


    @Column({type:'enum',enum:TIPODIRECCION,default:TIPODIRECCION.PRINCIPAL})
    tipoDireccion:TIPODIRECCION
}
