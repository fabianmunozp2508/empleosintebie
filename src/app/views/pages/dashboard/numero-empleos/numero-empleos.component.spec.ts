import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroEmpleosComponent } from './numero-empleos.component';

describe('NumeroEmpleosComponent', () => {
  let component: NumeroEmpleosComponent;
  let fixture: ComponentFixture<NumeroEmpleosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeroEmpleosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumeroEmpleosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
