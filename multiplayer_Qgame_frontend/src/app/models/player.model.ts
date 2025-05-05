
export interface Player {
  id?: string;
  name: string;
  avatar?: string;
  color?: string;
  language?: string;
  characterId?: string;
  gameSessionId?: string;
  score?: number;
  online?: boolean; // ✅ NEW
}
