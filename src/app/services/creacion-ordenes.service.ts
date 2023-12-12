import { HttpClient } from '@angular/common/http';
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
  



}



