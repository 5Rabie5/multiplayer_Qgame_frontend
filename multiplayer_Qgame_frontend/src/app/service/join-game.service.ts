import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerJoinRequest } from '../models/player-join-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoinGameService {

  private apiUrl = environment.apiUrl + 'players';

  constructor(private http: HttpClient) {}

  joinGame(data: PlayerJoinRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/join`, data);
  }

  getPlayersBySession(gameSessionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/session/${gameSessionId}`);
  }
}
