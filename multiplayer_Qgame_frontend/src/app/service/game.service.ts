

// GameService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameSessionCreateRequest } from '../models/game-session-create-request.model';
import { environment } from '../../environments/environment';
import { GameSession } from '../models/GameSession';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly apiUrl = `${environment.apiUrl}game-sessions`;

  constructor(private http: HttpClient) {}

  createGameSession(gameData: GameSessionCreateRequest): Observable<GameSession> {
    return this.http.post<GameSession>(this.apiUrl, gameData);
  }

  getGameSessionById(id: string): Observable<GameSession> {
    return this.http.get<GameSession>(`${this.apiUrl}/${id}`);
  }
}
