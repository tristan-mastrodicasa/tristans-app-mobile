import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUsersPage } from './find-users.page';

describe('FindUsersPage', () => {
  let component: FindUsersPage;
  let fixture: ComponentFixture<FindUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
