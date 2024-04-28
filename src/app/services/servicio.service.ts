import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  apiUrl = enviroment.apiUrl;

  constructor(private http:HttpClient) { }


  obtenerClientes():Observable<any>{
    return this.http.get<any>('/api/Clientes?company=**BasedePruebas**');
    }

   
  

} 
