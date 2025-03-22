export interface ILeaderboard {
  error: boolean;
  data: ILeaderboardUser[];
}

export interface ILeaderboardUser {
  username: string;
  level: number;
  xp: number;
  nextLevel: number;
  nextLevelXp: number;
  avatar: string;
}
