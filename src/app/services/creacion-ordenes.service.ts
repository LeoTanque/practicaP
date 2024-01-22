import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CreacionOrdenesService {
  apiUrl = enviroment.apiUrl
  constructor(private http: HttpClient) { }

  listarCombos(): Observable<any> {
    return this.http.post<any>('/api/TablasSinObjeto/ListarCombos',{UserCode:"THERNANDEZ", UserPassWord: "12456"});
  }

  listarBT01():Observable<any>{
    return this.http.post<any>('/api/TablasSinObjeto/ListarEquipos?typeequipo=BT01',{UserCode:"THERNANDEZ", UserPassWord: "12456"} );
  }

  listarMC01():Observable<any>{
    return this.http.post<any>('/api/TablasSinObjeto/ListarEquipos?typeequipo=MC01',{UserCode:"THERNANDEZ", UserPassWord: "12456"} )
  }
  

datosMC01(codigo:any, tipo:any):Observable<any>{
return this.http.post<any>(`/api/TablasSinObjeto/ListarClientes?cardcode=${codigo}&type=${tipo}`, {UserCode:"THERNANDEZ", UserPassWord: "12456"})
}


datosRefacciones():Observable<any>{
return this.http.post<any>('/api/TablasSinObjeto/ListarArticulos', {UserCode:"THERNANDEZ", UserPassWord: "12456"} )
}

seriesAlmacen(serie:any):Observable<any>{
  return this.http.post<any>(`/api/TablasSinObjeto/ObtenerSerieXalmacen?serie=${serie}`, {UserCode:"THERNANDEZ", UserPassWord: "12456"} )
}


traerCotizaciones(codigo:any):Observable<any>{
  return this.http.post<any>(`/api/TablasSinObjeto/ListarCotizacion?cardcode=${codigo}`, {UserCode:"THERNANDEZ", UserPassWord: "12456"} )
}



traerDescripcionCotizaciones(docentry:any):Observable<any>{
  return this.http.post<any>(`/api/TablasSinObjeto/ListarDetalleCotizacion?docentry=${docentry}`,{UserCode:"THERNANDEZ", UserPassWord: "12456"} )
}


traerManoDeObra():Observable<any>{
  return this.http.post<any>('api/TablasSinObjeto/ListarArticulos?manoobra=Y', {UserCode:"THERNANDEZ", UserPassWord: "12456"} )
  }

traerRecomendaciones():Observable<any>{
return this.http.post<any>('/api/TablasSinObjeto/ListarArticulos?typeinv={typeinv}&manoobra={manoobra}&cadena={cadena}', {UserCode:"THERNANDEZ", UserPassWord: "12456"} )
}



traerProveedoresTerceros():Observable<any>{
return this.http.post<any>('api/TablasSinObjeto/ListarClientes?cardcode=&type=S', { UserCode: 'THERNANDEZ', UserPassWord: '12456', type: 'S' })
}


traerOedenCompraTerceros1():Observable<any>{
  return this.http.post<any>('api/TablasSinObjeto/ListarOrdenesdeCompra?cardcode=PHMO1013', {UserCode:"THERNANDEZ", UserPassWord: "12456"})
}

traerOedenCompraTerceros(cardCode:any):Observable<any[]>{
  return this.http.post<any[]>(`api/TablasSinObjeto/ListarOrdenesdeCompra?cardcode= ${cardCode}`, {UserCode:"THERNANDEZ", UserPassWord: "12456", CardCode: cardCode})
}

// creacion-ordenes.service.ts

traerOedenCompraTerceros2(cardCode: string): Observable<any[]> {
  return this.http.post<any[]>(`api/TablasSinObjeto/ListarOrdenesdeCompra?cardcode=${cardCode}`, {
    UserCode: "THERNANDEZ",
    UserPassWord: "12456", 
    CardCode: cardCode
  }) ;
}


procesarOrdenesCompra(data: any[]): any[] {
  // Realiza el procesamiento necesario aquí
  // Puedes modificar esta función según tus necesidades

  return data.map(orden => ({
    DocNum: orden.DocNum,
    docdate: new Date(orden.docdate).toLocaleDateString(),
    Comments: orden.Comments,
    DocDueDate: new Date(orden.DocDueDate).toLocaleDateString(),
    DocTotal: orden.DocTotal
  }));
}

traerOdenCompraTerceros(cardCode: string): Observable<any> {
  const requestBody = {
    UserCode: "THERNANDEZ",
    UserPassWord: "12456",
    CardCode: cardCode
  };

  return this.http.post<any>('api/TablasSinObjeto/ListarOrdenesdeCompra', requestBody);
}

traerOrdenesCompraPorProveedor(cardCode: string): Observable<any[]> {
  return this.http.post<any[]>('api/TablasSinObjeto/ListarOrdenesdeCompra', {
    cardcode: cardCode,
    UserCode: "THERNANDEZ",
    UserPassWord: "12456"
  });
}


grabarOrdenTrabajo(Body: any): Observable<any> {
  return this.http.post<any>('/api/TablasSinObjeto/GrabarOrdenTrabajo', Body );
 // return this.http.post<any>('/api/TablasSinObjeto/GrabarOrdenTrabajo', Body, { params: { timestamp: new Date().getTime().toString() } });

}


updateOrden(Body:any):Observable<any>{
return this.http.post<any>('/api/TablasSinObjeto/UpdateOrdenTrabajo', Body)
}


obtenerOrdenes(body:any): Observable<any> {
  // Ajusta la URL según la ruta de tu API para obtener las órdenes
  return this.http.post<any>('/api/TablasSinObjeto/ListarGetUdo', body);
}


/*
obtenerOrdenPorDocEntry(docEntry: number): Observable<any> {
  const body = { DocEntry: docEntry,
    U_DocDatedesde: "2024-01-16T16:43:50.3414569-05:00",
    U_DocDatehasta: "2024-01-16T16:43:50.3414569-22:41"
  };
  return this.http.post<any>('/api/TablasSinObjeto/ListarGetUdo', body);
}*/


obtenerDetalleOrden(docEntry: number): Observable<any> {
  // Ajusta la URL según la ruta de tu API para obtener detalles de la orden
  return this.http.post<any>(`api/TablasSinObjeto/ObtenerGetUdo?docentry=${docEntry}`, {UserCode:"THERNANDEZ", UserPassWord: "12456"});
}



eliminarOrden(DocEntry: number): Observable<any> {
  const url = `/api/TablasSinObjeto/ListarGetUdo/${DocEntry}`; // Reemplaza con la ruta correcta de tu API
  return this.http.delete(url);
 
}
/*
grabarOrdenTrabajo(Body: any): Observable<any> {
  const requestBody = {
    UserCode: "THERNANDEZ",
    UserPassWord: "12456",
    datos: Body
  };

  return this.http.post<any>('/api/TablasSinObjeto/GrabarOrdenTrabajo', requestBody);
}*/

/*
grabarOrdenTrabajo(datos: any): Observable<any> {
  const requestBody = {
    UserCode: "THERNANDEZ",
    UserPassWord: "12456",
    datos: datos
  };

  return this.http.post<any>('/api/TablasSinObjeto/GrabarOrdenTrabajo', requestBody).pipe(
    catchError(this.handleHttpError)
  );
}

private handleHttpError(error: HttpErrorResponse): Observable<never> {
  if (error.error instanceof ErrorEvent) {
    // Error del cliente
    console.error('Error del cliente:', error.error.message);
  } else {
    // El servidor devolvió un código de error
    console.error(`Código de error ${error.status}, ` + `mensaje: ${error.error}`);
  }
  // Devuelve un observable con un mensaje de error
  return throwError('Hubo un problema con la solicitud. Por favor, intenta nuevamente.');
}*/

/*
grabarOrdenTrabajo(Body: any): Observable<any> {
  return this.http.post<any>('/api/TablasSinObjeto/GrabarOrdenTrabajo',{
    UserCode: "THERNANDEZ",
    UserPassWord: "12456",
    datos: this.mapearDatos(Body)
  });


}*/

private mapearDatos(valoresFormulario: any): any {
  const mapeoPropiedades: Record<string, string> = {
    autorizadoPor: "U_PerAut",
    ciudad: "U_City",
    cliente: "U_CardCode",
    contrato: "U_OrdCom",
    direccion: "U_Address",
    estadoSeleccionado: "U_Status",
    fechaSeleccionada: "U_DocDate",
    fueraDeServicio: "U_FueSer",
    nombre: "U_CardName",
    ocOt: "U_DocNum",
    otroInput: "U_OrdCom",
    prioridadSeleccionada: "U_Prior",
    reportadoPor: "U_PerRep",
    seleccionAgente: "U_AgVent",
    seleccionCoordinador: "U_Coord",
    seleccionTecnico: "U_TecResp",
    seleccionarFormato: "U_NomSysOC",
    selectedFallos: "U_CodFall",
    selectedSeries: "U_Series",
    selectedSeriesInput: "U_SeriesInput",
    telefono: "U_Phone",
    textoDiagnostico: "U_ComTra",
    tipoTrabajo: "U_TipTra"
    // Agrega más propiedades según sea necesario
  };

  return Object.fromEntries(
    Object.entries(valoresFormulario).map(([clave, valor]) => [mapeoPropiedades[clave] || clave, valor])
  );
}

/*
grabarOrdenTrabajo(valoresFormulario: any): Observable<any> {
  const requestBody = {
    UserCode: "THERNANDEZ",
    UserPassWord: "12456",
    datos: this.mapearDatos(valoresFormulario)
  };

  const jsonString = JSON.stringify(requestBody);

  return this.http.post<any>('/api/TablasSinObjeto/GrabarOrdenTrabajo', jsonString, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}*/





}



