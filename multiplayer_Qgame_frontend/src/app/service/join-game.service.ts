import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { PlayerJoinRequest } from '../models/player-join-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoinGameService {

  private readonly apiUrl = `${environment.apiUrl}players`;

  constructor(private http: HttpClient) {}

  joinGame(data: PlayerJoinRequest): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/join`, data);
  }

  getPlayersBySession(gameSessionId: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/session/${gameSessionId}`);
  }
}
