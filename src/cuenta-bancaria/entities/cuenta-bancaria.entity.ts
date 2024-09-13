import { Banco } from "src/banco/entities/banco.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { TIPOCUENTABANCARIA } from "src/constants/tipo-cuentas";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
@Index(['banco', 'tipoCuenta'], { unique: true }) // Here
export class CuentaBancaria {

    
    @PrimaryGeneratedColumn()
    id?:number;

    @Column({type: String, nullable:false,length:20 })
    numeroCuenta:string;

    @Column({type:'enum',enum:TIPOCUENTABANCARIA,default:TIPOCUENTABANCARIA.MONETARIA})
    tipoCuenta:TIPOCUENTABANCARIA

    @ManyToOne(()=>Banco,(banco)=>banco.cuentas)
    banco:Banco

    
    @ManyToOne(() => Cliente,(cliente)=>cliente.cuentas)
    cliente: Cliente


}
