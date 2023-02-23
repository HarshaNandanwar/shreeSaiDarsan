import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBarcodeComponent } from './custom-barcode.component';

describe('CustomBarcodeComponent', () => {
  let component: CustomBarcodeComponent;
  let fixture: ComponentFixture<CustomBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomBarcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
