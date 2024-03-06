import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodometrosComponent } from './codometros.component';

describe('CodometrosComponent', () => {
  let component: CodometrosComponent;
  let fixture: ComponentFixture<CodometrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodometrosComponent]
    });
    fixture = TestBed.createComponent(CodometrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
