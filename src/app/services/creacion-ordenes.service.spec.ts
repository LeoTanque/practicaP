import { TestBed } from '@angular/core/testing';

import { CreacionOrdenesService } from './creacion-ordenes.service';

describe('CreacionOrdenesService', () => {
  let service: CreacionOrdenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreacionOrdenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
