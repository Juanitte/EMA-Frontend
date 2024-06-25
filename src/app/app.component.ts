import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'EMA';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit() {
    this.translate.use('es');
  }
  
}
