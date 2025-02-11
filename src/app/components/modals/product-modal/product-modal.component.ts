import { Component, Input, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredienteCardComponent } from '../../ingrediente-card/ingrediente-card.component';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  // Inicializa la propiedad ingrediente correctamente
  @Input() ingrediente: any;

  // Inicializa el precioTotal después de que se reciba el ingrediente
  precioTotal: number = 0;

  // Listado de ingredientes
  listadoIngredientesTieneJSON = [
    { 'ingrediente': 'LISTA INGREDIENTES'}
  ];
  listadoIngredientesAgregarJSON = [
    { 'ingrediente': 'LISTA INGREDIENTES', 'precio': 123 },
    { 'ingrediente': 'LISTA INGREDIENTES', 'precio': 123 },
    { 'ingrediente': 'LISTA INGREDIENTES', 'precio': 123 },
    { 'ingrediente': 'LISTA INGREDIENTES', 'precio': 123 }
  ];

  listadoIngredientesTiene: any[] = [];
  listadoIngredientesAgregar: any[] = [];

  // Emitir el evento para agregar al carrito
  @Output() agregarAlCarrito = new EventEmitter<{ producto: any, cantidad: number }>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductModalComponent>
  ) { }

  // Establecer precioTotal en ngOnInit para asegurarnos de que ingrediente esté disponible
  ngOnInit(): void {
    this.precioTotal = this.data.precio;
    this.cargarIngredientesAgregar();
    this.cargarIngredientesTiene();
  }

  cargarIngredientesTiene() {
    this.listadoIngredientesTiene = this.listadoIngredientesTieneJSON.slice();
  }

  cargarIngredientesAgregar() {
    this.listadoIngredientesAgregar = this.listadoIngredientesAgregarJSON.slice();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  agregar() {
    this.agregarAlCarrito.emit({ producto: this.data, cantidad: this.data.cantidad });
    this.closeModal();  // Cerrar el modal al agregar al carrito
  }

  calcularPrecio() {
    let diferencia:number = 0;
    this.listadoElementosAgregados.forEach(ingrediente => {
      diferencia += ingrediente.precio;
    });
    
    this.precioTotal = this.data.precio + diferencia; 
  }

  listadoElementosAgregados: any[] = []
  listadoElementosEliminados: any[] = []

  actualizarListadoSeleccionados(event: any) {
    const { ingrediente, seleccionado } = event;
    if (seleccionado) {
      // Agregar el ingrediente al listado
      this.listadoElementosAgregados.push(ingrediente);
    } else {
      // Eliminar el ingrediente del listado
      this.listadoElementosAgregados = this.listadoElementosAgregados.filter(i => i !== ingrediente);
    }
    this.calcularPrecio();
  }


  actualizarListadoEliminados(event: any) {
    const { ingrediente, seleccionado } = event;
    if (seleccionado) {
      // Agregar el ingrediente al listado
      this.listadoElementosEliminados.push(ingrediente);
    } else {
      // Eliminar el ingrediente del listado
      this.listadoElementosEliminados = this.listadoElementosEliminados.filter(i => i !== ingrediente);
    }
  }
}
