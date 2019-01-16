import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReleaseVersionComponent } from './product-release-version.component';

describe('ProductReleaseVersionComponent', () => {
  let component: ProductReleaseVersionComponent;
  let fixture: ComponentFixture<ProductReleaseVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReleaseVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReleaseVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
