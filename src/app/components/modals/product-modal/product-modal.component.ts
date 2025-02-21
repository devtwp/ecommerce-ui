import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarritoService } from 'src/app/services/carrito.service';

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

  cantidad:number = 1;

  // Listado de ingredientes
  listadoIngredientesTieneJSON = [
    { ingrediente: 'LISTA INGREDIENTES'},
    { ingrediente: 'LISTA INGREDIENTES'},
    { ingrediente: 'LISTA INGREDIENTES'},
    { ingrediente: 'LISTA INGREDIENTES'}
  ];
  listadoIngredientesAgregarJSON = [
    { ingrediente: 'LISTA INGREDIENTES', precio: 123 },
    { ingrediente: 'LISTA INGREDIENTES', precio: 123 },
    { ingrediente: 'LISTA INGREDIENTES', precio: 123 },
    { ingrediente: 'LISTA INGREDIENTES', precio: 123 }
  ];

  // LISTAS DE INGREDIENTES QUE TIENE Y SE PUEDE AGREGAR A LA HAMBURGUESA
  listadoIngredientesTiene: any[] = [];
  listadoIngredientesAgregar: any[] = [];


  // LISTAS DE INGREDIENTEES ELIMINADOS Y AGREGADOS
  listadoIngredientesAgregados: any[] = []
  listadoIngredientesEliminados: any[] = []

  agregar() {
    // Usamos el servicio para agregar el producto al carrito
    this.carritoService.agregarProducto({
      nombre: this.data.nombre,
      precioTotal: this.precioTotal,
      cantidad: this.cantidad,
      ingredientesEliminados: this.listadoIngredientesEliminados,
      ingredientesAgregados: this.listadoIngredientesAgregados,
      imagen: this.data.imagen
    });

    this.closeModal();  // Cierra el modal 
  }

  aumentarCantidad(){
    this.cantidad++;
    this.calcularPrecio()
  }
  
  disminuirCantidad(){
    if(this.cantidad > 1){
      this.cantidad--;
    }
    this.calcularPrecio()
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductModalComponent>,
    private carritoService: CarritoService
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


  calcularPrecio() {
    let diferencia:number = 0;
    this.listadoIngredientesAgregados.forEach(ingrediente => {
      diferencia += ingrediente.precio;
    });
    
    this.precioTotal = this.data.precio + diferencia;
    this.precioTotal = this.precioTotal * this.cantidad;
  }

  actualizarListadoSeleccionados(event: any) {
    const { ingrediente, seleccionado } = event;
    if (seleccionado) {
      // Agregar el ingrediente al listado
      this.listadoIngredientesAgregados.push(ingrediente);
    } else {
      // Eliminar el ingrediente del listado
      this.listadoIngredientesAgregados = this.listadoIngredientesAgregados.filter(i => i !== ingrediente);
    }
    this.calcularPrecio();
  }


  actualizarListadoEliminados(event: any) {
    const { ingrediente, seleccionado } = event;
    if (seleccionado) {
      // Agregar el ingrediente al listado
      this.listadoIngredientesEliminados.push(ingrediente);
    } else {
      // Eliminar el ingrediente del listado
      this.listadoIngredientesEliminados = this.listadoIngredientesEliminados.filter(i => i !== ingrediente);
    }
  }
}
