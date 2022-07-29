import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditpageComponent } from './blog-editpage.component';

describe('BlogEditpageComponent', () => {
  let component: BlogEditpageComponent;
  let fixture: ComponentFixture<BlogEditpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogEditpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
