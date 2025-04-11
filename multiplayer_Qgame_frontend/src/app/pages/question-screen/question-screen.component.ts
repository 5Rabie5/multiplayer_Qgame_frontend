import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-question-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.scss']
})
export class QuestionScreenComponent implements OnInit, OnDestroy {
  timer = 25;
  totalTime = 25;
  dashArray = '100, 100';
  private countdownSub!: Subscription;

  score = 220;
  rank = 2;
  question = 'Which month has 28 days?';
  options = ['A. January', 'B. February', 'C. March', 'D. All'];

  ngOnInit(): void {
    this.countdownSub = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
        const percentage = (this.timer / this.totalTime) * 100;
        this.dashArray = `${percentage}, 100`;
      } else {
        this.countdownSub.unsubscribe();
        // يمكن تنفيذ أي منطق هنا عند انتهاء الوقت
      }
    });
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
  }
}
