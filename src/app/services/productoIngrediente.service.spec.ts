/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoIngredienteService } from './productoIngrediente.service';

describe('Service: ProductoIngrediente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoIngredienteService]
    });
  });

  it('should ...', inject([ProductoIngredienteService], (service: ProductoIngredienteService) => {
    expect(service).toBeTruthy();
  }));
});
