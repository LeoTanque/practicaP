import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioComponent } from './socio.component';

describe('SocioComponent', () => {
  let component: SocioComponent;
  let fixture: ComponentFixture<SocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocioComponent]
    });
    fixture = TestBed.createComponent(SocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
