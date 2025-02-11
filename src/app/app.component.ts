import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  [x: string]: any;
  products = [
    { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 100, image: 'https://media.istockphoto.com/id/1309352410/es/foto/hamburguesa-con-queso-con-tomate-y-lechuga-en-tabla-de-madera.jpg?s=612x612&w=0&k=20&c=HaSLXFFns4_IHfbvWY7_FX7tlccVjl0s0BrlqaLHOTE=' },
    { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 200, image: 'https://media.istockphoto.com/id/1448322070/es/foto/sabrosa-hamburguesa-fresca-en-mesa-de-madera.jpg?s=612x612&w=0&k=20&c=JrAb5GidOn0_mUEnsncdUQfmKwKtYC5p-JemGfpQN0w=' },
    { id: 3, name: 'Producto 3', description: 'Descripción 3', price: 300, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7q9bvvrqXPiLQ7GgISVx925JoUeXMe0u35g&s' },
    // Agrega más productos según sea necesario (mínimo 20 para probar la paginación)
    { id: 21, name: 'Producto 21', description: 'Descripción 21', price: 2100, image: 'https://s2.abcstatics.com/abc/sevilla/media/gurme/2024/09/19/s/receta-de-la-mejor-hamburguesa-del-mundo.jpg-khAC--1248x698@abc.jpg' },
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
