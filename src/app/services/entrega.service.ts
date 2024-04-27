import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {
  apiUrl = enviroment.apiUrl
  
  constructor(private http: HttpClient) { }
 

  datosDeEntrega(serie:any, Folio:any):Observable<any>{
    return this.http.get<any>(`/api/OrdenesTrabajo/ObtenerSerie?serie=${serie}&Folio=${Folio}`)
    }

    datosDeEntrega1():Observable<any>{
      return this.http.get<any>(`/api/OrdenesTrabajo/ObtenerSerie?serie=HMO&Folio=1028830`)
      }

}
