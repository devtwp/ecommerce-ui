import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingrediente } from 'src/assets/dto/Ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private origin = window.location.origin.includes("localhost") ? "https://lacachila-git-api-test-devtwp1-gmailcoms-projects.vercel.app" : window.location.origin;

  private apiUrl = this.origin + `/api/ingrediente`; // URL de la API en Vercel

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl)
  }
}
