export interface Player {
  id: string;
  name: string;
  language: 'en' | 'de' | 'ar';
  score: number;
  avatarUrl?: string;
  isReady: boolean;
}
