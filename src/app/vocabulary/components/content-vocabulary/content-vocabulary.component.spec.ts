import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentVocabularyComponent } from './content-vocabulary.component';

describe('ContentVocabularyComponent', () => {
  let component: ContentVocabularyComponent;
  let fixture: ComponentFixture<ContentVocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentVocabularyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
