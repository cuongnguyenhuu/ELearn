import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCommunityComponent } from './content-community.component';

describe('ContentCommunityComponent', () => {
  let component: ContentCommunityComponent;
  let fixture: ComponentFixture<ContentCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
