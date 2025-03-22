export interface IProfile {
  username: string;
  level: number;
  xp: number;
  nextLevel: number;
  nextLevelXp: number;
  avatar: string;
}

export interface IProfileResponse {
  data: IProfile;
  error: boolean;
}
