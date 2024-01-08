import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}



