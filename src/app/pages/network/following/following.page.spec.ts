import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingPage } from './following.page';

describe('FollowingPage', () => {
  let component: FollowingPage;
  let fixture: ComponentFixture<FollowingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
