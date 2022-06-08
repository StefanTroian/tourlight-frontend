import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  // getFeed(): Observable<any> {
  //   // TODO
  //   //return this.http.get(`https://tourlight-backend.herokuapp.com/api/tourlight/database`);
  //   return this.http.get(`http://localhost:8081/api/tourlight/posts`);
  // }


  getFeed(endLimit: number): Observable<any> {
    // TODO
    //return this.http.get(`https://tourlight-backend.herokuapp.com/api/tourlight/database`);
    return this.http.get(`http://localhost:8081/api/tourlight/posts/${endLimit}`).pipe(map(res => res));
  }

  getFeedLength(): Observable<any> {
    return this.http.get(`http://localhost:8081/api/tourlight/posts`);
  }

  getPostById(id: any): Observable<any> {
    return this.http.get(`http://localhost:8081/api/tourlight/posts/id/${id}`);
  }

  createPost(postObject: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8081/api/tourlight/posts`, postObject).pipe(map((res: HttpResponse<Text>) => res));
  }

  updatePost(id: any, putObject: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8081/api/tourlight/posts/${id}`, putObject).pipe(map((res: HttpResponse<Text>) => res));
  }

  getTopLocations(): Observable<any> {
    return this.http.get(`http://localhost:8081/api/tourlight/locations`).pipe(map(res => res));
  }

  createLocation(locationObject: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8081/api/tourlight/locations`, locationObject).pipe(map((res: HttpResponse<Text>) => res));
  }
}
