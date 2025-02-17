import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductoEnCarrito } from 'src/assets/dto/Producto-en-carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosEnCarritoSubject = new BehaviorSubject<any[]>(this.obtenerCarritoDesdeLocalStorage());
  productosEnCarrito$ = this.productosEnCarritoSubject.asObservable();

  constructor() { }

  // Función para agregar un producto al carrito
  agregarProducto(producto:ProductoEnCarrito) {
    const productos = this.productosEnCarritoSubject.getValue();
    productos.push(producto);
    this.actualizarCarrito(productos)
  }

  // Función para eliminar un producto del carrito (eliminar solo la primera coincidencia)
  eliminarProducto(producto: { nombre: string, precioTotal: number }) {
    const productos = this.productosEnCarritoSubject.getValue();

    // Encontrar el índice del primer producto que coincida
    const index = productos.findIndex(p => p.nombre === producto.nombre && p.precioTotal === producto.precioTotal);

    if (index !== -1) {
      // Eliminar el producto en la posición encontrada
      productos.splice(index, 1);
      this.actualizarCarrito(productos)
    }
  }

  // Función para actualizar el carrito en localStorage
  private actualizarCarrito(productos: ProductoEnCarrito[]) {
    localStorage.setItem('carrito', JSON.stringify(productos));
    this.productosEnCarritoSubject.next(productos);
  }

  // Función para obtener el carrito desde localStorage
  private obtenerCarritoDesdeLocalStorage(): ProductoEnCarrito[] {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }
}
