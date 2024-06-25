import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit , OnDestroy {

  isLightMode: boolean = true;

  modeUpdateSubscription: Subscription = Subscription.EMPTY;

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
   * Navigates to the signup page.
   */
  goToSignUp() {
    this.router.navigate(['/signup']);
  }

}
