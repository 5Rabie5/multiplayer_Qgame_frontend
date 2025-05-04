import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
import { MatOptionModule } from '@angular/material/core';
import { environment } from '../../../environments/environment';
import { CreateGameService } from '../../service/create-game.service';
import { GameSessionCreateRequest } from '../../models/game-session-create-request.model';


@Component({
  selector: 'app-create-game',
  standalone: true,
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    MatOptionModule,
    TranslatePipe
  ]
})
export class CreateGameComponent implements OnInit {
  roomName: string = '';
  selectedWinPoints: number | string = 100;
  selectedPlayerCount: number | string = 2;
  selectedCategories: string[] = [];
  selectedDifficulty: string = 'easy';
  selectedQuestionType: string = 'multiple';

  gameMode: string = 'FASTEST_ANSWER';
  timedOption: string = 'WAIT_ALL_PLAYERS';
  secondsPerQuestion: number = 10;

  pointsOptions = [100, 200, 500, 1000, 'Unlimited'];
  playerCounts = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Unlimited'];
  categories: string[] = [];
  isCategoryDropdownOpen: boolean = false;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private createGameService: CreateGameService
  ) {}

  private apiUrl = environment.apiUrl + '/game-sessions';

  ngOnInit(): void {
    this.loadCategories(this.translate.currentLang);
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

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  createGame() {
    const winPoints = this.selectedWinPoints === 'Unlimited'
      ? 'unlimited'
      : Number(this.selectedWinPoints);

    const playerCount = this.selectedPlayerCount === 'Unlimited'
      ? 'unlimited'
      : Number(this.selectedPlayerCount);

    const request = {
      roomName: this.roomName,
      winPoints,
      playerCount,
      categories: this.selectedCategories,
      difficulty: this.selectedDifficulty,
      questionType: this.selectedQuestionType,
      gameMode: this.gameMode,
      timerMode: this.timedOption,
      secondsPerQuestion: this.secondsPerQuestion
    } as GameSessionCreateRequest;

    console.log('🟢 Sending game creation request:', request);

    this.createGameService.create(request).subscribe({
      next: (response: any) => {
        console.log('✅ Game created:', response);
        const gameId = response.id;

        const joinLink = `${window.location.origin}/join-game?code=${gameId}`;
        console.log('🔗 Join link:', joinLink);

        this.router.navigate(['/admin-dashboard'], {
          queryParams: { code: gameId }
        });

        alert(`Game created! Share this link to invite players:\n\n${joinLink}`);
      },
      error: (error: any) => {
        console.error('❌ Failed to create game:', error);
        alert('Failed to create game session. Please try again.');
      }
    });
  }

  toggleCategoryDropdown() {
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }

  closeCategoryDropdown() {
    this.isCategoryDropdownOpen = false;
  }
}
