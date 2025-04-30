import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  constructor() { }

  public register(formValue: any) {
    const headers = { 'Content-Type': 'application/json' };
    return firstValueFrom(
      this.httpClient.post<any>(`${this.apiUrl}/auth/register`,
        JSON.stringify(formValue),
        { headers }
      )
    );
  }

  public login(formValue: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(`${this.apiUrl}/auth/login`,
      JSON.stringify(formValue),
      { headers }
    );
  }

  public getTasks(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/tasks`);
  }

  public createTask(task: Omit<any, 'id'>): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/tasks`, task);
  }

  public updateTask(id: string, task: Omit<any, 'id'>): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/tasks/${id}`, task);
  }

  public deleteTask(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }
}
