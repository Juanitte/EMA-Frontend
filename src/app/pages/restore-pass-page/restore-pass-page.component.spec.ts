import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePassPageComponent } from './restore-pass-page.component';

describe('RestorePassPageComponent', () => {
  let component: RestorePassPageComponent;
  let fixture: ComponentFixture<RestorePassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestorePassPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestorePassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
