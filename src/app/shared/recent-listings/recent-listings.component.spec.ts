import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentListingsComponent } from './recent-listings.component';

describe('RecentListingsComponent', () => {
  let component: RecentListingsComponent;
  let fixture: ComponentFixture<RecentListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
