import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSpacesComponent } from './submit-spaces.component';

describe('SubmitSpacesComponent', () => {
  let component: SubmitSpacesComponent;
  let fixture: ComponentFixture<SubmitSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitSpacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
