/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoPersonalizacionService } from './productoPersonalizacion.service';

describe('Service: ProductoPersonalizacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoPersonalizacionService]
    });
  });

  it('should ...', inject([ProductoPersonalizacionService], (service: ProductoPersonalizacionService) => {
    expect(service).toBeTruthy();
  }));
});
