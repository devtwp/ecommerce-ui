import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/assets/dto/Producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = `${window.location.origin}/api/producto`; // URL de la API en Vercel

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

}
