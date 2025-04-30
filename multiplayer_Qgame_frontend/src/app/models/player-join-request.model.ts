export interface PlayerJoinRequest {
  playerName: string;
  gameCode: string;
  language: 'en' | 'de' | 'ar';
}
