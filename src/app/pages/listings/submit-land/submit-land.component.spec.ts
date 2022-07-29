import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLandComponent } from './submit-land.component';

describe('SubmitLandComponent', () => {
  let component: SubmitLandComponent;
  let fixture: ComponentFixture<SubmitLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
