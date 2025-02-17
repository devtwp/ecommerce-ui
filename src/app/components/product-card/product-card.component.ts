import { Component, Input } from '@angular/core';
import { Producto } from 'src/assets/dto/Producto';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() 
  producto!: Producto;
}
