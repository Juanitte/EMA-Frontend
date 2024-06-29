import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangThemeSelectorComponent } from './lang-theme-selector.component';

describe('LangThemeSelectorComponent', () => {
  let component: LangThemeSelectorComponent;
  let fixture: ComponentFixture<LangThemeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangThemeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangThemeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
