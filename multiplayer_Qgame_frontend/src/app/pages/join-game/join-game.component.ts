import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../service/websocket.service';

@Component({
  standalone: true,
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule,
  ],
})
export class JoinGameComponent implements OnInit, AfterViewInit {
  playerName = '';
  gameCode = '';
  selectedCharacterId: string | null = null;
  avatarImage: string | null = null;
  avatarFileName: string | null = null;
  selectedColor = '';
  selectedLanguage: 'en' | 'de' | 'ar' = 'en';

  colors = ['Red', 'Blue', 'Green', 'Yellow'];

  characters = [
    { id: 'saint_paul', name: 'CHARACTER.SAINT_PAUL', image: 'https://robohash.org/saint_paul?set=set2&size=100x100' },
    { id: 'virgin_mary', name: 'CHARACTER.VIRGIN_MARY', image: 'https://robohash.org/virgin_mary?set=set2&size=100x100' },
    { id: 'good_shepherd', name: 'CHARACTER.GOOD_SHEPHERD', image: 'https://robohash.org/good_shepherd?set=set2&size=100x100' },
    { id: 'candle_light', name: 'CHARACTER.CANDLE_LIGHT', image: 'https://robohash.org/candle_light?set=set2&size=100x100' },
    { id: 'cross_warrior', name: 'CHARACTER.CROSS_WARRIOR', image: 'https://robohash.org/cross_warrior?set=set2&size=100x100' },
    { id: 'peace_dove', name: 'CHARACTER.PEACE_DOVE', image: 'https://robohash.org/peace_dove?set=set2&size=100x100' },
    { id: 'angel_michael', name: 'CHARACTER.ANGEL_MICHAEL', image: 'https://robohash.org/angel_michael?set=set2&size=100x100' },
    { id: 'saint_george', name: 'CHARACTER.SAINT_GEORGE', image: 'https://robohash.org/saint_george?set=set2&size=100x100' },
  ];

  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(
    private webSocketService: WebSocketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.nameInput?.nativeElement?.focus();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.gameCode = params['code'];
      }
    });

    this.selectedCharacterId = localStorage.getItem('characterId');
    this.playerName = localStorage.getItem('playerName') || '';
    const savedLang = localStorage.getItem('lang');
    if (['en', 'de', 'ar'].includes(savedLang || '')) {
      this.selectedLanguage = savedLang as 'en' | 'de' | 'ar';
    }
  }

  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.avatarFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarImage = reader.result as string;
        this.selectedCharacterId = null; // deselect character if uploading
      };
      reader.readAsDataURL(file);
    }
  }

  get selectedCharacterImage(): string | null {
    const selected = this.characters.find(c => c.id === this.selectedCharacterId);
    return selected ? selected.image : null;
  }

  get selectedCharacterLabel(): string {
    const selected = this.characters.find(c => c.id === this.selectedCharacterId);
    return selected ? selected.name : 'CUSTOM_AVATAR';
  }

  canJoin(): boolean {
    return !!this.playerName && !!this.gameCode && (!!this.avatarImage || !!this.selectedCharacterId);
  }

  joinGame(): void {
    if (!this.canJoin()) {
      alert('Please fill in all required fields.');
      return;
    }

    const avatarUrl = this.avatarImage || this.selectedCharacterImage || '';

    // Store for later use
    localStorage.setItem('playerName', this.playerName);
    localStorage.setItem('lang', this.selectedLanguage);
    localStorage.setItem('playerAvatar', JSON.stringify({
      image: avatarUrl,
      characterId: this.selectedCharacterId,
      color: this.selectedColor,
      name: this.selectedCharacterLabel
    }));

    this.webSocketService.connect(this.gameCode, {
      playerName: this.playerName,
      language: this.selectedLanguage,
      avatarUrl: avatarUrl,
      characterId: this.selectedCharacterId || '',
      color: this.selectedColor
    });

    this.webSocketService.playerJoined$.subscribe((player: any) => {
      if (player.name === this.playerName) {
        localStorage.setItem('playerId', player.id);
        localStorage.setItem('avatarUrl', avatarUrl);
        localStorage.setItem('characterId', this.selectedCharacterId || '');

        this.router.navigate(['/game-lobby'], {
          queryParams: { code: this.gameCode }
        }).then();
      }
    });
  }
}
