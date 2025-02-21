import { Component, Input } from '@angular/core';
import { ProductoEnCarrito } from 'src/assets/dto/Producto-en-carrito';

@Component({
  selector: 'app-product-card-carrito',
  templateUrl: './product-card-carrito.component.html',
  styleUrls: ['./product-card-carrito.component.css']
})

export class ProductCardCarritoComponent{
  @Input() 
  producto!: ProductoEnCarrito;

  cantidad = 1;
  constructor(){};


  disminuir(){
    if(this.cantidad>1){
      this.cantidad--;
    }
  }

  aumentar(){
    this.cantidad++;
  }

  eliminarProducto(producto: ProductoEnCarrito){
    
  }
}
