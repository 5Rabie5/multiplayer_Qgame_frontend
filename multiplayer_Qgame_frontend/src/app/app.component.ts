import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from './shared/material';
import { RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-root',
    styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, MATERIAL_MODULES],
  template: `<router-outlet></router-outlet>`,

})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
