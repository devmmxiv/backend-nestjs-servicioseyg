import { LargeNumberLike } from "crypto";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { RecoleccionEntrega } from "src/recoleccion-entrega/entities/recoleccion-entrega.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cierre {

    
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    fechaCierre: Date;

    @UpdateDateColumn()
    fechaCuadre: Date;

  
    
    @Column({ type: Boolean, default:false })
    cuadrado: boolean;

    @Column({ type: String,nullable: true, default:false,length:100 })
    referenciaBancaria: string;

    @OneToMany(() => RecoleccionEntrega,(recoleccion)=>recoleccion.cierre,{cascade:['insert','update']})
    recolecciones: RecoleccionEntrega[]
   
}
export class CierreDetalle{
    id:number;
    fechaCierre:Date;
    clientesRecoleciones:Cliente[]
}

