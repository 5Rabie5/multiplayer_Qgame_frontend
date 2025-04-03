// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { JoinGameComponent } from './pages/join-game/join-game.component';
import { GameLobbyComponent } from './pages/game-lobby/game-lobby.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Quiz Game' },
  { path: 'create', component: CreateGameComponent, title: 'Create Game' },
  { path: 'join', component: JoinGameComponent, title: 'Join Game' },
  { path: 'lobby', component: GameLobbyComponent, title: 'Game Lobby' },
];
