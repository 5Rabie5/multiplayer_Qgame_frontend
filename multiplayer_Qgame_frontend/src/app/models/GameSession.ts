export interface GameSession {
  id: string;
  roomName: string;
  winPoints: number;
  playerCount: number;
  categories: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  gameMode: 'fastest_answer' | 'timed_question';
  questionType: 'multiple_answer' | 'single_answer';
  timerMode?: 'wait_all_players' | 'auto_next';
  secondsPerQuestion?: number;
  createdAt: string;
}
