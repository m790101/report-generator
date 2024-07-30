import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDownloadComponent } from './icon-download.component';

describe('IconDownloadComponent', () => {
  let component: IconDownloadComponent;
  let fixture: ComponentFixture<IconDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
