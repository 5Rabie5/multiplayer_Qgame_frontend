import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { WebSocketService } from '../../service/websocket.service';
import { Player } from '../../models/player.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    QRCodeComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnDestroy {
  gameCode = 'ABC123';
  players: Player[] = [];
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.gameCode = code;

        // 🔌 Connect WebSocket for live updates
        this.webSocketService.subscribeToPlayers(this.gameCode);

        this.sub = this.webSocketService.players$.subscribe(players => {
          this.players = players;
        });
      }
    });
  }

  copyCode() {
    navigator.clipboard.writeText(this.gameCode);
    alert('تم نسخ الكود!');
  }

  copyJoinLink() {
    const joinLink = `${window.location.origin}/join?code=${this.gameCode}`;
    navigator.clipboard.writeText(joinLink);
    alert('Join link copied!');
  }

  startGame() {
    console.log('Game started!');
    // TODO: backend trigger
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
