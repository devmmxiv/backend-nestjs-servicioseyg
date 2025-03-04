import { Body } from "@nestjs/common";
import { table } from "console";
import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { CierreDetalle, CierreEmpleadoDetalle } from "src/cierre/entities/cierre.entity";
import { TIPOPAGO } from "src/constants/tipo_pago";
import * as u from 'src/utils/utilidades'
import { text } from "stream/consumers";
import { Column } from "typeorm";

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
export const CierreReport = (cierre: CierreDetalle): TDocumentDefinitions => {
    const date = new Date();
   

    return {
    
        header: {
            text: [{text:`Reporte Cierre diario\n Fecha Creacion ${u.dateFormatter(date)}`}],
            alignment: 'right',
            margin: [10 ,10]
        },
        footer:{
            text:"By Softnet",
            alignment:'right',
            margin:[10,10]
        },
        content: [logo,

            {
                text: "Mensajeria EG",
                style: 'h1'
            },
            {
                columns: [
                    //datos empresa
                    {
                        text: [
                                { text: 'Calle Mariscal 5-15 zona 11, \n', style: 'h2' },
                            'Comercial Paseo Marisal Local 12 2do Nivel'
                        ]

                    }
                    ,
                    //
                    {
                        text: [{
                            text: `Numero de Cierre: ${cierre.id}
                            Fecha Cierre:
                            ${u.dateFormatter(cierre.fechaCierre)}`

                        }],
                        alignment: 'right'
                    },
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
            ...cierre.clientesRecoleciones.map((x) => (



                [
                    [
                        {
                            columns:
                                [
                                    {  
                                 
                                        text: [
                                            { text: `Codigo Cliente: ${x.codigoCliente} \n`, style: 'h4' },
                                            { text: `Nombre: ${x.nombre + ' ' + x.apellido} ` },

                                            { text: `Telefono: ${x.telefono}\n` },
                                            { text: `Pagina: ${x.nombrePagina}\n` }
                                        ],


                                    }
                                    ,
                                    {
                                        text: [{ text: 'Cuenta a Depositar\n', style: 'h4r' },
                                        { text: `Cuenta Bancaria No.:${x.cuentas[0].numeroCuenta}\n`, style: 'h4r1' },
                                        { text: `Banco:${x.cuentas[0].banco.nombre}\n`, style: 'h4r1' },
                                        { text: `Tipo Cuenta:${x.cuentas[0].tipoCuenta}\n`, style: 'h4r1' }
                                        ]
                                    }
                                ]
                        },
                        [
                            {text:"\n"}
                            ],
                    ],
                    [
                        {
                        

                            layout: 'lightHorizontalLines',
                            headerRows: 1,

                            table:
                            {
                                widths:[75,'auto','*','auto','auto','auto'],
                                body: [['Estado','Fecha', 'Persona Recibio', 'Monto Cobrado','Precio Envio', {text:"Depositar",style:'right'}],
                            
                                ...x.envios.map( (e) => 
                                
                                
                                    [
                                    { text: e.estado, style: 'c' },
                                    { text: u.dateFormatter(e.fechaActualizacion), style: 'c' },
                                    { text: e.nombreRecibe + ' ' + e.apellidoRecibe +' - '+e.direccionEntrega, style: 'c' },
                                    { text: u.currencyFormatter(e.totalCobrar), style: 'c'},
                                    { text: u.currencyFormatter(e.precioEnvio), style: 'c'},
                                   // { text: u.currencyFormatter(e.totalCobrar), style: 'ctotal'}
                                    //{ text: u.currencyFormatter(e.costoEnvio),style: 'c'},
                                    { text: u.currencyFormatter(e.totalCobrar-e.precioEnvio), style: 'ctotal'}
                                        
                                ]
                            )
                        
                            , [{},{}, {}, {}, {},{}],
                                [{},{}, {}, {
                                    bold:true,
                                    text:"Total a Depositar",
                                    colSpan:2,
                                    aligment:'right',
                                    fillColor:'black',
                                    color:'white',
                                    fontSize:14,
                                    margin:[5,5]

                                },{},{
                                    text:u.currencyFormatter(x.envios.reduce((acc,e)=> acc+ Number(e.totalCobrar-e.precioEnvio),0)),
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

            )


            ),

        ],
        styles: styles
    }

}
export const CierreporEmpleadoReport = (cierre: CierreEmpleadoDetalle): TDocumentDefinitions => {
    const date = new Date();
   

    return {
    
        header: {
            text: [{text:`Reporte Cierre diario por mensajero\nFecha Reporte ${u.dateFormatter2(date)}\n`}],
            alignment: 'right',
            margin: [10 ,10]
        },
        footer:{
            text:"By Softnet",
            alignment:'right',
            margin:[10,10]
        },
        content: [logo,

            {
                text: "Mensajeria EG",
                style: 'h1'
            },
            {
                columns: [
                    //datos empresa
                    {
                        text: [
                                { text: 'Calle Mariscal 5-15 zona 11, \n', style: 'h2' },
                            'Comercial Paseo Marisal Local 12 2do Nivel'
                        ]

                    }
                    ,
                    //
                    {
                        text: [{
                            text: `Numero de Cierre: ${cierre.id}
                            Fecha Cierre:
                            ${u.dateFormatter(cierre.fechaCierre)}`

                        }],
                        alignment: 'right'
                    },
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
            ...cierre.empleadoRecolecciones.map((x) => (



                [
                    [
                        {
                            columns:
                                [
                                    {  
                                 
                                        text: [
                                            { text: `Codigo Mensajero : ${x.codigoEmpleado} \n`, style: 'h4' },
                                            { text: `Nombre: ${x.nombre + ' ' + x.apellido} ` },

                                                                                    ],


                                    }
                                    ,
                                    
                                ]
                        },
                        [
                            {text:"\n"}
                            ],
                    ],
                    [
                        {
                        

                            layout: 'lightHorizontalLines',
                            headerRows: 1,

                            table:
                            {
                                widths:[75,'auto','*','auto','auto'],
                                body: [['Estado','Fecha', 'Persona Recibio', 'Tipo de Cobro',{text:"Monto Cobrado",style:'right'}],
                            
                                ...x.enviosAsignados.map( (e) => 
                                
                                
                                    [
                                    { text: e.estado, style: 'c' },
                                    { text: u.dateFormatter(e.fechaActualizacion), style: 'c' },
                                    { text: e.nombreRecibe + ' ' + e.apellidoRecibe +' - '+e.direccionEntrega.substring(0,10), style: 'c' },
                                  //  { text:(e.tipoPago != TIPOPAGO.TRANSFERENCIA ? u.currencyFormatter(e.totalCobrar): u.currencyFormatter(e.totalCobrar)), style: 'c'},
                                    { text: e.tipoPago, style: 'c'},
                                   // { text: u.currencyFormatter(e.totalCobrar), style: 'ctotal'}
                                    //{ text: u.currencyFormatter(e.costoEnvio),style: 'c'},
                                    { text:  e.tipoPago != TIPOPAGO.TRANSFERENCIA ? u.currencyFormatter(e.totalCobrar): u.currencyFormatter(0.00), style: 'ctotal'}
                                        
                                ]
                            )
                        
                            , [{},{}, {}, {},{}],
                                [{}, {}, {
                                    bold:true,
                                    text:"Total a Depositar",
                                    colSpan:2,
                                    aligment:'right',
                                    fillColor:'black',
                                    color:'white',
                                    fontSize:14,
                                    margin:[5,5]

                                },{},{
                                    text:u.currencyFormatter(x.enviosAsignados.reduce((acc,e)=> acc+ Number(e.tipoPago!= TIPOPAGO.TRANSFERENCIA?e.totalCobrar:0.00),0)),
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

            )


            ),

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