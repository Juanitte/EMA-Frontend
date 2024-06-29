import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgClass} from '@angular/common';
import { AppDataService } from '../../../services/app-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangThemeSelectorComponent } from '../lang-theme-selector/lang-theme-selector.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, TranslateModule, LangThemeSelectorComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit , OnDestroy {

  isLightMode: boolean = true;

  modeUpdateSubscription: Subscription = Subscription.EMPTY;

  constructor(private appData: AppDataService, private router: Router,
              private translate: TranslateService) { }

  /**
   * Called when the component is initialized.
   */
  ngOnInit(): void {
    this.modeUpdateSubscription =this.appData.modeUpdated$.subscribe(() => {
      if(this.appData.isLightMode) {
        this.isLightMode = true;
      } else {
        this.isLightMode = false;
      }
    });
  }

  /**
   * Toggles between light and dark mode.
   */
  toggleMode() {
    this.appData.isLightMode = !this.appData.isLightMode;
    this.appData.triggerModeUpdate();
  }

  /**
   * Called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.modeUpdateSubscription.unsubscribe();
  }

}
