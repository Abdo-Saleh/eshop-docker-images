import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayingMethodsComponent } from './paying-methods.component';

describe('PayingMethodsComponent', () => {
  let component: PayingMethodsComponent;
  let fixture: ComponentFixture<PayingMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayingMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayingMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
