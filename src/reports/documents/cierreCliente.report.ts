import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";

import { Cliente } from "src/cliente/entities/cliente.entity";
import * as u from 'src/utils/utilidades'

const styles: StyleDictionary = {
    right:{
        alignment:'right'
    },
    left:{
        alignment:'left'
    },
    h1: {
        fontSize: 20,
        bold: true,
        margin: [0, 5]
    },
    h2: {
        fontSize: 16,
        bold: true

    },
    h3: {
        fontSize: 14,
        bold: true

    },
    h4: {
        fontSize: 12,
        bold: true,
        alignment: 'left'
    },
    h4r: {
        fontSize: 12,
        bold: true,
        alignment: 'right'
    },
    h4r1: {
        fontSize: 10,

        alignment: 'right'
    },
    c: {
        fontSize: 10,

    },
    ctotal: {
        fontSize: 10,
          alignment: 'right',
          margin: [5, 0]

    },
    link: {

        bold: true,
        italics: true

    }
}
const logo: Content = {
    image: 'src/assets/logoEyG.jpg',
    width: 140,
    height: 100
}
export const CierreClienteReport = (cliente: Cliente): TDocumentDefinitions => {
    const date = new Date();
   

    return {
    
        header: {
            text: [{text:`Reporte Mensual\n Fecha Creacion ${u.dateFormatter(date)}\n`}],
            alignment: 'right',
            margin: [8 ,8]
        },
        footer:{
            text:"By Softnet",
            alignment:'right',
            margin:[10,10]
        },
        content: [logo,

            {
                text: "Mensajeria EyG",
                style: 'h1'
            },
            {
                columns: [
                    //datos empresa
                    {
                        text: [
                            { text: 'San Miguel Petapa, Guatemala\n', style: 'h2' },
                            'Colonia Villa Real'
                        ]

                    }
                    ,
                   
                ],



            },
            {
                text: "\n"


            },
            {
                canvas:
                    [
                        { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }
                    ]
            },
            { text: "\n" },
            { text: `REPORTE DEL MES DE ${u.dateMonthFormat(date)}\n`, style: 'h1' },
           // ...cliente.envios.map((x) => (



                [
                    [
                        {  
                  
                            columns:
                                [
                                    {  
                                 
                                        text: [
                                            { text: `Codigo Cliente: ${cliente.codigoCliente} \n`, style: 'h4' },
                                            { text: `Nombre: ${cliente.nombre + ' ' + cliente.apellido} ` },

                                            { text: `Telefono: ${cliente.telefono}\n` },
                                            { text: `Pagina: ${cliente.nombrePagina}\n` }
                                        ],


                                    }
                                    ,
                                 /*   {
                                        text: [{ text: 'Cuenta a Depositar\n', style: 'h4r' },
                                        { text: `Cuenta Bancaria No.:${cliente.cuentas[0].numeroCuenta}\n`, style: 'h4r1' },
                                        { text: `Banco:${cliente.cuentas[0].banco.nombre}\n`, style: 'h4r1' },
                                        { text: `Tipo Cuenta:${cliente.cuentas[0].tipoCuenta}\n`, style: 'h4r1' }
                                        ]
                                    }*/
                                ]
                        },
                        [
                            {text:"\n"}
                            ],
                    ],
                    [
                        {
                        

                            layout: 'lightHorizontalLines',
                           // headerRows: 1,

                            table:
                            {
                                widths:[75,'*','auto','auto'],
                                body: [['Fecha', 'Persona Recibio', 'Precio Envio', {text:"Total",style:'right'}],
                            
                                ...cliente.envios.map( (e) => 
                                
                                
                                    [
                                   // { text: e.estado, style: 'c' },
                                    { text: u.dateFormatter(e.fechaEntrega), style: 'c' },
                                    { text: e.nombreRecibe + ' ' + e.apellidoRecibe, style: 'c' },
                                  
                                    { text: u.currencyFormatter(e.precioEnvio), style: 'c'},
                                   // { text: u.currencyFormatter(e.totalCobrar), style: 'ctotal'}
                                    //{ text: u.currencyFormatter(e.costoEnvio),style: 'c'},
                                    { text: u.currencyFormatter(e.precioEnvio), style: 'ctotal'}
                                        
                                ]
                            )
                        
                            , [{},{}, {}, {}],
                                [{}, {
                                    bold:true,
                                    text:"Total a Cobrar",
                                    colSpan:2,
                                    aligment:'right',
                                    fillColor:'black',
                                    color:'white',
                                    fontSize:14,
                                    margin:[5,5]

                                },{},{
                                    text:u.currencyFormatter(cliente.envios.reduce((acc,e)=> acc+ Number(e.precioEnvio),0)),
                                    bold:true,
                                    aligment:'right',
                                    fillColor:'black',
                                    color:'white',
                                    fontSize:14,
                                    margin:[5,5]
                                }
                                //   {text:x.envios.map((c)=> {return c.total+3})}
                                    ]
                            
                                ],
                            
                            }
                        
                        }
                ]
                    ,     [
                        {text:"\n"}
                        ],

                ]

       //     )


            //),

        ],
        styles: styles
    }

}
/*
 ...cierre.clientesRecoleciones.map((x)=> (
                
            
                   {
                    header:{text:"Encabezado de tabla"},
                    table: {
                        body: [['ENCABEZADO ID1']]
                    }

                }            
            )
                
             
            )
 /* [/**{text:`Codigo Cliente: ${x.codigoCliente}`,style:'h3'},
             {text:`Nombre Cliente: ${x.nombre}`},
             {text:`Apellido Cliente: ${x.apellido}`},
             {text:`Telefono Cliente: ${x.telefono}`},
             {text:`Nombre Pagina: ${x.nombrePagina}`,style:'link'},
             {text:"\n"},

             x.envios.map((c=>[c.costoEnvio])) 

           ],*/