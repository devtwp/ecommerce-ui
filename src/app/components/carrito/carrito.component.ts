import { Component, HostListener } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoEnCarrito } from 'src/assets/dto/Producto-en-carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {
  
  isCartOpen = false;
  productosEnCarrito: ProductoEnCarrito[] = [];  // Aquí guardamos los productos agregados al carrito
  sePuedeComprar:Boolean = false;
  
  constructor(private carritoService: CarritoService) {}
  
  // Función para agregar productos
  agregarProducto(producto: ProductoEnCarrito) {
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
    this.verificarHorario();
  }

  verificarHorario() {
    const ahora = new Date();
    const diaSemana = ahora.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const hora = ahora.getHours();

    // Verifica si es entre miércoles (3) y domingo (0) y entre las 19 y las 00 hs
    if ((diaSemana >= 3 || diaSemana === 0) && (hora >= 19 || hora < 0)) {
      this.sePuedeComprar = false;
    } else {
      this.sePuedeComprar = true;
    }
  }

  finalizarCompra(){
    console.log("COMPRA FINALIZADA");
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
