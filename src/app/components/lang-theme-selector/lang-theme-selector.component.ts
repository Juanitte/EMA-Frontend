import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataService } from '../../services/app-data.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-theme-selector',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './lang-theme-selector.component.html',
  styleUrl: './lang-theme-selector.component.scss'
})
export class LangThemeSelectorComponent implements OnInit, OnDestroy {

  isLightMode: boolean = true;
  language: string = 'es';

  modeUpdateSubscription: Subscription = Subscription.EMPTY;
  languageUpdateSubscription: Subscription = Subscription.EMPTY;

  constructor(private appData: AppDataService) { }

  /**
   * Called when the component is initialized.
   */
  ngOnInit(): void {
    if(this.appData.isLightMode) {
      this.isLightMode = true;
    } else {
      this.isLightMode = false;
    }

    if(this.appData.selectedLanguage === 'es') {
      this.language = 'es';
    } else {
      this.language = 'en';
    }

    this.modeUpdateSubscription =this.appData.modeUpdated$.subscribe(() => {
      if(this.appData.isLightMode) {
        this.isLightMode = true;
      } else {
        this.isLightMode = false;
      }
    });

    this.languageUpdateSubscription =this.appData.languageUpdated$.subscribe(() => {
      if(this.appData.selectedLanguage === 'es') {
        this.language = 'es';
      } else {
        this.language = 'en';
      }
    });
  }

  /**
   * Sets the light mode.
   */
  setLightMode() {
    this.appData.isLightMode = true;
    this.appData.triggerModeUpdate();
  }

  /**
   * Sets the dark mode.
   */
  setDarkMode() {
    this.appData.isLightMode = false;
    this.appData.triggerModeUpdate();
  }

  /**
   * Sets the Spanish language.
   */
  setSpanish() {
    this.appData.selectedLanguage = 'es';
    this.appData.triggerLanguageUpdate();
  }

  /**
   * Sets the English language.
   */
  setEnglish() {
    this.appData.selectedLanguage = 'en';
    this.appData.triggerLanguageUpdate();
  }

  /**
   * Called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.modeUpdateSubscription.unsubscribe();
    this.languageUpdateSubscription.unsubscribe();
  }
}
