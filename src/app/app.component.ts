import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  products = [
    { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', description: 'Descripción 3', price: 300, image: 'https://via.placeholder.com/150' },
    // Agrega más productos según sea necesario (mínimo 20 para probar la paginación)
    { id: 21, name: 'Producto 21', description: 'Descripción 21', price: 2100, image: 'https://via.placeholder.com/150' },
  ];

  paginatedProducts: any[] = []; // Productos mostrados en la página actual
  currentPage = 1;
  itemsPerPage = 10; // Productos por página
  totalPages = 0;

  ngOnInit(): void {
    this.calculatePagination();
  }

  calculatePagination() {
    // Calcula el total de páginas
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);

    // Obtiene los productos para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.calculatePagination();
    }
  }
}
