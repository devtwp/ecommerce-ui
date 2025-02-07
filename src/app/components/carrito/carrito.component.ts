import { Component, HostListener } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {
  
  isCartOpen = false;
  productosEnCarrito: any[] = [];  // Aquí guardamos los productos agregados al carrito
  
  constructor(private carritoService: CarritoService) {}
  
  // Función para agregar productos
  agregarProducto(producto: any) {
    this.productosEnCarrito.push(producto);
    console.log('Producto agregado:', producto);
    console.log('Carrito:', this.productosEnCarrito);
  }
  
  eliminarProducto(producto: { nombre: string, precioTotal: number }) {
    this.carritoService.eliminarProducto(producto);
  }

  toggleCart(event: Event) {
    event.stopPropagation(); // Evita que el clic cierre el carrito inmediatamente
    this.isCartOpen = !this.isCartOpen;
  }
  ngOnInit() {
    // Nos suscribimos a los cambios del carrito
    this.carritoService.productosEnCarrito$.subscribe(productos => {
      this.productosEnCarrito = productos;
    });
  }
  @HostListener('document:click', ['$event'])
  closeCart(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#cart-container') && this.isCartOpen) {
      this.isCartOpen = false;
    }
  }

  calcularTotal(): number {
    return this.productosEnCarrito.reduce((total, producto) => total + producto.precioTotal, 0);
  }


}
