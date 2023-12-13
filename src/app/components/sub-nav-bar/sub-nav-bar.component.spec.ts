import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNavBarComponent } from './sub-nav-bar.component';

describe('SubNavBarComponent', () => {
  let component: SubNavBarComponent;
  let fixture: ComponentFixture<SubNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubNavBarComponent]
    });
    fixture = TestBed.createComponent(SubNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
