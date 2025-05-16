import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { GameSessionCreateRequest } from '../models/game-session-create-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {

  constructor(private gameService: GameService) {}

  create(gameData: GameSessionCreateRequest): Observable<any> {
    return this.gameService.createGameSession(gameData);
  }
}
