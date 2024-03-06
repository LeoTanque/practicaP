import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresComponent } from './progres.component';

describe('ProgresComponent', () => {
  let component: ProgresComponent;
  let fixture: ComponentFixture<ProgresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgresComponent]
    });
    fixture = TestBed.createComponent(ProgresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
