import { IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { ESTATUSRECOLECCION } from "src/constants/status_recoleccion";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RecoleccionEntrega {

    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

  
    
    @Column({ type: String, nullable: false, length: 50 })
    nombreRecibe: string;

    @Column({ type: String, nullable: false, length: 50 })
    apellidoRecibe: string;

    @Column({ type: String, nullable: false, length: 50 })
    telefonoRecibe: string;

    @Column({ type: 'decimal', nullable: false, default:0.00 })
    montoCobrar: number;

    @Column({ type: 'decimal', nullable: false, default:0.00 })
    costoEnvio: number;
    @Column({ type: 'decimal', nullable: false, default:0.00 })
    total: number;
    @Column({ type: String, nullable: false, length: 200 })
    direccionEntrega: string;

    @Column({type:'enum',enum:ESTATUSRECOLECCION,default:ESTATUSRECOLECCION.CREADA})
    estado: ESTATUSRECOLECCION;

    @Column({ type: Number, nullable: true })
    latitud?: number;

    @Column({ type: Number, nullable: true })
    altitud?: number;

    @ManyToOne(() => Cliente,(cliente)=>cliente.envios)
    @JoinColumn({
        name: 'idClienteEnvia',
      })
    clienteEnvia: Cliente;

    @ManyToOne(() => Direccion,(direccion)=>direccion.entregas)
    @JoinColumn({
        name: 'idDireccionClienteEnvia',
      })
    direccionClienteEnvia:Direccion;


    @ManyToOne(()=>Municipio,(municipio)=>municipio.entregas)
    @JoinColumn({
        name: 'idMunicipioRecibe',
      })
    municipioRecibe:Municipio;

}
