
import { CuentaBancaria } from "../../cuenta-bancaria/entities/cuenta-bancaria.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banco {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: String, nullable:false,length:200 })
    nombre:string;

    @OneToMany(()=>CuentaBancaria,(cuenta)=>cuenta.banco)
    cuentas:CuentaBancaria[];
    
}
