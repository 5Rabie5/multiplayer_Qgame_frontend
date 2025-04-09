import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-join-game',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent {
  playerName: string = '';
  gameCode: string = '';
  selectedCharacterId: string | null = null;

  characters = [
    { id: 'saint_paul',      name: 'CHARACTER.SAINT_PAUL',      image: 'https://robohash.org/saint_paul?set=set2&size=100x100' },
    { id: 'virgin_mary',     name: 'CHARACTER.VIRGIN_MARY',     image: 'https://robohash.org/virgin_mary?set=set2&size=100x100' },
    { id: 'good_shepherd',   name: 'CHARACTER.GOOD_SHEPHERD',   image: 'https://robohash.org/good_shepherd?set=set2&size=100x100' },
    { id: 'candle_light',    name: 'CHARACTER.CANDLE_LIGHT',    image: 'https://robohash.org/candle_light?set=set2&size=100x100' },
    { id: 'cross_warrior',   name: 'CHARACTER.CROSS_WARRIOR',   image: 'https://robohash.org/cross_warrior?set=set2&size=100x100' },
    { id: 'peace_dove',      name: 'CHARACTER.PEACE_DOVE',      image: 'https://robohash.org/peace_dove?set=set2&size=100x100' },
    { id: 'angel_michael',   name: 'CHARACTER.ANGEL_MICHAEL',   image: 'https://robohash.org/angel_michael?set=set2&size=100x100' },
    { id: 'saint_george',    name: 'CHARACTER.SAINT_GEORGE',    image: 'https://robohash.org/saint_george?set=set2&size=100x100' },
  ];


  onPlayerNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.playerName = input.value;
  }

  onGameCodeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.gameCode = input.value;
  }


  selectCharacter(id: string): void {
    this.selectedCharacterId = id;
  }

  canJoin(): boolean {
    return !!this.playerName && !!this.gameCode && !!this.selectedCharacterId;
  }

  joinGame(): void {
    console.log('Joining game with:', {
      name: this.playerName,
      code: this.gameCode,
      character: this.selectedCharacterId,
    });
  }
}
