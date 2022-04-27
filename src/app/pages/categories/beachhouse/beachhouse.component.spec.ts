import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachhouseComponent } from './beachhouse.component';

describe('BeachhouseComponent', () => {
  let component: BeachhouseComponent;
  let fixture: ComponentFixture<BeachhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeachhouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeachhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
