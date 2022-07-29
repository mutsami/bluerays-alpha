import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitHomesComponent } from './submit-homes.component';

describe('SubmitHomesComponent', () => {
  let component: SubmitHomesComponent;
  let fixture: ComponentFixture<SubmitHomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitHomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
