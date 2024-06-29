import { Component, OnDestroy, OnInit } from '@angular/core';
import { LangThemeSelectorComponent } from '../../components/shared/lang-theme-selector/lang-theme-selector.component';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { AppDataService } from '../../services/app-data.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RestoreComponent } from '../../components/login/restore/restore.component';

@Component({
  selector: 'app-restore-pass-page',
  standalone: true,
  imports: [LangThemeSelectorComponent, NgClass, TranslateModule, RestoreComponent],
  templateUrl: './restore-pass-page.component.html',
  styleUrl: './restore-pass-page.component.scss'
})
export class RestorePassPageComponent implements OnInit, OnDestroy {

  isLightMode: boolean = true

  modeUpdateSubscription: Subscription = Subscription.EMPTY
  
  constructor(private appData: AppDataService, private router: Router,
              private translate: TranslateService) { }

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
      this.translate.use('es');
    } else {
      this.translate.use('en');
    }

    this.modeUpdateSubscription =this.appData.modeUpdated$.subscribe(() => {
      if(this.appData.isLightMode) {
        this.isLightMode = true;
      } else {
        this.isLightMode = false;
      }
    });
    
    this.appData.languageUpdated$.subscribe(() => {
      if(this.appData.selectedLanguage === 'es') {
        this.translate.use('es');
      } else {
        this.translate.use('en');
      }
    });
  }

  /**
   * Called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.modeUpdateSubscription.unsubscribe();
  }

  /**
   * Navigates to the login page.
   */
  goBack() {
    this.router.navigate(['/login']);
  }
}
