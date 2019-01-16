import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReleaseComponent } from './product-release.component';

describe('ProductReleaseComponent', () => {
  let component: ProductReleaseComponent;
  let fixture: ComponentFixture<ProductReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
