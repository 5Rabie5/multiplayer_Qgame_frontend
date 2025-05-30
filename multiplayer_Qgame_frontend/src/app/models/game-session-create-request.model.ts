export interface GameSessionCreateRequest {
  roomName: string;
  winPoints: number | 'unlimited';
  playerCount: number | 'unlimited';
  categories: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  gameMode: 'fastest_answer' | 'timed_question';
  questionType: 'multiple_answer' | 'single_answer';
  timerMode?: 'wait_all_players' | 'auto_next';
  secondsPerQuestion?: number;
}
