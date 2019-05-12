import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeCanvasIndexPage } from './meme-canvas-index.page';

describe('MemeCanvasIndexPage', () => {
  let component: MemeCanvasIndexPage;
  let fixture: ComponentFixture<MemeCanvasIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeCanvasIndexPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeCanvasIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
