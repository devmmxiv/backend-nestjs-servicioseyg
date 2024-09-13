import { Municipio } from "src/municipio/entities/municipio.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Departamento {
    @PrimaryGeneratedColumn()
    id?:number;
    @Column({type: String, nullable:false,length:200 })
    nombre:string;
    @OneToMany(() => Municipio, (municipio) => municipio.departamento,{eager:true})
    municipios: Municipio[]
}
