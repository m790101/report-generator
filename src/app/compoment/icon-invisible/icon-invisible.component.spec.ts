import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconInvisibleComponent } from './icon-invisible.component';

describe('IconInvisibleComponent', () => {
  let component: IconInvisibleComponent;
  let fixture: ComponentFixture<IconInvisibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconInvisibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconInvisibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
