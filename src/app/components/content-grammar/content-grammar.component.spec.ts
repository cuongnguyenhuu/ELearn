import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGrammarComponent } from './content-grammar.component';

describe('ContentGrammarComponent', () => {
  let component: ContentGrammarComponent;
  let fixture: ComponentFixture<ContentGrammarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentGrammarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
