import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsGeneralComponent } from './teams-general.component';

describe('TeamsGeneralComponent', () => {
  let component: TeamsGeneralComponent;
  let fixture: ComponentFixture<TeamsGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsGeneralComponent]
    });
    fixture = TestBed.createComponent(TeamsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
