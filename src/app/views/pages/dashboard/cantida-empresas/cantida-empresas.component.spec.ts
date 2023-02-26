import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidaEmpresasComponent } from './cantida-empresas.component';

describe('CantidaEmpresasComponent', () => {
  let component: CantidaEmpresasComponent;
  let fixture: ComponentFixture<CantidaEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantidaEmpresasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidaEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
