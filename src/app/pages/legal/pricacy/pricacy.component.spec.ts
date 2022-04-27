import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricacyComponent } from './pricacy.component';

describe('PricacyComponent', () => {
  let component: PricacyComponent;
  let fixture: ComponentFixture<PricacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
