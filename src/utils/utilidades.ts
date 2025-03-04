export const currencyFormatter = (value: number) => {
    
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency: 'GTQ'
    })
    return formatter.format(value)
  }

  export const dateFormatter = (fecha: Date) => {
    const date = new Date(fecha);
  //  const formattedDateTime = date.toLocaleString('es-GT', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
  const formattedDateTime = fecha.toLocaleString('es-GT', { year: 'numeric', month: '2-digit', day: 'numeric'});

    return formattedDateTime;

  }
  export const dateFormatter2 = (fecha: Date) => {
    const date = new Date(fecha);
  //  const formattedDateTime = date.toLocaleString('es-GT', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
  const formattedDateTime = fecha.toLocaleString('es-GT', { year: 'numeric', month: '2-digit', day: 'numeric', hour:'numeric',minute:'numeric',second:'numeric'});

    return formattedDateTime;

  }
  const meses=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
  export const dateMonthFormat = (fecha: Date) => {
    const indexmonth=fecha.getUTCMonth();
    return meses[indexmonth];
    

  }

  export const dateToString = (fecha: Date) => {

    const isoString = fecha.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;


  }
