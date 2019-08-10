import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasFocusPage } from './canvas-focus.page';

describe('CanvasFocusPage', () => {
  let component: CanvasFocusPage;
  let fixture: ComponentFixture<CanvasFocusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasFocusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasFocusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
