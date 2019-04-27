import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunnityComponent } from './communnity.component';

describe('CommunnityComponent', () => {
  let component: CommunnityComponent;
  let fixture: ComponentFixture<CommunnityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunnityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
