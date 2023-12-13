import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelHeaderComponent } from './channel-header.component';

describe('ChannelHeaderComponent', () => {
  let component: ChannelHeaderComponent;
  let fixture: ComponentFixture<ChannelHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelHeaderComponent]
    });
    fixture = TestBed.createComponent(ChannelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
