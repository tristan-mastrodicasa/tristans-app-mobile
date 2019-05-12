import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeFocusPage } from './meme-focus.page';

describe('MemeFocusPage', () => {
  let component: MemeFocusPage;
  let fixture: ComponentFixture<MemeFocusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeFocusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeFocusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
