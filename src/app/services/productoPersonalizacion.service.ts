import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoPersonalizacion } from 'src/assets/dto/ProductoPersonalizacion';

@Injectable({
  providedIn: 'root'
})
export class ProductoPersonalizacionService {

private origin = window.location.origin.includes("localhost") ? "https://lacachila-git-api-test-devtwp1-gmailcoms-projects.vercel.app" : window.location.origin

private apiUrl = this.origin + "/api/productoPersonalizacion";


constructor(private http: HttpClient) { }


getProductoPersonalizacion():Observable<ProductoPersonalizacion[]>{
  
  return this.http.get<ProductoPersonalizacion[]>(this.apiUrl);

}
}
