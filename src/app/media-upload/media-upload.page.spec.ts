import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUploadPage } from './media-upload.page';

describe('MediaUploadPage', () => {
  let component: MediaUploadPage;
  let fixture: ComponentFixture<MediaUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaUploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
