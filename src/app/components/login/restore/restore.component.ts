import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from '../../../services/app-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ElectronService } from '../../../services/electron.service';

@Component({
  selector: 'app-restore',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './restore.component.html',
  styleUrl: './restore.component.scss'
})
export class RestoreComponent implements OnInit , OnDestroy {

  isLightMode: boolean = true;
  isSecondStep: boolean = false;
  isFinalStep: boolean = false;

  modeUpdateSubscription: Subscription = Subscription.EMPTY;

  constructor(private appData: AppDataService, private router: Router,
              private translate: TranslateService, private electronService: ElectronService) { }

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
   * Sets a random code and sends it to the user by email.
   * Then gets the user to the second step.
   */
  goToSecondStep() {
    this.isSecondStep = true;
  }

  /**
   * Checks if the code is correct and gets the user to the final step if it is.
   */
  goToFinalStep() {
    this.isFinalStep = true;
    this.isSecondStep = false;
  }

  /**
   * Restores the password.
   */
  restorePassword() {
    this.isFinalStep = false;
  }
}
