import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenmodalComponent } from './openmodal.component';

describe('OpenmodalComponent', () => {
  let component: OpenmodalComponent;
  let fixture: ComponentFixture<OpenmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
