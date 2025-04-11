import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent),
    title: 'Quiz Game'
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-game/create-game.component').then(m => m.CreateGameComponent),
    title: 'Create Game'
  },
  {
    path: 'join',
    loadComponent: () =>
      import('./pages/join-game/join-game.component').then(m => m.JoinGameComponent),
    title: 'Join Game'
  },
  {
    path: 'lobby',
    loadComponent: () =>
      import('./pages/game-lobby/game-lobby.component').then(m => m.GameLobbyComponent),
    title: 'Game Lobby'
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    title: 'Admin Dashboard'
  },
  {
    path: 'question',
    loadComponent: () =>
      import('./pages/question-screen/question-screen.component').then(m => m.QuestionScreenComponent),
    title: 'Question'
  }
];
