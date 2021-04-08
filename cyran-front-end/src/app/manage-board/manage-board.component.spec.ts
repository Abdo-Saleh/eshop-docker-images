import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoardComponent } from './manage-board.component';

describe('ManageBoardComponent', () => {
  let component: ManageBoardComponent;
  let fixture: ComponentFixture<ManageBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
