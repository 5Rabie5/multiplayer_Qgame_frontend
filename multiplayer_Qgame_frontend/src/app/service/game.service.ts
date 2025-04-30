import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameSessionCreateRequest } from '../models/game-session-create-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = environment.apiUrl + 'game-sessions';
  constructor(private http: HttpClient) {}
  createGameSession(gameData: GameSessionCreateRequest): Observable<any> {
// alert("GameService      "    +  this.apiUrl )
    return this.http.post<any>(this.apiUrl, gameData);
  }
}
