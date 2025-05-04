import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient!: Client;
  private playerJoinedSubject = new Subject<Player>();

  public playerJoined$ = this.playerJoinedSubject.asObservable();

  /**
   * Connect to the WebSocket server and send player join data.
   * @param gameCode Game code the player wants to join
   * @param playerData Player info including avatar, color, character
   */
  connect(gameCode: string, playerData: {
    playerName: string;
    language: string;
    avatarUrl?: string;
    characterId?: string;
    color?: string;
  }) {
    const socket = new SockJS('https://quiz.antiochorthodox.at:8083/ws');

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('✅ WebSocket connected');

      // Send join request to /app/join
      this.stompClient.publish({
        destination: '/app/join',
        body: JSON.stringify({
          gameCode,
          ...playerData
        }),
      });

      // Subscribe to updates on players joining the same game
      this.stompClient.subscribe(`/topic/players/${gameCode}`, (message: IMessage) => {
        const player = JSON.parse(message.body);
        console.log('📥 Player joined:', player);
        this.playerJoinedSubject.next(player);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ STOMP error:', frame.headers['message'], frame.body);
    };

    this.stompClient.activate();
  }

  /**
   * Disconnect from the WebSocket server.
   */
  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('🔌 WebSocket disconnected');
    }
  }
}
