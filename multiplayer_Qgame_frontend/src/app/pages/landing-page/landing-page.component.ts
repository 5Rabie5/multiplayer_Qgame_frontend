import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    TranslatePipe
  ],
})
export class LandingPageComponent implements OnInit {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'العربية' }
  ];

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = this.languages.map(l => l.code);
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
    this.translate.use(defaultLang);
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
  }
}
