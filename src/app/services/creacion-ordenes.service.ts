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
/*
traerCotizaciones1(params: { cardcode: string, userCode: string, userPassWord: string }): Observable<any> {
  return this.http.post<any>('/api/TablasSinObjeto/ListarCotizacion', params);
}*/


traerCotizaciones1(cardcode: string): Observable<any> {
  const params = new HttpParams().set('cardcode', cardcode);
  return this.http.post<any>('/api/TablasSinObjeto/ListarCotizacion', { UserCode: 'THERNANDEZ', UserPassWord: '12456' }, { params });
}

/*
traerCotizaciones():Observable<any>{
  return this.http.post<any>('/api/TablasSinObjeto/ListarCotizacion?cardcode=CLN00099', {UserCode:"THERNANDEZ", UserPassWord: "12456"} )
}*/

}



