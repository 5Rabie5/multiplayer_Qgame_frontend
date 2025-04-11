import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

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
    FormsModule,
    TranslatePipe,
    // Add FormsModule here
  ],
})
export class LandingPageComponent implements OnInit {
  selectedLang: string = ''; // This variable will hold the selected language
  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'العربية' }
  ];

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    // Get the language from localStorage or use the browser's language
    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = this.languages.map(l => l.code);

    // Set the default language
    const defaultLang = savedLang || (supportedLangs.includes(browserLang) ? browserLang : 'en');

    this.translate.use(defaultLang); // Use the default language in the translate service
    localStorage.setItem('lang', defaultLang); // Save the language in localStorage
    this.selectedLang = defaultLang; // Set the selected language to the default language

    document.documentElement.lang = defaultLang; // Update the document language
    document.documentElement.dir = defaultLang === 'ar' ? 'rtl' : 'ltr'; // Set the direction (RTL or LTR)
  }

  changeLang(lang: string): void {
    this.translate.use(lang); // Change the language using the TranslateService
    localStorage.setItem('lang', lang); // Save the selected language in localStorage
    document.documentElement.lang = lang; // Update the document language

    // Set the direction (RTL or LTR) based on the selected language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
