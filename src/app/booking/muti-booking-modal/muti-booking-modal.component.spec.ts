import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutiBookingModalComponent } from './muti-booking-modal.component';

describe('MutiBookingModalComponent', () => {
  let component: MutiBookingModalComponent;
  let fixture: ComponentFixture<MutiBookingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutiBookingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MutiBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
