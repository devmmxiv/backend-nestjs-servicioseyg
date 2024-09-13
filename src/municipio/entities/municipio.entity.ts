import { Departamento } from "src/departamento/entities/departamento.entity";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { RecoleccionEntrega } from "src/recoleccion-entrega/entities/recoleccion-entrega.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Municipio {
    
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type: String, nullable:false,length:200 })
    nombre:string;

    @ManyToOne(() => Departamento, (departamento) => departamento.municipios)
    departamento: Departamento;

    @OneToMany(()=>Direccion,(direccion)=>direccion.municipio)
    direcciones:Direccion[]

    @OneToMany(()=>RecoleccionEntrega,(entrega)=>entrega.municipioRecibe)
    entregas:RecoleccionEntrega[]
}
