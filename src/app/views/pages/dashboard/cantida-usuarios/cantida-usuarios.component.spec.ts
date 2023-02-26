import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidaUsuariosComponent } from './cantida-usuarios.component';

describe('CantidaUsuariosComponent', () => {
  let component: CantidaUsuariosComponent;
  let fixture: ComponentFixture<CantidaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantidaUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
