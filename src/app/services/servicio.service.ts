import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    obtenerArticulos1(): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      const body = {
        WhsCode: 'ALM01',
        PriceList: 1,
        Company: '**BasedePruebas**'
      };
  
  
      return this.http.post<any>('/api/Articulos', body, { headers });
    }


    obtenerArticulos(priceList: number): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      const body = {
        WhsCode: 'ALM01',
        PriceList: priceList, // Utiliza el valor recibido como parámetro
        Company: '**BasedePruebas**'
      };
  
      return this.http.post<any>('/api/Articulos', body, { headers });
    }
  

} 
