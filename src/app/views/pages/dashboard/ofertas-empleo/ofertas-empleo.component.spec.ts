import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasEmpleoComponent } from './ofertas-empleo.component';

describe('OfertasEmpleoComponent', () => {
  let component: OfertasEmpleoComponent;
  let fixture: ComponentFixture<OfertasEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasEmpleoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertasEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
