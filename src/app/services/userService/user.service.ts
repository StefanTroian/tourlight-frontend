import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    // TODO
    //return this.http.get(`https://tourlight-backend.herokuapp.com/api/tourlight/database`);
    return this.http.get(`http://localhost:8081/api/tourlight/users`);
  }

  getUserByUID(uid): Observable<any> {
    return this.http.get(`http://localhost:8081/api/tourlight/users/` + uid);
  }

  createUser(userObject: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8081/api/tourlight/users`, userObject).pipe(map((res: HttpResponse<Text>) => res));
  }
}
