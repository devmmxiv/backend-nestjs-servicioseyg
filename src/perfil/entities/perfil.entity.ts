import { Cliente } from "src/cliente/entities/cliente.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Perfil {

    @PrimaryColumn({type:String,length:30})
    usuario:string;
    
    @Column({type: String, nullable:true,length:50 })
    correo?:string;

    @Column({type: String, nullable:false,length:50 })
    password:string;


    @Column({type: Boolean, default:true })
    estado?:Boolean;

    @OneToOne(() => Cliente, (cliente) => cliente.perfil,{eager:true}) // specify inverse side as a second parameter
    cliente: Cliente

}
