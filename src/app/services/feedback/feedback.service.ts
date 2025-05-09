import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = `${environment.apiUrl}user-feedback`;

  constructor(private http: HttpClient) {}

  getCards(page: number = 0, size: number = 6):Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  };

  postCards(dado: any):Observable<any> {
    return this.http.post(this.apiUrl, dado)
  }
}

