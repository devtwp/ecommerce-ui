import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pedido-modal',
  templateUrl: './pedido-modal.component.html',
  styleUrls: ['./pedido-modal.component.css']
})
export class PedidoModalComponent implements OnInit {

  horarios: string[] = [];
  nombre:string = "";
  telefono:string= "";
  direccion:string = "";
  esEnvioDomicilio:boolean = false;
  pagoConTarjeta:boolean = true;
  horario:string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PedidoModalComponent>
  ) { }

  ngOnInit() {
    this.generarHorarios();
  }

  cerrarModal(){
    this.dialogRef.close();
  }

  generarHorarios() {
    this.horarios = [];
  
    const ahora = new Date();
    const tiempoEspera = this.esEnvioDomicilio ? 45 : 30; // Tiempo de espera en minutos
    ahora.setMinutes(ahora.getMinutes() + tiempoEspera);
  
    // Redondear los minutos al siguiente múltiplo de 15
    const minutosRedondeados = Math.ceil(ahora.getMinutes() / 15) * 15;
    ahora.setMinutes(minutosRedondeados);
    ahora.setSeconds(0);
    ahora.setMilliseconds(0);
  
    const inicio = new Date(ahora);
    const fin = new Date();
    fin.setHours(23, 59, 59); // Horario límite
  
    while (inicio <= fin) {
      const hora = inicio.getHours().toString().padStart(2, '0');
      const minutos = inicio.getMinutes().toString().padStart(2, '0');
      this.horarios.push(`${hora}:${minutos}`);
      inicio.setMinutes(inicio.getMinutes() + 15); // Incremento de 15 minutos
    }
    this.horarios.push("00:00");
  }

  cambiarTipoPedido(esEnvioDomicilio: boolean) {
    this.esEnvioDomicilio = esEnvioDomicilio;
    this.generarHorarios(); // Actualiza la lista de horarios
  }

  finalizarPedido(){
    console.log("A domicilio: " + this.esEnvioDomicilio, "horario: " + this.horario, "nombre: " + this.nombre, "telefono: " + this.telefono, "DIRECCION: " + this.direccion, "pago con tarjeta: " +  this.pagoConTarjeta)  
  };
}
