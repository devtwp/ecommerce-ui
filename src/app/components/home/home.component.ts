import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { PageEvent } from '@angular/material/paginator';

interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productosJson = [
    { nombre: 'Hamburguesa 1', precio: 10.99, imagen: 'https://www.clarin.com/2022/05/27/0HXb0UR0v_1256x620__2.jpg' },
    { nombre: 'Hamburguesa 2', precio: 12.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqIvY_EddgWVLKNZD3S-xTjijRkfogKFxFkA&s' },
    { nombre: 'Hamburguesa 3', precio: 19.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsTyKw7ht0CnSiwAoyRQxnO3Bpf0dN0xc0tseqB7tO3XrelX82uSg3jjFcUCjTbKU9d1g&usqp=CAU' },
    { nombre: 'Hamburguesa 4', precio: 14.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP52-cKeg2nZ-UB1IlUHFG7zKomAdUdyfvhIsWj9e93Ta3BEVaStH5I7-Fuj7AnnFADXo&usqp=CAU' },
    { nombre: 'Hamburguesa 5', precio: 11.49, imagen: 'https://www.lanacion.com.ar/resizer/v2/investigadores-evaluaron-las-principales-cadenas-FHBQ5XJM55H2PFSAFSC6HHESVQ.jpg?auth=c14fd6c0f7fd21e554cb59b5d69f7ee3551b78c00f500eb190a79ae39dc0ae80&width=420&height=280&quality=70&smart=true' },
    { nombre: 'Hamburguesa 6', precio: 13.49, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqIvY_EddgWVLKNZD3S-xTjijRkfogKFxFkA&s' },
    { nombre: 'Hamburguesa 7', precio: 15.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsTyKw7ht0CnSiwAoyRQxnO3Bpf0dN0xc0tseqB7tO3XrelX82uSg3jjFcUCjTbKU9d1g&usqp=CAU' },
    { nombre: 'Hamburguesa 8', precio: 16.99, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP52-cKeg2nZ-UB1IlUHFG7zKomAdUdyfvhIsWj9e93Ta3BEVaStH5I7-Fuj7AnnFADXo&usqp=CAU' },
    { nombre: 'Hamburguesa 9', precio: 18.99, imagen: 'https://www.lanacion.com.ar/resizer/v2/investigadores-evaluaron-las-principales-cadenas-FHBQ5XJM55H2PFSAFSC6HHESVQ.jpg?auth=c14fd6c0f7fd21e554cb59b5d69f7ee3551b78c00f500eb190a79ae39dc0ae80&width=420&height=280&quality=70&smart=true' }
  ];

  productos: any[] = [];
  length = 9;
  pageSize = 4;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;
  modalProducto: any = null;
  cantidad: number = 1;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.cargarProductos(this.pageIndex + 1, this.pageSize);
  }

  cargarProductos(page: number, pageSize: number) {
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

    this.productos = this.productosJson.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.cargarProductos(e.pageIndex + 1, e.pageSize);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
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
