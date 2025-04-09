import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core'; // ✅ هذا هو الناقص

@Component({
  selector: 'app-create-game',
  standalone: true,
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  imports: [
    MatOptionModule,
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
  roomName: string = '';
  selectedWinPoints: number | string = 100;
  selectedPlayerCount: number | string = 2;
  selectedCategories: string[] = [];
  selectedDifficulty: string = 'easy';

  pointsOptions = [100, 200, 500, 1000, 'Unlimited'];
  playerCounts = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Unlimited'];
  categories: string[] = [];

  difficulties = [
    { label: 'EASY', value: 'easy' },
    { label: 'MEDIUM', value: 'medium' },
    { label: 'HARD', value: 'hard' }
  ];

  constructor(public translate: TranslateService, private router: Router) {
    this.loadCategories(translate.currentLang);
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

  createGame() {
    console.log('🟢 Game Created With:', {
      roomName: this.roomName,
      points: this.selectedWinPoints,
      players: this.selectedPlayerCount,
      categories: this.selectedCategories,
      difficulty: this.selectedDifficulty
    });

    const gameCode = 'ABC123';
    this.router.navigate(['/admin-dashboard'], {
      queryParams: { code: gameCode }
    });
  }
}
