import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosEnCarritoSubject = new BehaviorSubject<any[]>([]);
  productosEnCarrito$ = this.productosEnCarritoSubject.asObservable();

  constructor() {}

  // Función para agregar un producto al carrito
  agregarProducto(producto: { nombre: string, precioTotal: number, ingredientesAgregados: any[], ingredientesEliminados: any[], imagen: string}) {
    const productos = this.productosEnCarritoSubject.getValue();
    productos.push(producto);
    this.productosEnCarritoSubject.next(productos);
  }

  // Función para eliminar un producto del carrito (eliminar solo la primera coincidencia)
  eliminarProducto(producto: { nombre: string, precioTotal: number }) {
    const productos = this.productosEnCarritoSubject.getValue();
    
    // Encontrar el índice del primer producto que coincida
    const index = productos.findIndex(p => p.nombre === producto.nombre && p.precioTotal === producto.precioTotal);
    
    if (index !== -1) {
      // Eliminar el producto en la posición encontrada
      productos.splice(index, 1);
      this.productosEnCarritoSubject.next(productos);  // Actualizar el carrito
    }
  }
}
