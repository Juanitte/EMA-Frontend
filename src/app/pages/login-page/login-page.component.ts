import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { LangThemeSelectorComponent } from '../../components/lang-theme-selector/lang-theme-selector.component';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { AppDataService } from '../../services/app-data.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    imports: [LangThemeSelectorComponent, LoginComponent, NgClass]
})
export class LoginPageComponent implements OnInit, OnDestroy {

    isLightMode: boolean = true

    modeUpdateSubscription: Subscription = Subscription.EMPTY;

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

    this.modeUpdateSubscription =this.appData.modeUpdated$.subscribe(() => {
      if(this.appData.isLightMode) {
        this.isLightMode = true;
      } else {
        this.isLightMode = false;
      }
    });
  }

  /**
   * Called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.modeUpdateSubscription.unsubscribe();
  }
}
