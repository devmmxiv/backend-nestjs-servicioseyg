import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";

const styles:StyleDictionary={
    h1:{
        fontSize:20,
        bold:true,
        margin:[0,5]
    },
    h2:{
        fontSize:16,
        bold:true

    }
}
export const CierreReport=():TDocumentDefinitions=>{
    return {
        header:{
            text:'reporte cierre diario',
            alignment:'right',
            margin:[10,10]
        },
        content:[
            
       {
        text:"Mensajeria EyG"
       },
        {
            columns: [
                {text:[
                    {text:'San Miguel Petapa, Guatemala\n',style:'h2'},
                    'Colonia Villa Real'
                ]

                }
                ,
                {
                    text:'columna 2',
                    alignment:'right'
                }
            ],
            
        
        }
    ],
    styles:styles
    }

}
