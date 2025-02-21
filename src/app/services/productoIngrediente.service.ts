import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoIngrediente } from 'src/assets/dto/ProductoIngrediente';

@Injectable({
  providedIn: 'root'
})
export class ProductoIngredienteService {

private origin = window.location.origin.includes("localhost") ? "https://lacachila-git-api-test-devtwp1-gmailcoms-projects.vercel.app" : window.location.origin;

private apiUrl = this.origin + "/api/productoIngrediente";

constructor(private http: HttpClient) { }

getProductoIngrediente():Observable<ProductoIngrediente[]>{
  
  return this.http.get<ProductoIngrediente[]>(this.apiUrl);
  
}

}
