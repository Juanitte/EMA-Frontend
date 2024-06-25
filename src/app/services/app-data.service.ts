import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  // Light and Dark mode.

  isLightMode: boolean = true;

  private modeUpdatedSource = new Subject<void>();

  modeUpdated$ = this.modeUpdatedSource.asObservable();

  /**
   * Trigger the mode update.
   */
  triggerModeUpdate() {
    this.modeUpdatedSource.next();
  }

  // Language.

  selectedLanguage: string = 'es';

  private languageUpdatedSource = new Subject<void>();

  languageUpdated$ = this.languageUpdatedSource.asObservable();

  /**
   * Trigger the language update.
   */
  triggerLanguageUpdate() {
    this.languageUpdatedSource.next();
  }

}
