import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeImageComponent } from './barcode-image.component';

describe('BarcodeImageComponent', () => {
  let component: BarcodeImageComponent;
  let fixture: ComponentFixture<BarcodeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
