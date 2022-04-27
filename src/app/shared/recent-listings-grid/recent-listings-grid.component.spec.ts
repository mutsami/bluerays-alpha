import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentListingsGridComponent } from './recent-listings-grid.component';

describe('RecentListingsGridComponent', () => {
  let component: RecentListingsGridComponent;
  let fixture: ComponentFixture<RecentListingsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentListingsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentListingsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
