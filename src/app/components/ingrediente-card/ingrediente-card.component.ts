import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ingrediente-card',
  templateUrl: './ingrediente-card.component.html',
  styleUrls: ['./ingrediente-card.component.css']
})
export class IngredienteCardComponent implements OnInit {
  actualizarPrecio() {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  
  @Input() ingrediente: any;

  ngOnInit() {
  }


  @Output() cambioSeleccion = new EventEmitter<any>();  // Emite cuando el checkbox cambia

  seleccionado: boolean = false;  // Estado del checkbox

  onCheckboxChange() {
    this.seleccionado = !this.seleccionado;
    this.cambioSeleccion.emit({ ingrediente: this.ingrediente, seleccionado: this.seleccionado });
  }
}
