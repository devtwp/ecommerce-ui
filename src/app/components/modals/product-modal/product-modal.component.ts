import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductModalComponent>) { }

  @Output() agregarAlCarrito = new EventEmitter<{ producto: any, cantidad: number }>();

  closeModal(): void {
    this.dialogRef.close();
  }

  agregar() {
    this.agregarAlCarrito.emit({ producto: this.data, cantidad: this.data.cantidad });
    this.closeModal();  // Cerrar el modal al agregar al carrito
  }
}