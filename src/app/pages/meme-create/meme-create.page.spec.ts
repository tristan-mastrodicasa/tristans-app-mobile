import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeCreatePage } from './meme-create.page';

describe('MemeCreatePage', () => {
  let component: MemeCreatePage;
  let fixture: ComponentFixture<MemeCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
