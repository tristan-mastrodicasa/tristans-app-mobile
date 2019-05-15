import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersPage } from './followers.page';

describe('FollowersPage', () => {
  let component: FollowersPage;
  let fixture: ComponentFixture<FollowersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
