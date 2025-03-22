// {
//     "error": false,
//     "data": {
//         "_id": "67ddd135b9fa5eaadaa679ab",
//         "username": "ibrahem",
//         "email": "ibrahem@gmail.com",
//         "level": 1,
//         "xp": 0,
//         "suspended": false,
//         "createdAt": "2025-03-21T20:51:01.546Z",
//         "updatedAt": "2025-03-21T20:51:01.546Z",
//         "nextLevel": 2,
//         "nextLevelXp": 1000,
//         "avatar": "https://masark-api.ibrahem.site/images/level-1.gif"
//     }
// }

export interface User {
  _id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  suspended: boolean;
  nextLevel: number;
  nextLevelXp: number;
  avatar: string;
}

export interface UserResponse {
  error: boolean;
  data: User;
}
