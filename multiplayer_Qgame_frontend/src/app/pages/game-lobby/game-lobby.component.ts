import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgIf, NgFor, CommonModule} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player } from '../../models/player.model';
import {GameService} from '../../service/game.service';
import {WebSocketService} from '../../service/websocket.service';
import {JoinGameService} from '../../service/join-game.service';
import {GameSession} from '../../models/GameSession';

@Component({
  standalone: true,
  selector: 'app-game-lobby',
  imports: [CommonModule, NgIf, NgFor, AsyncPipe],
  templateUrl: './game-lobby.component.html',
  styleUrl: './game-lobby.component.scss'
})
export class GameLobbyComponent implements OnInit {
  gameSession$!: Observable<GameSession>;
  players$ = new BehaviorSubject<Player[]>([]);
  currentPlayerId: string | null = null;
  sessionId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private joinGameService: JoinGameService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('code');

    if (this.sessionId) {
      // 1. Load session details
      this.gameSession$ = this.gameService.getGameSessionById(this.sessionId);

      // 2. Load current player list
      this.joinGameService.getPlayersBySession(this.sessionId).subscribe(players => {
        this.players$.next(players);
      });

      // 3. Subscribe to live joins
      this.webSocketService.playerJoined$.subscribe((newPlayer: Player) => {
        if (newPlayer.gameSessionId === this.sessionId) {
          const updated = [...this.players$.value, newPlayer];
          this.players$.next(updated);
        }
      });

      // 4. Get current player ID from sessionStorage/localStorage
      this.currentPlayerId = localStorage.getItem('playerId');
    }
  }

  isCreator(players: Player[]): boolean {
    return players.length > 0 && players[0].id === this.currentPlayerId;
  }

  startGame() {
    alert('Game is starting...');
    // TODO: implement backend call to flag game as started
  }
}
