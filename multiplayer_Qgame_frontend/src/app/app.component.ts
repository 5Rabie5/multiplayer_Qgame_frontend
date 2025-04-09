import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // ✅ تأكد من هذا السطر
import { MATERIAL_MODULES } from './shared/material';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  // ✅ أضف RouterOutlet هنا إذا لم يكن موجود
  imports: [CommonModule, RouterOutlet, ...MATERIAL_MODULES],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private dir: Directionality
  ) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(savedLang);
    this.setLanguageDirection(savedLang);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.setLanguageDirection(lang);
  }

  private setLanguageDirection(lang: string) {
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
    this.dir.change.emit(direction as 'rtl' | 'ltr');
  }
}
