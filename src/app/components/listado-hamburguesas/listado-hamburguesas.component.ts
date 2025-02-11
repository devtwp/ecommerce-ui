import { Component, OnInit } from '@angular/core';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/assets/dto/Producto';


@Component({
  selector: 'app-listado-hamburguesas',
  templateUrl: './listado-hamburguesas.component.html',
  styleUrls: ['./listado-hamburguesas.component.css']
})

export class ListadoHamburguesasComponent {
  productosJson: Producto[] = [];

  productos: any[] = [];
  length = 9;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  modalProducto: any = null;
  cantidad: number = 1;

  constructor(public dialog: MatDialog, private productoService: ProductoService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {

    this.productoService.getProductos(/*page, this.itemsPerPage*/).subscribe({
      /*(response: PaginatedResponse<any>) => {
        this.productos = response.items;
        this.currentPage = response.currentPage;
        this.totalItems = response.totalItems;
        (res: any) => { console.log(res), this.productosJson = res },
      (error: any) => {
        console.error('Error al cargar productos', error);
      }
      }*/ 
        next: (productos) => {
          console.log(productos); 
          this.productos = productos;
        },
        error: (error) => {
          console.error('Error al cargar productos', error);
        },
        complete: () => {
          console.log('Complete');
        }
     
      }
    );

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
