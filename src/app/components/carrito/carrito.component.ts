import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoEnCarrito } from 'src/assets/dto/Producto-en-carrito';
import { PedidoModalComponent } from '../modals/pedido-modal/pedido-modal.component';
import { ProductCardCarritoComponent } from '../product-card-carrito/product-card-carrito.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {

  isCartOpen = false;
  productosEnCarrito: ProductoEnCarrito[] = [];  // Aquí guardamos los productos agregados al carrito
  sePuedeComprar: Boolean = false;
  precioTotal: number = 0;
  cantidad:number = 1;

  constructor(public dialog: MatDialog, private carritoService: CarritoService) { }

  abrirModal() {
    const dialogRef = this.dialog.open(PedidoModalComponent, {
      data: this.precioTotal
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  eliminarProducto(producto: { nombre: string, precioTotal: number }) {
    this.carritoService.eliminarProducto(producto);
    this.calcularTotal()
  }

  toggleCart(event: Event) {
    this.calcularTotal()
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
    if ((diaSemana >= 3 || diaSemana === 0) || (hora >= 19 || hora < 0)) {
      this.sePuedeComprar = false;
    } else {
      this.sePuedeComprar = true;
    }
  }

  finalizarCompra(event: Event) {
    this.toggleCart(event);
    this.abrirModal();
  }

  @HostListener('document:click', ['$event'])
  closeCart(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#cart-container') && this.isCartOpen) {
      this.isCartOpen = false;
    }
  }

  calcularTotal() {
    this.precioTotal = this.productosEnCarrito.reduce((total, producto) => total + producto.precioTotal, 0);
  }

  aumentar(){
    this.cantidad++;
  }
  
  disminuir(){
    if(this.cantidad>1){
      this.cantidad--;
    }
  }

}
