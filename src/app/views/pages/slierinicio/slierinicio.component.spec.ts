import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlierinicioComponent } from './slierinicio.component';

describe('SlierinicioComponent', () => {
  let component: SlierinicioComponent;
  let fixture: ComponentFixture<SlierinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlierinicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlierinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
