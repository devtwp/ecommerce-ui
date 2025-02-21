import { Component, Input } from '@angular/core';
import { Producto } from 'src/assets/dto/Producto';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() 
  producto!: Producto;

  cantidad = 1;
  constructor(public dialog: MatDialog){};

  abrirModal(producto: Producto) {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      maxWidth: '100%',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  disminuir(event: Event){
    event.stopPropagation();
    this.cantidad--;
  }

  aumentar(event: Event){
    event.stopPropagation();
    this.cantidad++;
  }
}
