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
  private connected = false;

  private playerJoinedSubject = new Subject<Player>();
  private playersSubject = new Subject<Player[]>();

  public playerJoined$ = this.playerJoinedSubject.asObservable();
  public players$ = this.playersSubject.asObservable();

  connect(gameCode: string, playerData: {
    playerName: string;
    language: string;
    avatarUrl?: string;
    color?: string;
    characterId?: string;
  }) {
// Determine the correct WebSocket protocol based on the page's protocol
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
console.log("WebSocket URL:", window.location.protocol === "https:" ? "wss://" : "ws://" + "quiz.antiochorthodox.at/ws");

// Create a new WebSocket connection
    const socket = new WebSocket(protocol + 'quiz.antiochorthodox.at/ws');

// Optionally, you can add event listeners for connection events
    socket.onopen = function(event) {
      console.log('WebSocket connection established', event);
    };

    socket.onclose = function(event) {
      console.log('WebSocket connection closed', event);
    };

    socket.onerror = function(event) {
      console.error('WebSocket error', event);
    };

    this.stompClient = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      debug: (msg) => console.log('[STOMP]', msg),
    });

    this.stompClient.onConnect = () => {
      this.connected = true;
      console.log('✅ WebSocket connected');

      // Send join request
      this.stompClient.publish({
        destination: '/app/join',
        body: JSON.stringify({ gameCode, ...playerData }),
      });

      // Subscribe to game player list
      this.stompClient.subscribe(`/topic/players/${gameCode}`, (message: IMessage) => {
        try {
          const players: Player[] = JSON.parse(message.body);
          this.playersSubject.next(players);

          const me = players.find(p => p.name === playerData.playerName);
          if (me) this.playerJoinedSubject.next(me);

          console.log('📩 Received players list:', players);
        } catch (e) {
          console.error('❌ WebSocket parse error:', e);
        }
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    this.stompClient.onStompError = frame => {
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
