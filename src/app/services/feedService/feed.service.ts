import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getFeed(): Observable<any> {
    return this.http.get(`https://tourlight-backend.herokuapp.com/api/tourlight/database`);
  }
}
