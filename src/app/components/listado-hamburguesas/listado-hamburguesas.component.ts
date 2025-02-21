import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/assets/dto/Producto';


@Component({
  selector: 'app-listado-hamburguesas',
  templateUrl: './listado-hamburguesas.component.html',
  styleUrls: ['./listado-hamburguesas.component.css']
})

export class ListadoHamburguesasComponent {
  productosJson: Producto[] = [];

  productos: Producto[] = [];
  length = 9;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  loading = false;

  modalProducto: any = null;
  cantidad: number = 1;

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    // MUESTRA EL ESTADO DE CARGA
    this.loading = true;

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
          // ELIMINA EL ESTADO DE CARGA
          this.loading = false;
        }
     
      }
    );

    this.productos = this.productosJson.slice();
  }

  manejarAgregarAlCarrito(event: { producto: Producto, cantidad: number }) {
    console.log('Producto agregado al carrito:', event.producto, 'Cantidad:', event.cantidad);
    // Lógica para agregar al carrito
  }
}
