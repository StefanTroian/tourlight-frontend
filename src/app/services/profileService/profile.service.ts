import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getPostsByUID(uid: any): Observable<any> {
    return this.http.get(`http://localhost:8081/api/tourlight/posts/uid/${uid}`);
  }

  getPostsByLikes(uid: any): Observable<any> {
    return this.http.get(`http://localhost:8081/api/tourlight/posts/likes/${uid}`);
  }

}
