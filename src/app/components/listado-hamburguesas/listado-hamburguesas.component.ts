import { Component, OnInit } from '@angular/core';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-listado-hamburguesas',
  templateUrl: './listado-hamburguesas.component.html',
  styleUrls: ['./listado-hamburguesas.component.css']
})

export class ListadoHamburguesasComponent{
  productosJson = [
    { nombre: 'Hamburguesa 1', precio: 10.99, imagen: 'https://www.clarin.com/2022/05/27/0HXb0UR0v_1256x620__2.jpg', descripcion: 'Doble hamburguesa de carne premium (240g) con queso cheddar americano, tocino, cebolla crispy y mayo secreta.' },
    { nombre: 'Hamburguesa 2', precio: 12.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqIvY_EddgWVLKNZD3S-xTjijRkfogKFxFkA&s', descripcion: 'ASAFDSA' },
    { nombre: 'Hamburguesa 3', precio: 19.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsTyKw7ht0CnSiwAoyRQxnO3Bpf0dN0xc0tseqB7tO3XrelX82uSg3jjFcUCjTbKU9d1g&usqp=CAU', descripcion: 'ASAFDSA' },
    { nombre: 'Hamburguesa 4', precio: 14.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP52-cKeg2nZ-UB1IlUHFG7zKomAdUdyfvhIsWj9e93Ta3BEVaStH5I7-Fuj7AnnFADXo&usqp=CAU', descripcion: 'ASAFDSA' },
    { nombre: 'Hamburguesa 5', precio: 11.49, imagen: 'https://www.lanacion.com.ar/resizer/v2/investigadores-evaluaron-las-principales-cadenas-FHBQ5XJM55H2PFSAFSC6HHESVQ.jpg?auth=c14fd6c0f7fd21e554cb59b5d69f7ee3551b78c00f500eb190a79ae39dc0ae80&width=420&height=280&quality=70&smart=true', descripcion: 'ASAFDSA' },
    { nombre: 'Hamburguesa 6', precio: 13.49, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqIvY_EddgWVLKNZD3S-xTjijRkfogKFxFkA&s', descripcion: 'ASAFDSA' },
    { nombre: 'Hamburguesa 7', precio: 15.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsTyKw7ht0CnSiwAoyRQxnO3Bpf0dN0xc0tseqB7tO3XrelX82uSg3jjFcUCjTbKU9d1g&usqp=CAU', descripcion: 'ASAFDSA' },
    { nombre: 'Hamburguesa 8', precio: 16.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP52-cKeg2nZ-UB1IlUHFG7zKomAdUdyfvhIsWj9e93Ta3BEVaStH5I7-Fuj7AnnFADXo&usqp=CAU', descripcion: 'ASAFDSA' },
    { nombre: 'Hamburguesa 9', precio: 18.99, imagen: 'https://www.lanacion.com.ar/resizer/v2/investigadores-evaluaron-las-principales-cadenas-FHBQ5XJM55H2PFSAFSC6HHESVQ.jpg?auth=c14fd6c0f7fd21e554cb59b5d69f7ee3551b78c00f500eb190a79ae39dc0ae80&width=420&height=280&quality=70&smart=true', descripcion: 'ASAFDSA' }
  ];

  productos: any[] = [];
  length = 9;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  modalProducto: any = null;
  cantidad: number = 1;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    /*this.productoService.getProductos(page, this.itemsPerPage).subscribe(
      (response: PaginatedResponse<any>) => {
        this.productos = response.items;
        this.currentPage = response.currentPage;
        this.totalItems = response.totalItems;
      },
      error => {
        console.error('Error al cargar productos', error);
      }
    );*/

    this.productos = this.productosJson.slice();
  }

  abrirModal(producto: any) {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  manejarAgregarAlCarrito(event: { producto: any, cantidad: number }) {
    console.log('Producto agregado al carrito:', event.producto, 'Cantidad:', event.cantidad);
    // Lógica para agregar al carrito
  }
}
