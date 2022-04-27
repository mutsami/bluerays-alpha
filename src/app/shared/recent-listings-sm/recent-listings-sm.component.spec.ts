import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentListingsSmComponent } from './recent-listings-sm.component';

describe('RecentListingsSmComponent', () => {
  let component: RecentListingsSmComponent;
  let fixture: ComponentFixture<RecentListingsSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentListingsSmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentListingsSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
