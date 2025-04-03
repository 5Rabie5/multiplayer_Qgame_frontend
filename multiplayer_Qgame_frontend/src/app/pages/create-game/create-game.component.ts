import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatCheckboxModule
} from '@angular/material/checkbox';
import {
  MatRadioModule
} from '@angular/material/radio';
import {
  MatButtonModule
} from '@angular/material/button';

@Component({
  selector: 'app-create-game',
  standalone: true,
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    TranslatePipe
  ]
})
export class CreateGameComponent {
  pointsOptions = [100, 200, 500, 1000, 'Unlimited'];
  playerCounts = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Unlimited'];
  difficulties = ['Easy', 'Medium', 'Hard'];
  selectedCategories: string[] = [];
  categories: string[] = [];

  constructor(public translate: TranslateService) {
    this.loadCategories(translate.currentLang);

    // When language changes → reload categories
    this.translate.onLangChange.subscribe(lang => {
      this.loadCategories(lang.lang);
    });
  }

  loadCategories(lang: string) {
    const categoryMap: { [key: string]: string[] } = {
      en: ['General', 'Science', 'Sports', 'History', 'Music'],
      ar: ['عام', 'علوم', 'رياضة', 'تاريخ', 'فنون', 'أدب'],
      de: ['Allgemein', 'Wissenschaft', 'Sport', 'Geschichte']
    };

    this.categories = categoryMap[lang] || categoryMap['en'];
  }

}
