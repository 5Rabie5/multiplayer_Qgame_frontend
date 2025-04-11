import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  gameCode = 'ABC123';
  players = [
    { name: 'Sarah', avatar: 'assets/avatars/sarah.jpg', online: true, movement: 0 },
    { name: 'Aarav', avatar: '', online: true, movement: 1 }, // no avatar, will show 'A'
    { name: 'Diya', avatar: null, online: false, movement: 0 },
    { name: 'Paul', avatar: 'assets/avatars/paul.jpg', online: false, movement: -1 },
  ];



  startGame() {
    console.log('Game started!');
    // TODO: trigger backend game start logic
  }

  copyCode() {
    navigator.clipboard.writeText(this.gameCode);
    alert('تم نسخ الكود!');
  }



constructor(private route: ActivatedRoute) {
  this.route.queryParams.subscribe(params => {
    const code = params['code'];
    if (code) {
      this.gameCode = code;
    }
  });
}

}
