import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienMenuComponent } from './technicien-menu.component';

describe('AdminMenuComponent', () => {
  let component: TechnicienMenuComponent;
  let fixture: ComponentFixture<TechnicienMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicienMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicienMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
