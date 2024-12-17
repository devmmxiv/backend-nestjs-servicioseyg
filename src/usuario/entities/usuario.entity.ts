import { Cliente } from "src/cliente/entities/cliente.entity";
import { PERFILUSUARIO } from "src/constants/perfil_usuario";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryColumn({type:String,length:30})
    username:string;
    
    @Column({type: String, nullable:true,length:50 })
    correo?:string;

    @Column({type: String, nullable:false,length:128 })
    password:string;


    @Column({type: Boolean, default:true })
    estado?:Boolean;

    @Column({type:'enum',enum:PERFILUSUARIO,default:PERFILUSUARIO.CLIENTE})
    perfilUsuario:PERFILUSUARIO


}

