import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoventaComponent } from './coventa.component';

describe('CoventaComponent', () => {
  let component: CoventaComponent;
  let fixture: ComponentFixture<CoventaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoventaComponent]
    });
    fixture = TestBed.createComponent(CoventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
