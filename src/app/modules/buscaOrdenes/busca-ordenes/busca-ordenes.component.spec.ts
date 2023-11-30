import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaOrdenesComponent } from './busca-ordenes.component';

describe('BuscaOrdenesComponent', () => {
  let component: BuscaOrdenesComponent;
  let fixture: ComponentFixture<BuscaOrdenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscaOrdenesComponent]
    });
    fixture = TestBed.createComponent(BuscaOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
