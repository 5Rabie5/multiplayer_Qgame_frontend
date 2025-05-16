import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from '../models/player.model';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient!: Client;
  private connected = false;

  private playerJoinedSubject = new Subject<Player>();
  private playersSubject = new Subject<Player[]>();

  public playerJoined$ = this.playerJoinedSubject.asObservable();
  public players$ = this.playersSubject.asObservable();

  constructor() {}

  connect(gameCode: string, playerData: {
    playerName: string;
    language: string;
    avatarUrl?: string;
    color?: string;
    characterId?: string;
  }) {


    const socketFactory = () => new SockJS('https://quiz.antiochorthodox.at/wss');
    this.stompClient = new Client({
      webSocketFactory: socketFactory,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });



    this.stompClient.configure({
      reconnectDelay: 5000,
      debug: (msg) => console.log('[STOMP]', msg),
    });

    this.stompClient.onConnect = () => {
      this.connected = true;
      console.log('✅ WebSocket connected front end note 001');

      this.stompClient.publish({
        destination: '/app/join',
        body: JSON.stringify({ gameCode, ...playerData }),
      });

      this.stompClient.subscribe(`/topic/players/${gameCode}`, (message: IMessage) => {
        try {
          const players: Player[] = JSON.parse(message.body);
          this.playersSubject.next(players);

          const me = players.find(p => p.name === playerData.playerName);
          if (me) {
            this.playerJoinedSubject.next(me);
          }
          console.log('📩 Received players list:', players);
        } catch (e) {
          console.error('❌ WebSocket parse error:', e);
        }
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('❌ WebSocket error: errrrrrrrrrrrrrrrrrrrrrrrrrrrerrrrrrrrrrrrrrrrrrr', error);
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ STOMP error:', frame.headers['message'], frame.body);
    };

    this.stompClient.activate();
  }

  subscribeToPlayers(gameCode: string) {
    if (!this.connected || !this.stompClient) {
      console.warn('⚠️ STOMP client not connected');
      return;
    }

    this.stompClient.subscribe(`/topic/players/${gameCode}`, (message: IMessage) => {
      try {
        const players: Player[] = JSON.parse(message.body);
        this.playersSubject.next(players);
      } catch (e) {
        console.error('❌ WebSocket parse error in subscription:', e);
      }
    });
  }

  disconnect() {
    if (this.stompClient && this.connected) {
      this.stompClient.deactivate();
      this.connected = false;
      console.log('🔌 WebSocket disconnected');
    }
  }
}
