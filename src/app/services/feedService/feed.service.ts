import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getFeed(): Observable<any> {
    // TODO
    //return this.http.get(`https://tourlight-backend.herokuapp.com/api/tourlight/database`);
    return this.http.get(`http://localhost:8081/api/tourlight/posts`);
  }

  createPost(postObject: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8081/api/tourlight/posts`, postObject).pipe(map((res: HttpResponse<Text>) => res));
  }
}
