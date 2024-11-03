import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../../../shared/types/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  createGame(game: Omit<Game, 'id'>): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/games`, game);
  }

  getGameCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/games/count`);
  }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }

  updateAllGames(game: Game, where?: any): Observable<number> {
    return this.http.patch<number>(`${this.apiUrl}/games`, { game, where });
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games/${id}`);
  }

  updateGameById(id: string, game: Game): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/games/${id}`, game);
  }

  deleteGameById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/games/${id}`);
  }
}
