
import { CuentaBancaria } from "src/cuenta-bancaria/entities/cuenta-bancaria.entity";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { Perfil } from "src/perfil/entities/perfil.entity";
import { RecoleccionEntrega } from "src/recoleccion-entrega/entities/recoleccion-entrega.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({type: String, nullable:false,length:50 })
    codigoCliente!:string;
    @Column({type: String, nullable:false,length:50 })
    nombre:string;
    @Column({type: String, nullable:false,length:50 })
    apellido:string;

    @Column({type: String, nullable:false,length:30 })
    telefono:string;

    @Column({type: Boolean,nullable:false,default:false})
    deleted?:boolean


//cuentaBancaria
    

    @Column({type: String, nullable:true,length:50 })
    nombrePagina?:string;

    @Column({type: Boolean, default:true })
    estado?:boolean;
    
    @OneToMany(() => Direccion,(direccion)=>direccion.cliente,{cascade:['insert','update'],eager:true})
    direcciones: Direccion[]

    @OneToMany(()=>RecoleccionEntrega,(entrega)=>entrega.clienteEnvia)
    envios:RecoleccionEntrega[]


    @OneToMany(()=>CuentaBancaria,(cuenta)=>cuenta.cliente,{cascade:['insert','update'],eager:true})
    cuentas:CuentaBancaria[]

    @OneToOne(() => Perfil)
    @JoinColumn()
    perfil: Perfil
}
