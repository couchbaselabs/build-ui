import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionBuildsComponent } from './version-builds.component';

describe('VersionBuildsComponent', () => {
  let component: VersionBuildsComponent;
  let fixture: ComponentFixture<VersionBuildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionBuildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
